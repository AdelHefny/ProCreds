import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./contextMenu.css";
import { TemplateContext } from "@/app/templateContext";

function LoadTemplateModal({
  dialogRef,
  isModalOpen,
  handleCloseModal,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleCloseModal: () => void;
  isModalOpen: boolean;
}) {
  const [storedTemplates, setStoredTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );
  const [, setter] = useContext(TemplateContext);

  useEffect(() => {
    const savedTemplates = localStorage.getItem("templates");
    if (savedTemplates) {
      setStoredTemplates(JSON.parse(savedTemplates));
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dialogDimensions = dialogRef.current?.getBoundingClientRect();
      if (
        isModalOpen &&
        dialogDimensions &&
        (e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom)
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dialogRef, isModalOpen, handleCloseModal]);

  const handleRadioChange = (templateId: number) => {
    setSelectedTemplateId(templateId);
  };

  const handleLoadTemplate = () => {
    if (selectedTemplateId) {
      const selectedTemplate = storedTemplates.find(
        (template: any) => template.templateId === selectedTemplateId
      );
      if (selectedTemplate) {
        handleCloseModal();
        setter(selectedTemplate);
      }
    }
  };

  return (
    <dialog ref={dialogRef} className="w-96 h-96 bg-transparent cursor-default">
      {isModalOpen && (
        <motion.section
          initial={{ opacity: 0, scale: 0.5, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          className="flex flex-col justify-between w-[96%] h-[93%] p-4 rounded-2xl shadow-lg bg-main"
        >
          <div>
            <h1 className="font-bold">Select a template</h1>
            <ul className="py-2 flex flex-col justify-start items-center space-y-2 w-full">
              {storedTemplates.map((template: any) => (
                <li
                  className="w-full hover:bg-white hover:border-secant3 border-2 border-transparent items-center cursor-pointer p-2 rounded-2xl flex flex-row justify-between"
                  key={template.templateId}
                  onClick={() => handleRadioChange(template.templateId)}
                >
                  <label className="inline-flex items-center gap-2.5 my-1.25 cursor-pointer">
                    <input
                      type="radio"
                      className="custom-radio"
                      checked={selectedTemplateId === template.templateId}
                      onChange={() => {}}
                    />
                  </label>
                  <h1 className="font-bold ">{template.name}</h1>
                  <h1 className="text-gray-300 text-sm">
                    {template.dateCreated}
                  </h1>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row justify-start items-center space-x-2 font-bold w-full">
            <button
              className="bg-secant3 text-white hover:text-secant transition-colors duration-150 rounded-2xl p-1 px-4 hover:bg-secant2"
              onClick={handleLoadTemplate}
              disabled={!selectedTemplateId}
            >
              Load
            </button>
            <button
              onClick={handleCloseModal}
              className="hover:bg-secant3 hover:text-white transition-colors duration-150 rounded-2xl p-1 px-4"
            >
              Close
            </button>
          </div>
        </motion.section>
      )}
    </dialog>
  );
}

export default LoadTemplateModal;
