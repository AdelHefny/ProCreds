import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cloneDeep } from "lodash";
import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { useBtnBubbleEffect } from "@/app/hooks";
import { TemplateContext } from "@/app/templateContext";
import "../checkbox.css";

function SkillsEditSection({
  wordsCont,
  wordsContSetter,
  EditSelect,
}: {
  wordsCont: number;
  wordsContSetter: (value: number, plus: boolean) => void;
  EditSelect: number;
}) {
  const [templateState, setter] = useContext(TemplateContext);
  const [, setHistory] = useContext(HistoryContext);
  const [currTab] = useContext(TabContext);
  const [skill, setSkill] = useState("");

  const addBtn = useRef<HTMLButtonElement>(null);
  const {
    isResetting,
    btnTranslateX,
    btnTranslateY,
    textTranslateX,
    textTranslateY,
  } = useBtnBubbleEffect(addBtn);

  const handleAddSkill = () => {
    if (skill.length === 0) {
      return;
    }
    const newTemplateState = cloneDeep(templateState);

    newTemplateState.content.sections.forEach((ele) => {
      if (ele.title === "Skills") {
        ele.details.push({
          id: `${ele.details.length + 1}-${Date.now()}`,
          text: skill,
        });
      }
    });

    if (wordsCont + 1 >= 3) {
      setHistory((prevHistory) => {
        const newHistory = cloneDeep(prevHistory);
        newHistory.undoStack.push(newTemplateState);

        if (newHistory.undoStack.length > 50) {
          newHistory.undoStack.shift();
        }

        while (newHistory.redoStack.length) {
          newHistory.redoStack.pop();
        }

        return newHistory;
      });
      wordsContSetter(0, false);
    } else {
      wordsContSetter(0, true);
    }

    setter(newTemplateState);
    setSkill(""); // Clear input after adding
  };

  const handleEditSkill = (id: string, newText: string) => {
    const newTemplateState = cloneDeep(templateState);

    newTemplateState.content.sections.forEach((ele) => {
      if (ele.title === "Skills") {
        const skill = ele.details.find((detail) => detail.id === id);
        if (skill) {
          skill.text = newText;
        }
      }
    });

    setter(newTemplateState);
  };

  const handleDeleteSkill = (id: string) => {
    const newTemplateState = cloneDeep(templateState);

    newTemplateState.content.sections.forEach((ele) => {
      if (ele.title === "Skills") {
        ele.details = ele.details.filter((detail) => detail.id !== id);
      }
    });

    setter(newTemplateState);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="skillsSec flex flex-col justify-start items-center w-full space-y-4 px-4 max-h-80 overflow-y-scroll"
    >
      <fieldset className="flex flex-row items-center space-x-3">
        <label htmlFor="skill" className="font-bold">
          Skill
        </label>
        <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
          <input
            className="focus:outline-none px-4 py-1 caret-secant"
            tabIndex={!currTab ? 1 : -1}
            type="text"
            name="skill"
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>
      </fieldset>
      <motion.button
        ref={addBtn}
        onClick={handleAddSkill}
        className="selectEle min-w-[5rem] min-h-[5rem] flex justify-center items-center rounded-full text-main"
        animate={
          isResetting ? { x: 0, y: 0 } : { x: btnTranslateX, y: btnTranslateY }
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

      <div className="w-full">
        {templateState.content.sections
          .find((section) => section.title === "Skills")
          ?.details.map((skill) => (
            <div key={skill.id} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={skill.text}
                onChange={(e) => handleEditSkill(skill.id, e.target.value)}
                className="flex-1 px-4 py-1 border border-gray-300 rounded"
              />
              <button
                onClick={() => handleDeleteSkill(skill.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </motion.section>
  );
}

export default SkillsEditSection;
