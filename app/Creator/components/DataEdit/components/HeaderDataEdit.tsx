import { cloneDeep } from "lodash";
import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { TemplateContext, templateType } from "@/app/templateContext";
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useBtnBubbleEffect } from "@/app/hooks";
import "./checkbox.css";
function HeaderEdit() {
  const [templateState, setter] = useContext(TemplateContext);
  const [history, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [wordsCont, setWordsCont] = useState(0);
  const [EditSelect, setEditSelect] = useState(0);
  const [skill, setSkill] = useState("");
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

  useEffect(() => {
    if (EditSelect >= templateState.content.sections.length + 1) {
      setEditSelect(() => Math.max(templateState.content.sections.length, 0));
    }
  }, [history, templateState]);

  const handleAddSkill = () => {
    if (skill.length == 0) {
      return;
    }
    const newTemplateState = cloneDeep(templateState);

    newTemplateState.content.sections.forEach((ele, ind) => {
      if (ele.title === "Skills") {
        ele.details.push({
          id: ind + `-${ele.details.length + 1}`,
          text: skill,
        });
      }
    });

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
      setWordsCont(0);
    } else {
      setWordsCont((prevCont) => prevCont + 1);
    }
    setter(newTemplateState);
  };
  const handleAddExp = () => {
    if (Exp.postion.length == 0 || Exp.company.length == 0) {
      return;
    }
    const newTemplateState = cloneDeep(templateState);

    newTemplateState.content.sections.forEach((ele, ind) => {
      if (ele.title === "Experience") {
        ele.details.push({
          id: ind + `-${ele.details.length + 1}`,
          text: "",
          structure: Exp,
        });
      }
    });

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
      setWordsCont(0);
    } else {
      setWordsCont((prevCont) => prevCont + 1);
    }
    setter(newTemplateState);
  };
  return (
    <section className="relative w-[29rem] h-[22rem] transition-colo bg-secant p-4 rounded-3xl flex flex-row">
      <section>
        <ul className="flex flex-col font-serif space-y-2">
          <li>
            <button
              onClick={() => setEditSelect(0)}
              className={`${
                EditSelect !== 0
                  ? "before:scale-0 before:opacity-0 text-secant3"
                  : "before:scale-100 before:opacity-100 text-secant2"
              } before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative`}
            >
              Header
            </button>
          </li>
          {templateState.content.sections.map((ele, ind) => (
            <li key={ele.id}>
              <button
                onClick={() => setEditSelect(ind + 1)}
                className={`${
                  EditSelect !== ind + 1
                    ? "before:scale-0 before:opacity-0 text-secant3"
                    : "before:scale-100 before:opacity-100 text-secant2"
                } before:content-['']  before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative`}
              >
                {ele.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full">
        <AnimatePresence>
          {EditSelect === 0 && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center space-y-4 px-4"
            >
              {Object.keys(templateState.content.header).map((ele, index) => {
                const str = ele as keyof typeof templateState.content.header;
                return (
                  <fieldset
                    className="flex flex-row items-center justify-between w-80"
                    key={index}
                  >
                    <label className="font-bold font-serif" htmlFor={`${ele}`}>
                      {ele}
                    </label>
                    <div className="before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative">
                      <input
                        className="focus:outline-none px-4 py-1  caret-secant"
                        tabIndex={!currTab ? 1 : -1}
                        onChange={(event) => {
                          const { value } = event.target;
                          if (wordsCont + 1 >= 3) {
                            setHistory((prevHistory) => {
                              const newHistory = cloneDeep(prevHistory);
                              newHistory.undoStack.push({
                                ...templateState,
                                content: {
                                  ...templateState.content,
                                  header: {
                                    ...templateState.content.header,
                                    [ele]: value,
                                  },
                                },
                              });

                              if (newHistory.undoStack.length > 50) {
                                newHistory.undoStack.shift();
                              }

                              while (newHistory.redoStack.length) {
                                newHistory.redoStack.pop();
                              }

                              return newHistory;
                            });
                            setWordsCont(0);
                          } else {
                            setWordsCont((prevCont) => prevCont + 1);
                          }

                          setter((prev) => {
                            return {
                              ...prev,
                              content: {
                                ...prev.content,
                                header: {
                                  ...prev.content.header,
                                  [ele]: value,
                                },
                              },
                            };
                          });
                        }}
                        type="text"
                        value={templateState.content.header[str]}
                        name={`${ele}`}
                        id={`${ele}`}
                      />
                    </div>
                  </fieldset>
                );
              })}
            </motion.form>
          )}
          {EditSelect !== 0 &&
            templateState.content.sections.length >= EditSelect &&
            templateState.content.sections[EditSelect - 1].title ===
              "Skills" && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center w-full space-y-4 px-4"
              >
                <fieldset className="flex flex-row items-center space-x-3">
                  <label htmlFor="skill" className="font-bold">
                    Skill
                  </label>
                  <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
                    <input
                      className="focus:outline-none px-4 py-1 caret-secant"
                      tabIndex={!currTab ? 1 : -1}
                      type="text"
                      name="skill"
                      id="skill"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </div>
                </fieldset>
                <motion.button
                  ref={addBtn}
                  onClick={handleAddSkill}
                  className="selectEle w-[5rem] h-[5rem] flex justify-center items-center rounded-full text-main"
                  animate={
                    isResetting
                      ? { x: 0, y: 0 }
                      : { x: btnTranslateX, y: btnTranslateY }
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
                    Add
                  </motion.span>
                </motion.button>
              </motion.section>
            )}
          {EditSelect !== 0 &&
            templateState.content.sections.length >= EditSelect &&
            templateState.content.sections[EditSelect - 1].title ===
              "Experience" && (
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-center items-center w-full space-y-4 px-4"
              >
                {/* <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
                    <input
                      className="focus:outline-none px-4 py-1 caret-secant"
                      tabIndex={!currTab ? 1 : -1}
                      type="text"
                      name="skill"
                      id="skill"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </div> */}
                <fieldset className="flex flex-col space-y-2 w-full items-start">
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
                      start
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
                      end
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
                    <label
                      htmlFor="accomplishments"
                      className="font-bold text-sm"
                    >
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
                  className="selectEle w-[5rem] h-[5rem] flex justify-center items-center rounded-full text-main"
                  animate={
                    isResetting
                      ? { x: 0, y: 0 }
                      : { x: btnTranslateX, y: btnTranslateY }
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
                    Add
                  </motion.span>
                </motion.button>
              </motion.section>
            )}
        </AnimatePresence>
      </section>
    </section>
  );
}

export default HeaderEdit;
