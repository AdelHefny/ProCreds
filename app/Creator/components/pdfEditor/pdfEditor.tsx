"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./pdfEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/fontawesome-free-solid";
import { TemplateContext } from "@/app/templateContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function PdfEditor() {
  const [scale, setScale] = useState(1);
  const content = useRef<HTMLDivElement>(null);
  const [templateState, setter] = useContext(TemplateContext);
  const contentDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    templateState.pages.map((ele) => {
      if (contentDiv.current) {
        contentDiv.current.innerHTML += ele;
      }
    });
  });
  const handleWheel = (e: {
    ctrlKey: any;
    preventDefault: () => void;
    deltaY: number;
  }) => {
    if (e.ctrlKey && content.current) {
      e.preventDefault();
      setScale((prev) => {
        return Math.max(0.1, Math.min(3, prev + (e.deltaY > 0 ? 0.05 : -0.05)));
      });
    }
  };
  useEffect(() => {
    if (content.current) {
      content.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }
  });
  return (
    <section
      className="bg-gray-700 bg-opacity-25 h-full flex items-center justify-center relative w-3/4"
      onWheel={handleWheel}
      ref={content}
    >
      <div className="absolute bottom-0 right-0 flex items-center justify-center space-x-1 z-30">
        <button
          className="bg-amber-500 w-12 h-5 rounded-md text-sm"
          onClick={() => {
            setScale((prev) => Math.min(2, prev + 0.1));
          }}
        >
          <FontAwesomeIcon icon={faPlus as IconProp} />
        </button>
        <button
          className="bg-amber-500 w-12 h-5 rounded-md text-sm"
          onClick={() => {
            setScale((prev) => Math.max(0.1, prev - 0.1));
          }}
        >
          <FontAwesomeIcon icon={faMinus as IconProp} />
        </button>
      </div>
      <motion.div
        className={`w-32 h-32 bg-white content`}
        animate={{ scale: scale }}
        ref={contentDiv}
      ></motion.div>
    </section>
  );
}
