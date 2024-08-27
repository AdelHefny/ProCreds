import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { TemplateContext, templateType } from "@/app/templateContext";
import { useContext, useState } from "react";

function HeaderEdit() {
  const [templateState, setter] = useContext(TemplateContext);
  const [, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [wordsCont, setWordsCont] = useState(0);
  return (
    <section className="relative bg-secant p-4 rounded-3xl">
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
    </section>
  );
}

export default HeaderEdit;
