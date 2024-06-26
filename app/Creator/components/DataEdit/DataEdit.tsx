"use client";
import { TemplateContext, templateType } from "@/app/templateContext";
import { RefObject, useContext, useState } from "react";
import "./DataEdit.css";
import StyleTab from "./components/styleTab";
import TabSection from "./components/tabSection";
import { HistoryContext } from "@/app/historyContext";
import TabContext from "../../contexts/tabContext";

const obj = {
  field: "hello",
};

function DataEdit({
  markerRef,
  styleTab,
}: {
  markerRef: RefObject<HTMLDivElement>;
  styleTab: RefObject<HTMLButtonElement>;
}) {
  const [templateState, setter] = useContext(TemplateContext);
  const [, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [wordsCont, setWordsCont] = useState(0);
  return (
    <div className="w-[75%] mt-32 px-2 overflow-x-hidden relative">
      <div className="relative mb-4">
        <TabSection markerRef={markerRef} styleTab={styleTab} />
        <div
          className="w-20 transition-all duration-300 drop-shadow-lg h-full absolute bottom-0 bg-gradient-to-b from-transparent to-secant z-20 left-0"
          ref={markerRef}
        ></div>
      </div>
      <div
        className={`${
          !currTab ? "-translate-x-[105%] left-2" : ""
        }transition-transform duration-300 absolute w-full`}
      >
        <StyleTab />
      </div>
      <section
        className={`${
          currTab ? "translate-x-[105%]  left-2" : ""
        } transition-transform duration-300`}
      >
        <section className="relative border-secant2 border-4 py-2">
          <h1 className="absolute rounded-full -top-4 bg-main left-5 px-2 font-bold text-secant2">
            Header
          </h1>
          <form className=" flex flex-col justify-center space-y-4 px-4">
            <div className="flex flex-row justify-between">
              <fieldset className="flex flex-row items-center justify-between font-sans space-x-3">
                <label htmlFor="firstName" className="z-20">
                  First Name
                </label>
                <div className="before:content-[''] before:bg-secant before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative">
                  <input
                    className="focus:outline-none px-4 py-1 w-28 caret-secant"
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
                                firstName: value,
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
                        let returnobject = {
                          ...prev,
                          content: {
                            ...prev.content,
                            header: {
                              ...prev.content.header,
                              firstName: value,
                            },
                          },
                        };
                        return returnobject;
                      });
                    }}
                    value={templateState.content.header.firstName}
                    type="text"
                    name={`firstName`}
                    id={`firstName`}
                  />
                </div>
              </fieldset>
              <fieldset className="flex flex-row items-center justify-between font-sans space-x-3">
                <label htmlFor="lastName">Last Name</label>
                <div className="before:content-[''] before:bg-secant before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative">
                  <input
                    className="focus:outline-none px-4 py-1 w-28 caret-secant"
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
                                lastName: value,
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
                              lastName: value,
                            },
                          },
                        };
                      });
                    }}
                    type="text"
                    value={templateState.content.header.lastName}
                    name={`lastName`}
                    id={`lastName`}
                  />
                </div>
              </fieldset>
            </div>
            {Object.keys(templateState.content.header).map((ele, index) => {
              if (ele == "firstName" || ele == "lastName") {
                return;
              }
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
                  className="flex flex-row items-center justify-between "
                  key={index}
                >
                  <label htmlFor={`${ele}`}>{ele}</label>
                  <div className="before:content-[''] before:bg-secant before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative">
                    <input
                      className="focus:outline-none px-4 py-1 caret-secant"
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
        </section>
      </section>
    </div>
  );
}

export default DataEdit;
