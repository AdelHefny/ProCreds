"use client";
import { TemplateContext, templateType } from "@/app/templateContext";
import { useContext, useState } from "react";
import "./DataEdit.css";
import StyleTab from "./components/styleTab";
import TabSection from "./components/tabSection";
function DataEdit() {
  const [currTab, setCurrTab] = useState(0);
  const [templateState, setter] = useContext(TemplateContext);
  const tabSetter = (val: number) => {
    setCurrTab(val);
  };
  return (
    <div className="w-[75%] mt-32 px-2 overflow-x-hidden ">
      <TabSection tabSetter={tabSetter} />
      <div
        className={`${
          !currTab ? "-translate-x-full relative left-2" : ""
        }transition-transform duration-300`}
      >
        <StyleTab />
      </div>
      <section
        className={`${
          currTab ? "translate-x-full relative left-2" : ""
        } transition-transform duration-300`}
      >
        <section className="relative border-secant2 border-4">
          <h1 className="absolute rounded-full -top-4 bg-main left-5 px-2 font-bold text-secant2">
            Header
          </h1>
          <form className=" flex flex-col justify-center space-y-4 px-4">
            <div className="flex flex-row justify-between">
              <fieldset className="flex flex-row items-center justify-between font-sans space-x-3">
                <label htmlFor="firstName">First Name</label>
                <div className="before:content-[''] before:bg-secant before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative">
                  <input
                    className="focus:outline-none px-4 py-1 w-28 caret-secant"
                    onChange={(event) => {
                      const { value } = event.target;
                      setter((prev: templateType) => {
                        return {
                          ...prev,
                          content: {
                            ...prev.content,
                            header: {
                              ...prev.content.header,
                              firstName: value,
                            },
                          },
                        };
                      });
                    }}
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
                    onChange={(event) => {
                      const { value } = event.target;
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
                    name={`lastName`}
                    id={`lastName`}
                  />
                </div>
              </fieldset>
            </div>
            {Object.keys(templateState.content.header).map((ele) => {
              if (ele == "firstName" || ele == "lastName") {
                return;
              }
              return (
                <fieldset className="flex flex-row items-center justify-between ">
                  <label htmlFor={`${ele}`}>{ele}</label>
                  <div className="before:content-[''] before:bg-secant before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300 relative">
                    <input
                      className="focus:outline-none px-4 py-1 caret-secant"
                      onChange={(event) => {
                        const { value } = event.target;
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
