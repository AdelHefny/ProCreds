import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { useBtnBubbleEffect } from "@/app/hooks";
import { TemplateContext, templateType } from "@/app/templateContext";
import { motion } from "framer-motion";
import { cloneDeep } from "lodash";
import { useContext, useRef, useState } from "react";
import "../checkbox.css";

function ProjectSection({
  wordsCont,
  wordsContSetter,
}: {
  wordsCont: number;
  wordsContSetter: (value: number, plus: boolean) => void;
}) {
  const [templateState, setter] = useContext(TemplateContext);
  const [history, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [EditProjMode, setEditProjMode] = useState<string | null>(null);
  const ProjSection = useRef<HTMLDivElement>(null);
  const [Proj, setProj] = useState<{
    name: string;
    description: string;
    date: { start: string; end: string; ongoing: boolean };
    accomplishments: string;
  }>({
    name: "",
    description: "",
    date: { start: "", end: "", ongoing: false },
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

  const handleAddProj = () => {
    if (Proj.name.length === 0) {
      return;
    }
    const newTemplateState: templateType = cloneDeep(templateState);
    if (EditProjMode) {
      // Edit existing project
      newTemplateState.content.sections.forEach((ele, ind) => {
        if (ele.title === "Projects") {
          const projectIndex = ele.details.findIndex(
            (detail) => detail.id === EditProjMode
          );
          if (projectIndex !== -1) {
            ele.details[projectIndex].structure = Proj;
          }
          setEditProjMode(null);
        }
      });
    } else {
      newTemplateState.content.sections.forEach((ele, ind) => {
        if (ele.title === "Projects") {
          ele.details.push({
            id: ind + `-${ele.details.length + 1}`,
            text: "",
            structure: Proj,
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
    setProj({
      name: "",
      description: "",
      date: { start: "", end: "", ongoing: false },
      accomplishments: "",
    });
    setter(newTemplateState);
  };

  const handleEditClick = (projectId: string) => {
    if (ProjSection.current) {
      ProjSection.current.scroll({ top: 0, behavior: "smooth" });
    }
    const section = templateState.content.sections.find(
      (section) => section.title === "Projects"
    );
    if (section) {
      const project = section.details.find((detail) => detail.id === projectId);
      if (project) {
        setProj(project.structure);
        setEditProjMode(projectId);
      }
    }
  };

  const handleDeleteClick = (projectId: string) => {
    const newTemplateState = cloneDeep(templateState);
    const sectionIndex = newTemplateState.content.sections.findIndex(
      (section) => section.title === "Projects"
    );

    newTemplateState.content.sections[sectionIndex].details =
      newTemplateState.content.sections[sectionIndex].details.filter(
        (detail) => detail.id !== projectId
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
      ref={ProjSection}
      className="ProjSection flex flex-col justify-start items-center w-full space-y-4 px-4 max-h-80 overflow-y-scroll"
    >
      <fieldset className="flex flex-col space-y-2 w-full items-start">
        <h1 className="relative font-bold">Add Project</h1>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="name" className="font-bold">
            Project Name
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="name"
              id="name"
              value={Proj.name}
              onChange={(e) =>
                setProj((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="description"
              id="description"
              value={Proj.description}
              onChange={(e) =>
                setProj((prev) => ({
                  ...prev,
                  description: e.target.value,
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
              value={Proj.date.start}
              onChange={(e) =>
                setProj((prev) => ({
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
              value={Proj.date.end}
              disabled={Proj.date.ongoing}
              onChange={(e) =>
                setProj((prev) => ({
                  ...prev,
                  date: { ...prev.date, end: e.target.value },
                }))
              }
            />
          </div>
          <label htmlFor="dateOngoing" className="font-bold text-sm">
            Ongoing
          </label>
          <div className="checkbox-wrapper-23">
            <input
              type="checkbox"
              name="dateOngoing"
              onChange={(e) => {
                setProj((prev) => ({
                  ...prev,
                  date: {
                    ...prev.date,
                    ongoing: Boolean(e.target.checked),
                  },
                }));
              }}
              checked={Proj.date.ongoing}
              id="dateOngoing"
            />
            <label
              htmlFor="dateOngoing"
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
              value={Proj.accomplishments}
              onChange={(e) =>
                setProj((prev) => ({
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
        onClick={handleAddProj}
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
          {EditProjMode ? "Save" : "Add"}
        </motion.span>
      </motion.button>
      {/* List added projects and allow editing */}
      <ul className="w-full space-y-4">
        {templateState.content.sections
          .find((section) => section.title === "Projects")
          ?.details.map((project) => (
            <li
              key={project.id}
              className="relative flex justify-between items-center p-2 border-b border-gray-300"
            >
              <div className="flex flex-col">
                <span className="font-bold">{project.structure.name}</span>
                <span className="text-sm text-gray-500">
                  {project.structure.description}
                </span>
                <span className="text-sm text-gray-500">
                  {project.structure.date.start} -{" "}
                  {project.structure.date.ongoing
                    ? "Ongoing"
                    : project.structure.date.end}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(project.id)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(project.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </motion.section>
  );
}

export default ProjectSection;
