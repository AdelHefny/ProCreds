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
      const cloudeTemplates: { template: any; isCloud: boolean }[] = [];
      if (user) {
        const q = query(colRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          let templateData = doc.data();
          let baseName = templateData.name;
          let newName = baseName;
          let count = 1;

          // Increment the name until it is unique within cloudTemplates
          while (
            cloudeTemplates.find(
              (existingTemplate) => existingTemplate.template.name === newName
            ) !== undefined
          ) {
            newName = `${baseName}${count}`;
            count++;
          }

          // Assign the unique name
          templateData.name = newName;
          cloudeTemplates.push({ template: templateData, isCloud: true });
        });
      }

      const savedTemplates = JSON.parse(
        localStorage.getItem("templates")
      ) as templateType[];

      savedTemplates.map((ele) => {
        // Check if there's a template with the same ID in `cloudTemplates`
        if (
          cloudeTemplates.find((elee) => {
            return elee.template.id === ele.id;
          }) == undefined
        ) {
          let baseName = ele.name; // Original name to use as the base
          let newName = baseName;
          let count = 1;

          // Increment the name until it is unique
          while (
            cloudeTemplates.find((elee) => elee.template.name === newName) !==
            undefined
          ) {
            newName = `${baseName}${count}`;
            count++;
          }

          // Assign the unique name
          ele.name = newName;
          savedTemplatesObj.push({ template: ele, isCloud: false });
        }
      });

      if (savedTemplates || cloudeTemplates) {
        const data = [...cloudeTemplates, ...savedTemplatesObj];
        console.log(data);
        setStoredTemplates(data);
      }
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
      if (selectedTemplate.template) {
        handleCloseModal();
        setter(selectedTemplate.template);
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
              {storedTemplates.map((template) => (
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
                    <h1 className="font-bold ">{template.template.name}</h1>
                  </label>
                  {template.isCloud && (
                    <FontAwesomeIcon
                      className="text-secant3"
                      icon={faCloud as IconProp}
                    />
                  )}
                  <h1 className="text-gray-300 text-sm">
                    {formatDate(template.template.dateCreated)}
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
