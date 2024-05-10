"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./pdfEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/fontawesome-free-solid";
import { TemplateContext } from "@/app/templateContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ContextMenu from "../contextMenu";
import NormalTemplate from "../normalTemplate/normalTemplate";
import DataEdit from "../DataEdit/DataEdit";

export default function PdfEditor() {
  const [scale, setScale] = useState(1);
  const content = useRef<HTMLDivElement>(null);
  const [templateState, setter] = useContext(TemplateContext);
  const contentDiv = useRef<HTMLDivElement>(null);
  const contextMenuEle = useRef<HTMLUListElement>(null);
  const clickPosition = useRef<{ x: number; y: number } | null>(null);
  const showMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (contextMenuEle.current) {
      contextMenuEle.current.style.transition = "opacity 0.3s ease-in-out";
      contextMenuEle.current.classList.remove("off");
      contextMenuEle.current.style.top = `${e.clientY + 10}px`;
      contextMenuEle.current.style.left = `${e.clientX + 10}px`;
    }
  };
  const hideMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (contextMenuEle.current) {
      contextMenuEle.current.classList.add("off");
      contextMenuEle.current.style.top = `-10000px`;
      contextMenuEle.current.style.left = `-10000px`;
    }
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (contentDiv.current && clickPosition.current) {
      const offsetX = e.clientX - clickPosition.current.x;
      const offsetY = e.clientY - clickPosition.current.y;
      const currentTransform = contentDiv.current.style.transform;
      const currentScale = currentTransform.match(/scale\(([^)]+)\)/);
      const translateMatch = currentTransform.match(
        /translate\(([^,]+),([^)]+)\)/
      );
      let translateX = 0;
      let translateY = 0;

      if (translateMatch) {
        translateX = parseFloat(translateMatch[1]);
        translateY = parseFloat(translateMatch[2]);
      }

      // Update translation values based on mouse movement
      const newX = translateX + offsetX;
      const newY = translateY + offsetY;
      const scaleValue = currentScale ? parseFloat(currentScale[1]) : 1;
      // Apply the new translation
      contentDiv.current.style.transform = `translate(${newX}px, ${newY}px) scale(${scaleValue})`;

      // Update click position for the next movement
      clickPosition.current = { x: e.clientX, y: e.clientY };
    }
  };
  const handleWheel = (e: {
    ctrlKey: any;
    preventDefault: () => void;
    deltaY: number;
  }) => {
    if (e.ctrlKey && content.current) {
      e.preventDefault();
      setScale((prev) => {
        const scaleValue = Math.max(
          0.1,
          Math.min(3, prev + (e.deltaY > 0 ? -0.05 : 0.05))
        );
        if (contentDiv.current) {
          const currentTransform = contentDiv.current.style.transform;
          const translateMatch = currentTransform.match(
            /translate\(([^,]+),([^)]+)\)/
          );
          let translateX = 0;
          let translateY = 0;

          if (translateMatch) {
            translateX = parseFloat(translateMatch[1]);
            translateY = parseFloat(translateMatch[2]);
          }
          // Apply the new translation
          contentDiv.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleValue})`;
        }
        return scaleValue;
      });
    }
  };
  useEffect(() => {
    if (content.current && contextMenuEle.current) {
      content.current.addEventListener("wheel", handleWheel);
      content.current.addEventListener("mousedown", (e) => {
        e.preventDefault();
        clickPosition.current = { x: e.clientX, y: e.clientY };
        content.current?.addEventListener("mousemove", mouseMoveHandler);
      });

      content.current.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        clickPosition.current = null;
        content.current?.removeEventListener("mousemove", mouseMoveHandler);
      });
      content.current.addEventListener("mouseup", () => {
        clickPosition.current = null;
        content.current?.removeEventListener("mousemove", mouseMoveHandler);
      });
      content.current
        .querySelectorAll(".card h2,.card h1,.card p,.card hr ,.card li")
        .forEach((ele) => {
          (ele as HTMLParagraphElement).addEventListener(
            "contextmenu",
            showMenu
          );
          (ele as HTMLParagraphElement).addEventListener("mousedown", (e) => {
            e.preventDefault();
          });
        });
      contextMenuEle.current.addEventListener("mouseleave", hideMenu);
    }
    return () => {
      if (content.current && contextMenuEle.current) {
        content.current.removeEventListener("wheel", handleWheel);
        content.current.removeEventListener("mousedown", (e) => {
          e.preventDefault();
          content.current?.addEventListener("mousemove", mouseMoveHandler);
        });
        content.current.removeEventListener("mouseup", () => {
          content.current?.removeEventListener("mousemove", mouseMoveHandler);
        });
        content.current
          .querySelectorAll(".card h2,.card h1,.card p,.card hr ,.card li")
          .forEach((ele) => {
            (ele as HTMLParagraphElement).removeEventListener(
              "contextmenu",
              showMenu
            );
            (ele as HTMLParagraphElement).removeEventListener(
              "mousedown",
              (e) => {
                e.preventDefault();
              }
            );
          });
        contextMenuEle.current.removeEventListener("mouseleave", hideMenu);
      }
    };
  }, []);
  return (
    <>
      <DataEdit />
      <ContextMenu refObject={contextMenuEle} />
      <section
        className="bg-secant2 overflow-hidden bg-opacity-70 h-full flex items-center justify-center relative w-3/4 editor cursor-grab"
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
          className={`bg-white content`}
          animate={{ scale: scale }}
          ref={contentDiv}
        >
          {templateState.templateId == 0 && (
            <NormalTemplate templateData={templateState} />
          )}
          {templateState.templateId == 1 && (
            <NormalTemplate templateData={templateState} />
          )}
        </motion.div>
      </section>
    </>
  );
}
