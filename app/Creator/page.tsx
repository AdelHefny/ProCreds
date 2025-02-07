"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { TemplateContext, templateType } from "../providors/templateContext.ts";
import { templates } from "./templates";
import PdfEditor from "./components/pdfEditor/pdfEditor";
import { HistoryContext } from "../providors/historyContext.ts";
import SelectedContext from "./contexts/selectedContext.tsx";
import EditSelectContext from "./contexts/EditSelectContext.ts";
import LoadTemplateModal from "./components/loadTemplateModal.tsx";
import "./creator.css";
import TemplateCard from "./components/templateCard.tsx";
import { AuthContext } from "../providors/authProvidor.tsx";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { colRef } from "../firebase/config.ts";
import { DocumentContext } from "../providors/documentContext.ts";

const templatesvariants: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
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

function Creator() {
  const [templateState, setter] = useContext(TemplateContext);
  const [history, setHistory] = useContext(HistoryContext);
  const [selectedElement, setSelectedElement] = useState("");
  const [EditSelect, setEditSelect] = useState(0);
  const [newTemplateSelect, setNewTemplateSelect] = useState(false);
  const loadTemplateModalRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedTemplates, setStoredTemplates] = useState([]);
  const { user } = useContext(AuthContext);
  const [documentReference, setDocumentReference] = useContext(DocumentContext);
  // Load templates from localStorage on mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem("templates");
    if (savedTemplates) {
      setStoredTemplates(JSON.parse(savedTemplates));
    }
  }, []);

  const documentSetter = (
    docRef: DocumentReference<DocumentData, DocumentData>
  ) => {
    setDocumentReference(docRef);
  };

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
              <div className="flex flex-col md:items-center md:justify-center overflow-scroll w-full h-full space-y-2 md:mt-16 mt-16">
                <h1 className="font-bold text-lg">Select a Template</h1>
                <motion.section
                  key="template-selection"
                  variants={templatesvariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6 md:justify-center md:pt-0 w-full"
                >
                  <AnimatePresence mode="wait">
                    {templates.map((ele) => (
                      <section
                        className="flex flex-col items-center justify-center space-y-2 relative h-max"
                        onClick={async () => {
                          const currDate = new Date(Date.now());
                          let val = 0;
                          if (storedTemplates.length == 0) {
                            val = 1;
                          } else {
                            storedTemplates.map((ele: templateType) => {
                              val = Math.max(ele.templateId + 1, val);
                            });
                          }
                          const currTemplate: templateType = {
                            ...templateState,
                            dateCreated: currDate.getTime(),
                            uid: user?.uid,
                            id: doc(colRef, crypto.randomUUID()).id,
                            templateType: ele.templateType,
                            templateId: val,
                            name: "template" + val,
                          };
                          setter(() => {
                            return currTemplate;
                          });
                          setStoredTemplates((prev) => [...prev, currTemplate]);
                          setNewTemplateSelect(false);
                          if (user) {
                            const currTime = Timestamp.now();
                            const docRef = doc(colRef, currTemplate.id); // Use template.id as the document ID
                            await setDoc(docRef, {
                              ...currTemplate,
                              uid: user.uid,
                              dateCreated: currTime,
                            }).then(() => {
                              documentSetter(docRef);
                            });
                            return;
                          }

                          localStorage.setItem(
                            "templates",
                            JSON.stringify([...storedTemplates, currTemplate])
                          );
                          setHistory((prev) => {
                            return {
                              redoStack: [],
                              undoStack: [currTemplate],
                            };
                          });
                        }}
                        key={ele.templateId}
                      >
                        <TemplateCard template={ele} key={ele.templateId} />
                      </section>
                    ))}
                  </AnimatePresence>
                </motion.section>
              </div>
            )}
            {!newTemplateSelect && (
              <motion.section
                initial={{
                  opacity: 0,
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
                  New Resume
                </button>
                <button
                  onClick={handleLoadTemplate}
                  className="bg-secant3 text-white hover:text-secant transition-colors duration-150 rounded-2xl p-1 px-4 hover:bg-secant2"
                >
                  Load Resume
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
              <PdfEditor
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                documentRef={documentReference}
                documentSetter={documentSetter}
              />
            </motion.section>
          </EditSelectContext.Provider>
        )}
      </AnimatePresence>
    </SelectedContext.Provider>
  );
}

export default Creator;
