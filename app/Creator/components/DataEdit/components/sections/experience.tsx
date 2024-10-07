import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { useBtnBubbleEffect } from "@/app/hooks";
import { TemplateContext, templateType } from "@/app/templateContext";
import { motion } from "framer-motion";
import { cloneDeep } from "lodash";
import { useContext, useRef, useState } from "react";
import "../checkbox.css";
function ExperienceSection({
  wordsCont,
  wordsContSetter,
}: {
  wordsCont: number;
  wordsContSetter: (value: number, plus: boolean) => void;
}) {
  const [templateState, setter] = useContext(TemplateContext);
  const [history, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [EditExpMode, setEditExpMode] = useState<string | null>(null);
  const ExpSection = useRef<HTMLDivElement>(null);
  const [Exp, setExp] = useState<{
    postion: string;
    company: string;
    date: { start: string; end: string; present: boolean };
    location: string;
    accomplishments: string;
  }>({
    postion: "",
    company: "",
    date: { start: "", end: "", present: false },
    location: "",
    accomplishments: "",
  });
  const addBtn = useRef<HTMLButtonElement>(null);
  const {
    isResetting,
    btnTranslateX,
    btnTranslateY,
    textTranslateX,
    textTranslateY,
  } = useBtnBubbleEffect(addBtn);
  const handleAddExp = () => {
    if (Exp.postion.length == 0 || Exp.company.length == 0) {
      return;
    }
    const newTemplateState: templateType = cloneDeep(templateState);
    if (EditExpMode) {
      // Edit existing experience
      newTemplateState.content.sections.forEach((ele, ind) => {
        if (ele.title === "Experience") {
          const experienceIndex = ele.details.findIndex(
            (detail) => detail.id === EditExpMode
          );
          if (experienceIndex !== -1) {
            ele.details[experienceIndex].structure = Exp;
          }
          setEditExpMode(null);
        }
      });
    } else {
      newTemplateState.content.sections.forEach((ele, ind) => {
        if (ele.title === "Experience") {
          ele.details.push({
            id: ind + `-${ele.details.length + 1}`,
            text: "",
            structure: Exp,
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
    setExp({
      accomplishments: "",
      company: "",
      location: "",
      postion: "",
      date: { start: "", end: "", present: false },
    });
    setter(newTemplateState);
  };
  const handleEditClick = (experienceId: string) => {
    if (ExpSection.current) {
      ExpSection.current.scroll({ top: 0, behavior: "smooth" });
    }
    const section = templateState.content.sections.find(
      (section) => section.title === "Experience"
    );
    if (section) {
      const experience = section.details.find(
        (detail) => detail.id === experienceId
      );
      if (experience) {
        setExp(experience.structure);
        setEditExpMode(experienceId);
      }
    }
  };

  const handleDeleteClick = (experienceId: string) => {
    const newTemplateState = cloneDeep(templateState);
    const sectionIndex = newTemplateState.content.sections.findIndex(
      (section) => section.title === "Experience"
    );

    newTemplateState.content.sections[sectionIndex].details =
      newTemplateState.content.sections[sectionIndex].details.filter(
        (detail) => detail.id !== experienceId
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
      ref={ExpSection}
      className="ExpSection flex flex-col justify-start items-center w-full space-y-4 px-2 h-full overflow-y-scroll"
    >
      <fieldset className="flex flex-col space-y-2 w-full items-start ">
        <h1 className="relative font-bold">Add data</h1>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="Postion" className="font-bold">
            Postion
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="Postion"
              id="Postion"
              value={Exp.postion}
              onChange={(e) =>
                setExp((prev) => ({
                  ...prev,
                  postion: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="Company" className="font-bold">
            Company
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="Company"
              id="Company"
              value={Exp.company}
              onChange={(e) =>
                setExp((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="location" className="font-bold">
            Location
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="location"
              id="location"
              value={Exp.location}
              onChange={(e) =>
                setExp((prev) => ({
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
              value={Exp.date.start}
              onChange={(e) =>
                setExp((prev) => ({
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
              value={Exp.date.end}
              disabled={Exp.date.present}
              onChange={(e) =>
                setExp((prev) => ({
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
                setExp((prev) => ({
                  ...prev,
                  date: {
                    ...prev.date,
                    present: Boolean(e.target.checked),
                  },
                }));
              }}
              checked={Exp.date.present}
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
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="accomplishments" className="font-bold text-sm">
            Accomplishments
          </label>

          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="accomplishments"
              id="accomplishments"
              value={Exp.accomplishments}
              onChange={(e) =>
                setExp((prev) => ({
                  ...prev,
                  accomplishments: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </fieldset>

      <motion.button
        ref={addBtn}
        onClick={handleAddExp}
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
          {EditExpMode ? "Save" : "Add"}
        </motion.span>
      </motion.button>
      {/* add the Exoerience added here and way to edit them */}
      <div className="w-full flex flex-col justify-start items-start space-y-2">
        <h2 className="relative font-bold">Your experiences</h2>
        <ul className="w-full space-y-4">
          {templateState.content.sections.find(
            (section) => section.title === "Experience"
          )?.details.length == 0 && <h1>Empty</h1>}
          {templateState.content.sections
            .find((section) => section.title === "Experience")
            ?.details.map((experience) => (
              <li
                key={experience.id}
                className="relative flex justify-between items-center p-2 border-b border-gray-300"
              >
                <div className="flex flex-col">
                  <span className="font-bold">
                    {experience.structure.postion}
                  </span>
                  <span className="text-sm text-gray-500">
                    {experience.structure.company}
                  </span>
                  <span className="text-sm text-gray-500">
                    {experience.structure.location}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(experience.id)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(experience.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </motion.section>
  );
}

export default ExperienceSection;
