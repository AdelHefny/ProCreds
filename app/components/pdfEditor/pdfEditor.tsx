"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./pdfEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  IconDefinition,
} from "@fortawesome/fontawesome-free-solid";

export default function PdfEditor() {
  const [scale, setScale] = useState(1);
  const content = useRef<HTMLDivElement>(null);
  const handleWheel = (e: {
    ctrlKey: any;
    preventDefault: () => void;
    deltaY: number;
  }) => {
    if (e.ctrlKey && content.current) {
      e.preventDefault();
      setScale((prev) => {
        console.log(
          Math.max(0.1, Math.min(3, prev + (e.deltaY > 0 ? 0.1 : -0.1)))
        );
        return Math.max(0.1, Math.min(3, prev + (e.deltaY > 0 ? 0.1 : -0.1)));
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
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="bg-amber-500 w-12 h-5 rounded-md text-sm"
          onClick={() => {
            setScale((prev) => Math.max(0.1, prev - 0.1));
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
      <motion.div
        className={`w-32 h-32 bg-white content`}
        animate={{ scale: scale }}
      ></motion.div>
    </section>
  );
}
