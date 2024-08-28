import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { TemplateContext, templateType } from "@/app/templateContext";
import { useContext, useRef, useState } from "react";

function HeaderEdit() {
  const [templateState, setter] = useContext(TemplateContext);
  const [, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [wordsCont, setWordsCont] = useState(0);
  const [EditSelect, setEditSelect] = useState(0);
  const [skill, setSkill] = useState("");
  const marker = useRef<HTMLDivElement>(null);
  return (
    <section className="relative w-[29rem] h-[22rem] bg-secant p-4 rounded-3xl flex flex-row">
      <section>
        <ul className="flex flex-col font-serif space-y-2">
          <li>
            <button
              onClick={(e) => {
                setEditSelect(() => 0);
              }}
              className={`${
                EditSelect != 0
                  ? "before:scale-0 before:opacity-0"
                  : "before:scale-100 before:opacity-100"
              } before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative`}
            >
              Header
            </button>
          </li>
          {templateState.content.sections.map((ele, ind) => (
            <li>
              <button
                onClick={(e) => {
                  setEditSelect(() => ind + 1);
                }}
                className={`${
                  EditSelect != ind + 1
                    ? "before:scale-0 before:opacity-0"
                    : "before:scale-100 before:opacity-100"
                } before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative`}
              >
                {ele.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full">
        {EditSelect == 0 && (
          <form className="flex flex-col justify-center space-y-4 px-4">
            {Object.keys(templateState.content.header).map((ele, index) => {
              const str:
                | "firstName"
                | "lastName"
                | "jobTitle"
                | "email"
                | "Phone"
                | "City"
                | "description" = ele as
                | "firstName"
                | "lastName"
                | "jobTitle"
                | "email"
                | "Phone"
                | "City"
                | "description";
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
                            prevHistory.undoStack.push({
                              ...templateState,
                              content: {
                                ...templateState.content,
                                header: {
                                  ...templateState.content.header,
                                  [ele]: value,
                                },
                              },
                            });
                            if (prevHistory.undoStack.length > 50) {
                              prevHistory.undoStack.shift();
                            }
                            while (prevHistory.redoStack.length) {
                              prevHistory.redoStack.pop();
                            }
                            return prevHistory;
                          });
                          setWordsCont(0);
                        } else {
                          setWordsCont((prevCont) => {
                            return prevCont + 1;
                          });
                        }
                        setter((prev: templateType) => {
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
          </form>
        )}
        {EditSelect != 0 &&
          templateState.content.sections[EditSelect - 1].title == "Skills" && (
            <section className="flex flex-col justify-center items-center w-full space-y-4 px-4">
              <fieldset className="flex flex-row space-x-3">
                <label htmlFor="skill" className="font-bold">
                  SKill
                </label>
                <input
                  type="text"
                  name="skill"
                  id="skill"
                  value={skill}
                  onChange={(e) => {
                    setSkill((prev) => e.target.value);
                  }}
                  className="outline-none rounded-full px-4 w-56"
                />
              </fieldset>
              <button
                className="bg-gradient-to-br w-32 from-secant to-secant2 rounded-full text-main"
                onClick={() => {
                  setter((prev) => {
                    let obj = prev.content.sections;
                    obj.forEach((ele, ind) => {
                      if (ele.title == "Skills") {
                        obj[ind].details.push({
                          id: ind + `-${obj[ind].details.length}`,
                          text: skill,
                        });
                      }
                    });
                    console.log(obj);
                    return {
                      ...prev,
                      content: { ...prev.content, sections: obj },
                    };
                  });
                }}
              >
                Add
              </button>
            </section>
          )}
      </section>
    </section>
  );
}

export default HeaderEdit;
