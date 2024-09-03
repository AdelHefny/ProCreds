import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { useBtnBubbleEffect } from "@/app/hooks";
import { TemplateContext, templateType } from "@/app/templateContext";
import { motion } from "framer-motion";
import { cloneDeep } from "lodash";
import { useContext, useRef, useState } from "react";
import "../checkbox.css";

function EducationSection({
  wordsCont,
  wordsContSetter,
  EditSelect,
}: {
  wordsCont: number;
  wordsContSetter: (value: number, plus: boolean) => void;
  EditSelect: number;
}) {
  const [templateState, setter] = useContext(TemplateContext);
  const [history, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [EditEduMode, setEditEduMode] = useState<string | null>(null);
  const EduSection = useRef<HTMLDivElement>(null);
  const [Edu, setEdu] = useState<{
    institution: string;
    degree: string;
    date: { start: string; end: string; present: boolean };
    location: string;
  }>({
    institution: "",
    degree: "",
    date: { start: "", end: "", present: false },
    location: "",
  });
  const addBtn = useRef<HTMLButtonElement>(null);
  const {
    isResetting,
    btnTranslateX,
    btnTranslateY,
    textTranslateX,
    textTranslateY,
  } = useBtnBubbleEffect(addBtn);

  const handleAddEdu = () => {
    if (Edu.institution.length === 0 || Edu.degree.length === 0) {
      return;
    }
    const newTemplateState: templateType = cloneDeep(templateState);
    if (EditEduMode) {
      // Edit existing education
      newTemplateState.content.sections.forEach((ele) => {
        if (ele.title === "Education") {
          const educationIndex = ele.details.findIndex(
            (detail) => detail.id === EditEduMode
          );
          if (educationIndex !== -1) {
            ele.details[educationIndex].structure = Edu;
          }
          setEditEduMode(null);
        }
      });
    } else {
      // Add new education
      newTemplateState.content.sections.forEach((ele) => {
        if (ele.title === "Education") {
          ele.details.push({
            id: `${ele.details.length + 1}`,
            text: "",
            structure: Edu,
          });
        }
      });
    }

    if (wordsCont + 1 >= 3) {
      setHistory((prevHistory) => {
        const newHistory = cloneDeep(prevHistory);
        newHistory.undoStack.push(newTemplateState);

        if (newHistory.undoStack.length > 50) {
          newHistory.undoStack.shift();
        }

        while (newHistory.redoStack.length) {
          newHistory.redoStack.pop();
        }

        return newHistory;
      });
      wordsContSetter(0, false);
    } else {
      wordsContSetter(0, true);
    }
    setEdu({
      institution: "",
      degree: "",
      date: { start: "", end: "", present: false },
      location: "",
    });
    console.log(newTemplateState);
    setter(newTemplateState);
  };

  const handleEditClick = (educationId: string) => {
    if (EduSection.current) {
      EduSection.current.scroll({ top: 0, behavior: "smooth" });
    }
    const section = templateState.content.sections.find(
      (section) => section.title === "Education"
    );
    if (section) {
      const education = section.details.find(
        (detail) => detail.id === educationId
      );
      if (education) {
        setEdu(education.structure);
        setEditEduMode(educationId);
      }
    }
  };

  const handleDeleteClick = (educationId: string) => {
    const newTemplateState = cloneDeep(templateState);
    const sectionIndex = newTemplateState.content.sections.findIndex(
      (section) => section.title === "Education"
    );

    newTemplateState.content.sections[sectionIndex].details =
      newTemplateState.content.sections[sectionIndex].details.filter(
        (detail) => detail.id !== educationId
      );

    setHistory((prevHistory) => {
      const newHistory = cloneDeep(prevHistory);
      newHistory.undoStack.push(newTemplateState);

      if (newHistory.undoStack.length > 50) newHistory.undoStack.shift();
      newHistory.redoStack = [];

      return newHistory;
    });

    setter(newTemplateState);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={EduSection}
      className="EduSection flex flex-col justify-start items-center w-full space-y-4 px-4 max-h-80 overflow-y-scroll"
    >
      <fieldset className="flex flex-col space-y-2 w-full items-start">
        <h1 className="relative font-bold">Add data</h1>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="Institution" className="font-bold">
            Institution
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="Institution"
              id="Institution"
              value={Edu.institution}
              onChange={(e) =>
                setEdu((prev) => ({
                  ...prev,
                  institution: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="Degree" className="font-bold">
            Degree
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="Degree"
              id="Degree"
              value={Edu.degree}
              onChange={(e) =>
                setEdu((prev) => ({
                  ...prev,
                  degree: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="Location" className="font-bold">
            Location
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="Location"
              id="Location"
              value={Edu.location}
              onChange={(e) =>
                setEdu((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <fieldset className="flex flex-row justify-between items-center w-full">
          <label htmlFor="startDate" className="font-bold text-sm">
            Start
          </label>

          <div className="max-w-16 relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 max-w-16 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="startDate"
              id="startDate"
              placeholder="m/y"
              value={Edu.date.start}
              onChange={(e) =>
                setEdu((prev) => ({
                  ...prev,
                  date: { ...prev.date, start: e.target.value },
                }))
              }
            />
          </div>
          <label htmlFor="endDate" className="font-bold text-sm">
            End
          </label>

          <div className="max-w-16 relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 max-w-16 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="endDate"
              id="endDate"
              placeholder="m/y"
              value={Edu.date.end}
              disabled={Edu.date.present}
              onChange={(e) =>
                setEdu((prev) => ({
                  ...prev,
                  date: { ...prev.date, end: e.target.value },
                }))
              }
            />
          </div>
          <label htmlFor="datePresent" className="font-bold text-sm">
            Present
          </label>
          <div className="checkbox-wrapper-23">
            <input
              type="checkbox"
              name="datePresent"
              onChange={(e) => {
                setEdu((prev) => ({
                  ...prev,
                  date: {
                    ...prev.date,
                    present: Boolean(e.target.checked),
                  },
                }));
              }}
              checked={Edu.date.present}
              id="datePresent"
            />
            <label
              htmlFor="datePresent"
              style={{ width: "20px", height: "20px" }}
            >
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
        </fieldset>
      </fieldset>

      <motion.button
        ref={addBtn}
        onClick={handleAddEdu}
        className="selectEle min-w-[5rem] min-h-[5rem] flex justify-center items-center rounded-full text-main"
        animate={
          isResetting ? { x: 0, y: 0 } : { x: btnTranslateX, y: btnTranslateY }
        }
        transition={
          isResetting
            ? { type: "spring", stiffness: 500, damping: 10 }
            : { duration: 0 }
        }
      >
        <motion.span
          animate={
            isResetting
              ? { x: 0, y: 0 }
              : { x: textTranslateX, y: textTranslateY }
          }
          transition={
            isResetting
              ? { type: "spring", stiffness: 500, damping: 10 }
              : { duration: 0 }
          }
        >
          {EditEduMode ? "Save" : "Add"}
        </motion.span>
      </motion.button>
      {/* Add the education added here and way to edit them */}
      <ul className="w-full space-y-4">
        {templateState.content.sections[EditSelect - 1].details.map(
          (education) => (
            <li
              key={education.id}
              className="relative flex justify-between items-center p-2 border-b border-gray-300"
            >
              <div className="flex flex-col">
                <span className="font-bold">
                  {education.structure.institution}
                </span>
                <span className="text-sm text-gray-500">
                  {education.structure.degree}
                </span>
                <span className="text-sm text-gray-500">
                  {education.structure.location}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(education.id)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(education.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </motion.section>
  );
}

export default EducationSection;
