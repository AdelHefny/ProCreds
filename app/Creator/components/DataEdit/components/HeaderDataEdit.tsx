import { cloneDeep } from "lodash";
import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { TemplateContext } from "@/app/templateContext";
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./checkbox.css";
import ExperienceSection from "./sections/experience";
import SkillsEditSection from "./sections/skills";
import CertificateSection from "./sections/certificate";
function HeaderEdit() {
  const [templateState, setter] = useContext(TemplateContext);
  const [history, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [wordsCont, setWordsCont] = useState(0);
  const [EditSelect, setEditSelect] = useState(0);

  const wordsContSetter = (value, plus) => {
    if (plus) {
      setWordsCont((prev) => prev + 1);
    } else {
      setWordsCont(value);
    }
  };

  useEffect(() => {
    if (EditSelect >= templateState.content.sections.length + 1) {
      setEditSelect(() => Math.max(templateState.content.sections.length, 0));
    }
  }, [history, templateState]);

  return (
    <section className="relative w-[29rem] h-[22rem]  transition-colo bg-secant p-4 rounded-xl flex flex-row">
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
              <SkillsEditSection
                EditSelect={EditSelect}
                wordsCont={wordsCont}
                wordsContSetter={wordsContSetter}
              />
            )}
          {EditSelect !== 0 &&
            templateState.content.sections.length >= EditSelect &&
            templateState.content.sections[EditSelect - 1].title ===
              "Experience" && (
              <ExperienceSection
                EditSelect={EditSelect}
                wordsCont={wordsCont}
                wordsContSetter={wordsContSetter}
              />
            )}
          {EditSelect !== 0 &&
            templateState.content.sections.length >= EditSelect &&
            templateState.content.sections[EditSelect - 1].title ===
              "Certification" && (
              <CertificateSection
                EditSelect={EditSelect}
                wordsCont={wordsCont}
                wordsContSetter={wordsContSetter}
              />
            )}
        </AnimatePresence>
      </section>
    </section>
  );
}

export default HeaderEdit;
