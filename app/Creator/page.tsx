"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { TemplateContext, templateType } from "../templateContext";
import { templates } from "./templates";
import PdfEditor from "./components/pdfEditor/pdfEditor";
import NormalTemplate from "./components/normalTemplate/normalTemplate.tsx";
import { HistoryContext } from "../historyContext.ts";
import SelectedContext from "./contexts/selectedContext.tsx";
import EditSelectContext from "./contexts/EditSelectContext.ts";
import LoadTemplateModal from "./components/loadTemplateModal.tsx";

const templatesvariants: Variants = {
  hidden: {
    x: 0,
    opacity: 1,
  },
  visible: {
    x: 100,
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const editorVarients: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -1000,
    opacity: 0,
  },
};

const templatesChildrenvariants: Variants = {
  hidden: {
    x: "100vw",
    rotateZ: -30,
  },
  visible: {
    x: 0,
    rotateZ: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    rotateZ: -30,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};
function Creator() {
  const [templateState, setter] = useContext(TemplateContext);
  const [history, setHistory] = useContext(HistoryContext);
  const [selectedElement, setSelectedElement] = useState("");
  const [EditSelect, setEditSelect] = useState(0);
  const [newTemplateSelect, setNewTemplateSelect] = useState(false);
  const loadTemplateModalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedTemplates, setStoredTemplates] = useState([]);

  // Load templates from localStorage on mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem("templates");
    if (savedTemplates) {
      setStoredTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  const handleCloseModel = () => {
    setIsModalOpen(() => false);
    loadTemplateModalRef.current?.close();
  };
  const handleLoadTemplate = () => {
    setIsModalOpen(() => true);
    loadTemplateModalRef.current?.showModal();
  };
  const editSelectSetter = (selection) => {
    setEditSelect(selection);
  };
  const handleUndo = useCallback(() => {
    if (history.undoStack[history.undoStack.length - 1] != undefined) {
      const len =
        history.undoStack[history.undoStack.length - 1].content.sections.length;
      setEditSelect(() => Math.max(len, 0));
      setter(() => history.undoStack[history.undoStack.length - 1]);
    }
    setHistory((prev) => {
      if (prev.undoStack.length > 1) {
        const newUndoStack = [...prev.undoStack];
        const newRedoStack = [...prev.redoStack];
        const lastAction = newUndoStack.pop();
        if (lastAction !== undefined) {
          newRedoStack.push(lastAction);
        }
        return {
          ...prev,
          undoStack: newUndoStack,
          redoStack: newRedoStack,
        };
      }
      return prev;
    });
  }, [history, setter, setHistory]);

  const handleRedo = useCallback(() => {
    if (history.redoStack[history.redoStack.length - 1] != undefined)
      setter(history.redoStack[history.redoStack.length - 1]);
    setHistory((prev) => {
      if (prev.redoStack.length > 0) {
        const newUndoStack = [...prev.undoStack];
        const newRedoStack = [...prev.redoStack];
        const redoItem = newRedoStack.pop();
        if (redoItem !== undefined) {
          newUndoStack.push(redoItem);
        }
        return {
          ...prev,
          undoStack: newUndoStack,
          redoStack: newRedoStack,
        };
      }
      return prev;
    });
  }, [history, setter, setHistory]);

  const keyDownHandle = useCallback(
    (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "z" &&
        event.shiftKey
      ) {
        event.preventDefault();
        handleRedo();
      } else if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "z"
      ) {
        event.preventDefault();
        handleUndo();
      }
    },
    [handleUndo]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandle, true);
    return () => window.removeEventListener("keydown", keyDownHandle, true);
  }, [keyDownHandle]);
  return (
    <SelectedContext.Provider value={[selectedElement, setSelectedElement]}>
      <AnimatePresence mode="wait">
        {templateState.templateId == -1 && (
          <div className="flex flex-col items-center justify-center h-screen">
            {newTemplateSelect && (
              <motion.section
                key="template-selection"
                variants={templatesvariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col min-h-screen sm:flex-row items-center sm:space-x-6 justify-center h-full mt-24 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {templates.map((ele) => {
                    return (
                      <motion.div
                        key={ele.name}
                        className="sm:w-64 w-[90%] h-96 cursor-pointer flex flex-col items-center justify-center"
                        onClick={() => {
                          const currDate = new Date(Date.now());
                          const DateCreated = currDate.toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          );
                          console.log(new Date(Date.now()).getFullYear());
                          console.log(new Date(Date.now()).getDate());
                          console.log(new Date(Date.now()).getMonth());
                          let val = 0;
                          if (storedTemplates.length == 0) {
                            console.log(val);
                            val = 1;
                          } else {
                            val =
                              storedTemplates[storedTemplates.length - 1]
                                .templateId + 1;
                          }
                          localStorage.setItem(
                            "templates",
                            JSON.stringify([
                              ...storedTemplates,
                              {
                                ...templateState,
                                dateCreated: DateCreated,
                                templateType: ele.templateType,
                                templateId: val,
                                name: "template" + val,
                              },
                            ])
                          );
                          setHistory((prev) => {
                            return {
                              redoStack: [],
                              undoStack: [
                                {
                                  ...templateState,
                                  dateCreated: DateCreated,
                                  templateType: ele.templateType,
                                  templateId: val,
                                  name: "template" + val,
                                },
                              ],
                            };
                          });
                          setter((prev: templateType) => {
                            return {
                              ...prev,
                              dateCreated: DateCreated,
                              templateType: ele.templateType,
                              templateId: val,
                              name: "template" + val,
                            };
                          });
                          setStoredTemplates((prev) => [
                            ...prev,
                            {
                              ...templateState,
                              dateCreated: DateCreated,
                              templateType: ele.templateType,
                              templateId: val,
                              name: "template" + val,
                            },
                          ]);
                          setNewTemplateSelect(false);
                        }}
                        variants={templatesChildrenvariants}
                      >
                        <h3>{ele.name}</h3>
                        {ele.templateType == "normal" && (
                          <NormalTemplate templateData={ele} />
                        )}
                        {ele.templateType == "fancy" && (
                          <NormalTemplate templateData={ele} />
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.section>
            )}
            {!newTemplateSelect && (
              <motion.section
                initial={{
                  opacity: storedTemplates.length - 1,
                  scale: 0.8,
                  x: 100,
                }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 100 }}
                transition={{ duration: 0.3 }}
                className="w-56 h-64 font-bold text-lg shadow-lg rounded-2xl flex flex-col items-center justify-center space-y-4 border-secant3 border-2"
              >
                <button
                  onClick={() => {
                    setNewTemplateSelect(true);
                  }}
                  className="hover:bg-secant3 hover:text-white transition-colors duration-150 rounded-2xl p-1 px-4"
                >
                  New Template
                </button>
                <button
                  onClick={handleLoadTemplate}
                  className="bg-secant3 text-white hover:text-secant transition-colors duration-150 rounded-2xl p-1 px-4 hover:bg-secant2"
                >
                  Load Template
                </button>
              </motion.section>
            )}

            <LoadTemplateModal
              isModalOpen={isModalOpen}
              handleCloseModal={handleCloseModel}
              dialogRef={loadTemplateModalRef}
            />
          </div>
        )}
        {templateState.templateId != -1 && (
          <EditSelectContext.Provider value={[EditSelect, editSelectSetter]}>
            <motion.section
              key="pdf-editor"
              variants={editorVarients}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-row h-screen relative"
            >
              <PdfEditor handleUndo={handleUndo} handleRedo={handleRedo} />
            </motion.section>
          </EditSelectContext.Provider>
        )}
      </AnimatePresence>
    </SelectedContext.Provider>
  );
}

export default Creator;
