import { useContext, useEffect, useRef, useState } from "react";
import "./checkbox.css";
import { motion } from "framer-motion";
import { TemplateContext, templateType } from "@/app/templateContext";
import { useBtnBubbleEffect } from "@/app/hooks";
const avSections = [
  "Experience",
  "Skills",
  "Projects",
  "Education",
  "Certification",
];
function LayoutTab() {
  const [template, setter] = useContext(TemplateContext);
  const [sectionsList, setSectionsList] = useState(avSections);
  const [showOptions, setShowOptions] = useState(false);

  const addBtn = useRef<HTMLButtonElement>(null);
  const {
    isResetting,
    btnTranslateX,
    btnTranslateY,
    textTranslateX,
    textTranslateY,
  } = useBtnBubbleEffect(addBtn);

  useEffect(() => {
    setSectionsList(
      avSections.filter(
        (section) =>
          !template.content.sections.some(({ title }) => title === section)
      )
    );
  }, [template.content.sections]);

  const handleAddSection = (section) => {
    const newSection = {
      id: template.content.sections.length.toString(),
      title: section,
      details: [],
    };
    setter((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [...prev.content.sections, newSection],
      },
    }));

    setSectionsList((prevSections) =>
      prevSections.filter((sec) => sec !== section)
    );
    setShowOptions(false);
  };

  return (
    <section className="relative bg-secant p-4 rounded-3xl h-36 w-48 flex flex-col justify-between items-center">
      <section>
        <div className="flex flex-row justify-between items-center space-x-2">
          <div className="checkbox-wrapper-23">
            <input type="checkbox" id="check-23" />
            <label htmlFor="check-23" style={{ width: "20px", height: "20px" }}>
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
          <label htmlFor="check-23">Photo</label>
        </div>
      </section>
      <section className="flex justify-center items-center">
        <motion.button
          onClick={() => setShowOptions(!showOptions)}
          className="h-[5rem] rounded-full w-[5rem] cursor-pointer outline-none text-white flex justify-center items-center selectEle"
          ref={addBtn}
          animate={
            isResetting
              ? { x: 0, y: 0 }
              : { x: btnTranslateX, y: btnTranslateY }
          }
          transition={
            isResetting
              ? { type: "spring", stiffness: 500, damping: 10 }
              : { duration: 0 }
          }
        >
          <motion.span
            animate={
              isResetting
                ? { x: 0, y: 0 }
                : { x: textTranslateX, y: textTranslateY }
            }
            transition={
              isResetting
                ? { type: "spring", stiffness: 500, damping: 10 }
                : { duration: 0 }
            }
          >
            Add
          </motion.span>
        </motion.button>
        {showOptions && (
          <ul className="absolute top-full mt-2  rounded-lg bg-secant2 text-white text-center shadow-lg p-2">
            {sectionsList.map((section) => (
              <li
                key={section}
                onClick={() => handleAddSection(section)}
                className="cursor-pointer hover:bg-secant3 p-1"
              >
                {section}
              </li>
            ))}
            <li
              onClick={() => handleAddSection("Custom")}
              className="cursor-pointer hover:bg-secant3 p-1"
            >
              Custom
            </li>
          </ul>
        )}
      </section>
    </section>
  );
}

export default LayoutTab;
