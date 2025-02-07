import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./contextMenu.css";
import { TemplateContext, templateType } from "@/app/providors/templateContext";
import { AuthContext } from "@/app/providors/authProvidor";
import { colRef } from "@/app/firebase/config";
import { getDocs, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function formatDate(timestamp: number) {
  const date = new Date(timestamp); // Convert to milliseconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
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

  // Control dialog visibility
  useEffect(() => {
    if (!dialogRef.current) return;
    if (isModalOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isModalOpen, dialogRef]);

  // Fetch templates
  useEffect(() => {
    if (!isModalOpen) return;
    const settingData = async () => {
      const savedTemplatesObj: { template: templateType; isCloud: boolean }[] =
        [];
      const cloudTemplates: { template: any; isCloud: boolean }[] = [];

      const generateUniqueName = (
        baseName: string,
        existingTemplates: { template: templateType; isCloud: boolean }[]
      ) => {
        let newName = baseName;
        let count = 1;
        while (existingTemplates.some((t) => t.template.name === newName)) {
          newName = `${baseName} (${count})`;
          count++;
        }
        return newName;
      };

      try {
        const q = query(colRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const timestamp = data.dateCreated;
          const dateCreated = timestamp?.toMillis
            ? timestamp.toMillis()
            : Date.now();
          const templateData = {
            ...data,
            name: data.name || "Untitled",
            id: doc.id,
            dateCreated,
          };
          templateData.name = generateUniqueName(
            templateData.name || "Untitled",
            cloudTemplates
          );
          cloudTemplates.push({ template: templateData, isCloud: true });
        });
      } catch (error) {
        console.error("Error loading templates:", error);
      }
      // Process local templates
      const savedTemplates = JSON.parse(
        localStorage.getItem("templates") || "[]"
      ) as templateType[];
      savedTemplates.forEach((ele) => {
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
  }, [isModalOpen, user]);

  // Close modal on outside click
  useEffect(() => {
    if (!isModalOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isModalOpen, dialogRef, handleCloseModal]);

  const handleRadioChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleLoadTemplate = () => {
    if (selectedTemplateId) {
      const selectedTemplate = storedTemplates.find(
        (t) => t.template.id === selectedTemplateId
      );
      if (selectedTemplate) {
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
            <ul className="py-2 pr-4 h-[90%] overflow-y-auto loadMenuList">
              {storedTemplates.length > 0 ? (
                storedTemplates.map((template) => (
                  <li
                    key={template.template.id}
                    onClick={() => handleRadioChange(template.template.id)}
                    className="w-full hover:bg-white hover:border-secant3 border-2 border-transparent p-2 rounded-2xl flex justify-between items-center cursor-pointer"
                  >
                    <label className="inline-flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="radio"
                        className="custom-radio"
                        checked={selectedTemplateId === template.template.id}
                        onChange={() => handleRadioChange(template.template.id)}
                        aria-label={`Select template ${template.template.name}`}
                      />
                      <h1 className="font-bold">{template.template.name}</h1>
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
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No templates found.
                </p>
              )}
            </ul>
          </div>
          <div className="flex space-x-2 py-2">
            <button
              className="bg-secant3 text-white hover:bg-secant2 px-4 py-1 rounded-2xl transition-colors duration-150"
              onClick={handleLoadTemplate}
              disabled={!selectedTemplateId}
            >
              Load
            </button>
            <button
              onClick={handleCloseModal}
              className="hover:bg-secant3 hover:text-white px-4 py-1 rounded-2xl transition-colors duration-150"
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
