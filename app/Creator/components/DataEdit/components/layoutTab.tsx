import { RefObject, useContext, useEffect, useRef, useState } from "react";
import "./checkbox.css";
import { motion } from "framer-motion";
import { TemplateContext, templateType } from "@/app/providors/templateContext";
import { useBtnBubbleEffect } from "@/app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import TabContext from "@/app/Creator/contexts/tabContext";
const avSections = [
  "Experience",
  "Skills",
  "Projects",
  "Education",
  "Certification",
];
function LayoutTab({
  markerRef,
  sectionBtn,
}: {
  markerRef: RefObject<HTMLDivElement>;
  sectionBtn: RefObject<HTMLButtonElement>;
}) {
  const [template, setter] = useContext(TemplateContext);
  const [sectionsList, setSectionsList] = useState(avSections);
  const [showOptions, setShowOptions] = useState(false);
  const [, setCurrTab] = useContext(TabContext);

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
  const handleDeleteSection = (section) => {
    setter((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: prev.content.sections.filter((sec) => sec.id !== section.id),
      },
    }));
  };
  return (
    <section className="relative sm:w-[20rem] w-full bg-secant p-4 rounded-xl flex flex-col justify-start items-center">
      <div className="absolute top-4 right-4 cursor-pointer z-40 sm:hidden">
        <button
          onClick={() => {
            setCurrTab((prev) => {
              if (prev == 2) {
                if (markerRef.current) {
                  markerRef.current.style.height = "0px";
                }
                return 3;
              } else {
                if (markerRef.current) {
                  markerRef.current.style.height =
                    sectionBtn.current.offsetHeight + "px";
                  markerRef.current.style.top =
                    sectionBtn.current.offsetTop + "px";
                }
                return 0;
              }
            });
          }}
        >
          <FontAwesomeIcon icon={faX as IconProp} size="xl" />
        </button>
      </div>
      <h3 className="text-start w-full font-serif font-bold">Add Sections</h3>
      <section className="flex flex-col w-full justify-center items-center">
        <motion.button
          onClick={() => setShowOptions(!showOptions)}
          className="h-[5rem] rounded-full w-[5rem] cursor-pointer outline-none text-main flex justify-center items-center selectEle"
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
        {showOptions && sectionsList.length ? (
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
          </ul>
        ) : (
          ""
        )}
      </section>
      <section className="w-full flex flex-col items-center space-y-2">
        {template.content.sections.map((section) => (
          <div
            key={section.id}
            className="flex flex-row justify-between items-center w-full"
          >
            <p>{section.title}</p>
            <button
              className="bg-gradient-to-tr from-secant to-secant2 h-10 text-sm py-4 px-6 flex items-center justify-cente rounded-full text-main"
              onClick={() => handleDeleteSection(section)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}

export default LayoutTab;
