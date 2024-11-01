import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./contextMenu.css";
import { TemplateContext, templateType } from "@/app/providors/templateContext";
import { AuthContext } from "@/app/providors/authProvidor";
import { colRef } from "@/app/firebase/config";
import { getDocs, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
function formatDate(seconds) {
  const date = new Date(seconds); // Convert seconds to milliseconds

  const day = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero (months are 0-based)
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
function LoadTemplateModal({
  dialogRef,
  isModalOpen,
  handleCloseModal,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleCloseModal: () => void;
  isModalOpen: boolean;
}) {
  const [storedTemplates, setStoredTemplates] = useState<
    { template: templateType; isCloud: boolean }[]
  >([]);
  const { user } = useContext(AuthContext);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [, setter] = useContext(TemplateContext);

  useEffect(() => {
    const settingData = async () => {
      const savedTemplatesObj: { template: templateType; isCloud: boolean }[] =
        [];
      const cloudTemplates: { template: any; isCloud: boolean }[] = [];
      // More robust unique naming
      const generateUniqueName = (
        baseName: string,
        existingTemplates: any[]
      ) => {
        let newName = baseName;
        let count = 1;
        while (
          existingTemplates.some(
            (existingTemplate) => existingTemplate.template.name === newName
          )
        ) {
          newName = `${baseName} (${count})`;
          count++;
        }
        return newName;
      };
      if (user) {
        const q = query(colRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          let templateData = doc.data();

          templateData.name = generateUniqueName(
            templateData.name,
            cloudTemplates
          );
          cloudTemplates.push({ template: templateData, isCloud: true });
        });
      }

      // Similar logic for local templates
      const savedTemplates = JSON.parse(
        localStorage.getItem("templates") || "[]"
      ) as templateType[];

      savedTemplates.forEach((ele) => {
        // Avoid duplicates with cloud templates
        if (!cloudTemplates.some((elee) => elee.template.id === ele.id)) {
          ele.name = generateUniqueName(ele.name, [
            ...cloudTemplates,
            ...savedTemplatesObj,
          ]);
          savedTemplatesObj.push({ template: ele, isCloud: false });
        }
      });

      setStoredTemplates([...cloudTemplates, ...savedTemplatesObj]);
    };
    settingData();
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

  const handleRadioChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleLoadTemplate = () => {
    if (selectedTemplateId) {
      const selectedTemplate = storedTemplates.find(
        (template) => template.template.id === selectedTemplateId
      );
      if (selectedTemplate) {
        handleCloseModal();
        setter(selectedTemplate);
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="w-96 h-[26rem] bg-transparent cursor-default"
    >
      {isModalOpen && (
        <motion.section
          initial={{ opacity: 0, scale: 0.5, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          className="flex flex-col justify-between w-[96%] h-[94%] p-4 rounded-2xl shadow-lg bg-main"
        >
          <div className="h-[85%]">
            <h1 className="font-bold py-2">Select a template</h1>
            <ul className="py-2 pr-4 h-[90%] flex flex-col justify-start items-center space-y-2 w-full overflow-y-scroll loadMenuList">
              {storedTemplates.map((template: any) => (
                <li
                  className="w-full hover:bg-white hover:border-secant3 border-2 border-transparent items-center cursor-pointer p-2 rounded-2xl flex flex-row justify-between"
                  key={template.template.id}
                  onClick={() => handleRadioChange(template.template.id)}
                >
                  <label className="inline-flex items-center gap-2.5 my-1.25 cursor-pointer">
                    <input
                      type="radio"
                      className="custom-radio"
                      checked={selectedTemplateId === template.template.id}
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
          <div className="flex flex-row justify-start items-center space-x-2 font-bold w-full py-2">
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
