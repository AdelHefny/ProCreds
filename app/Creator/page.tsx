"use client";
import { useContext, useEffect, useRef } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { TemplateContext, templateType } from "../templateContext";
import { templates } from "./templates";
import PdfEditor from "./components/pdfEditor/pdfEditor";
import NormalTemplate from "./components/normalTemplate/normalTemplate.tsx";

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
  return (
    <AnimatePresence mode="wait">
      {templateState.templateId == -1 ? (
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
                    setter((prevState: templateType) => {
                      let cache = Object.create(prevState);
                      cache.templateId = ele.templateId;
                      return cache;
                    });
                  }}
                  variants={templatesChildrenvariants}
                >
                  <h3>{ele.name}</h3>
                  {ele.templateId == 0 && <NormalTemplate templateData={ele} />}
                  {ele.templateId == 1 && <NormalTemplate templateData={ele} />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.section>
      ) : (
        <motion.section
          key="pdf-editor"
          variants={editorVarients}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-row h-screen relative"
        >
          <PdfEditor />
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Creator;
