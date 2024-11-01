"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./pdfEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMinus,
  faPlus,
  faRedo,
  faUndo,
} from "@fortawesome/fontawesome-free-solid";
import { TemplateContext } from "@/app/templateContext";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ContextMenu from "../contextMenu";
import NormalTemplate from "../normalTemplate/normalTemplate";
import DataEdit from "../DataEdit/DataEdit";
import TabContext from "../../contexts/tabContext";
import SelectedContext from "../../contexts/selectedContext";
import EditModeContext from "../../contexts/editModeContext";
import Options from "./components/options";

export default function PdfEditor({
  handleRedo,
  handleUndo,
}: {
  handleUndo: () => void;
  handleRedo: () => void;
}) {
  const content = useRef<HTMLDivElement>(null);
  const [templateState] = useContext(TemplateContext);
  const contentDiv = useRef<HTMLDivElement>(null);
  const contextMenuEle = useRef<HTMLUListElement>(null);
  const clickPosition = useRef<{ x: number; y: number } | null>(null);
  const [styleElement, setStyleElement] = useState("");
  const [currTab, setCurrTab] = useState(3);
  const marker = useRef<HTMLDivElement>(null);
  const styleTab = useRef<HTMLButtonElement>(null);
  const [selectedElement, setSelectedElement] = useContext(SelectedContext);
  const [isSaving, setIsSaving] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const lastDistance = useRef<number | null>(null);
  const [editMode, setEditMode] = useState({
    edit: false,
    who: "",
  });
  const edit_mode_setter = (edit: boolean, who: string) => {
    setEditMode(() => {
      return { edit, who };
    });
  };
  const showMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (contextMenuEle.current) {
      setStyleElement((e.target as HTMLParagraphElement).id);
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
    if (
      contentDiv.current &&
      clickPosition.current &&
      clickPosition.current.x != -1 &&
      clickPosition.current.y != -1
    ) {
      const offsetX = e.clientX - clickPosition.current.x;
      const offsetY = e.clientY - clickPosition.current.y;
      updatePosition(offsetX, offsetY);

      clickPosition.current = { x: e.clientX, y: e.clientY };
    }
  };
  const updatePosition = (offsetX: number, offsetY: number) => {
    if (contentDiv.current) {
      const currentTranslate = contentDiv.current.style.translate;
      const translateMatch = currentTranslate.split(" ");
      let translateX = 0;
      let translateY = 0;

      if (translateMatch.length > 1) {
        translateX = parseFloat(translateMatch[0]);
        translateY = parseFloat(translateMatch[1]);
      }

      const newX = translateX + offsetX;
      const newY = translateY + offsetY;

      contentDiv.current.style.translate = `${newX}px ${newY}px`;
    }
  };
  const touchMoveHandler = (e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && lastDistance.current !== null) {
      const newDistance = getDistance(e.touches[0], e.touches[1]);
      const distanceDiff = newDistance - lastDistance.current;

      const zoomFactor = distanceDiff * 0.01;

      updateZoom(zoomFactor);
      lastDistance.current = newDistance;
    }
    if (
      contentDiv.current &&
      clickPosition.current &&
      clickPosition.current.x !== -1 &&
      clickPosition.current.y !== -1
    ) {
      const touch = e.touches[0];
      const offsetX = touch.clientX - clickPosition.current.x;
      const offsetY = touch.clientY - clickPosition.current.y;
      updatePosition(offsetX, offsetY);
      clickPosition.current = { x: touch.clientX, y: touch.clientY };
    }
  };
  const updateZoom = (zoomChange: number) => {
    if (contentDiv.current) {
      const currentScale =
        contentDiv.current.style.scale === ""
          ? 1
          : parseFloat(contentDiv.current.style.scale);
      const newScale = Math.max(0.1, Math.min(3, currentScale + zoomChange));
      contentDiv.current.style.scale = `${newScale}`;
    }
  };
  const handleWheel = (e: {
    ctrlKey: any;
    preventDefault: () => void;
    deltaY: number;
  }) => {
    if (e.ctrlKey && content.current) {
      e.preventDefault();
      updateZoom(e.deltaY > 0 ? -0.05 : 0.05);
    }
  };

  const settingSelected = (e: MouseEvent) => {
    setSelectedElement((prev) => {
      if (prev == (e.target as Element).id) {
        return "";
      }
      return (e.target as Element).id;
    });
  };
  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY
    );
  };
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    if (templateState.templateId !== -1) {
      setIsSaving(true);
      const intervalId = setTimeout(() => {
        const savedTemplates = JSON.parse(
          localStorage.getItem("templates") || "[]"
        );
        const updatedTemplates = savedTemplates.filter(
          (ele) => ele.templateId !== templateState.templateId
        );
        updatedTemplates.push(templateState);
        localStorage.setItem("templates", JSON.stringify(updatedTemplates));
        setIsSaving(false);
      }, 3000);

      return () => clearTimeout(intervalId);
    }
  }, [templateState]);

  useEffect(() => {
    if (content.current) {
      content.current
        .querySelectorAll(
          ".card .container header h2,.card h3,.card .container header h1,.card p,.card hr ,.card li"
        )
        .forEach((ele) => {
          (ele as HTMLParagraphElement).style.border =
            (ele as HTMLParagraphElement).id == selectedElement
              ? "solid #a3b18a 2px"
              : "";
        });
    }
  }, [selectedElement]);

  useEffect(() => {
    if (content.current && contextMenuEle.current) {
      const eventListeners = [
        { event: "wheel", handler: handleWheel, options: { passive: false } },
        {
          event: "mousedown",
          handler: (e: MouseEvent) => {
            clickPosition.current = { x: e.clientX, y: e.clientY };
            setSelectedElement("");
          },
        },
        {
          event: "touchstart",
          handler: (e: TouchEvent) => {
            e.preventDefault();
            if (e.touches.length === 2) {
              lastDistance.current = getDistance(e.touches[0], e.touches[1]);
            }
            const touch = e.touches[0];
            clickPosition.current = { x: touch.clientX, y: touch.clientY };
            setSelectedElement("");
          },
        },
        { event: "mousemove", handler: mouseMoveHandler },
        { event: "touchmove", handler: touchMoveHandler },
        {
          event: "mouseleave",
          handler: (e: MouseEvent) => {
            e.preventDefault();
            clickPosition.current = { x: -1, y: -1 };
          },
        },
        {
          event: "touchend",
          handler: () => {
            lastDistance.current = null;
            clickPosition.current = { x: -1, y: -1 };
          },
        },
        {
          event: "mouseup",
          handler: () => {
            clickPosition.current = { x: -1, y: -1 };
          },
        },
      ];

      eventListeners.forEach(({ event, handler, options }) => {
        content.current?.addEventListener(
          event,
          handler as EventListener,
          options
        );
      });

      const elementSelectors =
        ".card h2,.card h3,.card h1,.card p,.card hr,.card li";
      content.current.querySelectorAll(elementSelectors).forEach((ele) => {
        (ele as HTMLElement).addEventListener("click", settingSelected);
        (ele as HTMLElement).addEventListener("contextmenu", showMenu);
        (ele as HTMLElement).addEventListener("mousedown", (e) =>
          e.preventDefault()
        );
        (ele as HTMLElement).addEventListener("touchstart", (e) =>
          e.preventDefault()
        );
      });

      contextMenuEle.current.addEventListener("mouseleave", hideMenu);
      contextMenuEle.current.addEventListener("touchend", hideMenu);

      return () => {
        eventListeners.forEach(({ event, handler }) => {
          content.current?.removeEventListener(event, handler as EventListener);
        });

        content.current?.querySelectorAll(elementSelectors).forEach((ele) => {
          (ele as HTMLElement).removeEventListener("click", settingSelected);
          (ele as HTMLElement).removeEventListener("contextmenu", showMenu);
          (ele as HTMLElement).removeEventListener("mousedown", (e) =>
            e.preventDefault()
          );
          (ele as HTMLElement).removeEventListener("touchstart", (e) =>
            e.preventDefault()
          );
        });

        contextMenuEle.current?.removeEventListener("mouseleave", hideMenu);
        contextMenuEle.current?.removeEventListener("touchend", hideMenu);
      };
    }
  }, [editMode]);

  return (
    <TabContext.Provider value={[currTab, setCurrTab]}>
      <ContextMenu
        refObject={contextMenuEle}
        styleElement={styleElement}
        marker={marker}
        styleTab={styleTab}
      />
      <DataEdit markerRef={marker} styleTab={styleTab} />
      <section
        className="bg-secant2 overflow-hidden bg-opacity-70 h-full flex items-center justify-center relative w-full editor cursor-grab"
        ref={content}
        tabIndex={0}
        aria-label="PDF Editor"
      >
        <Options templateComponent={contentDiv} />

        <div
          className="absolute bottom-0 text-secant3 right-0 flex items-center justify-center space-x-1 z-30"
          aria-label="Zoom Controls"
        >
          <button
            className="w-12 h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
            onClick={() => {
              let scaleValue = Math.min(
                2,
                +(contentDiv.current.style.scale == ""
                  ? 1
                  : contentDiv.current.style.scale) + 0.1
              );
              if (contentDiv.current) {
                contentDiv.current.style.scale = `${scaleValue}`;
              }
            }}
            aria-label="Zoom In"
          >
            <FontAwesomeIcon icon={faPlus as IconProp} />
          </button>
          <button
            className="w-12 h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
            onClick={() => {
              let scaleValue = Math.max(
                0.1,
                +(contentDiv.current.style.scale == ""
                  ? 1
                  : contentDiv.current.style.scale) - 0.1
              );
              if (contentDiv.current) {
                contentDiv.current.style.scale = `${scaleValue}`;
              }
            }}
            aria-label="Zoom Out"
          >
            <FontAwesomeIcon icon={faMinus as IconProp} />
          </button>
        </div>
        <div
          className="absolute text-secant3 bottom-0 left-0 flex items-center justify-center space-x-1 z-30"
          aria-label="Undo/Redo Controls"
        >
          <div className="flex flex-row justify-center items-center space-x-4 ml-2">
            {isSaving ? (
              <div className="loader"></div>
            ) : (
              <FontAwesomeIcon
                icon={faCheck as IconProp}
                className="h-[35px]"
              />
            )}
          </div>
          <button
            className="w-12  h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
            onClick={handleUndo}
            aria-label="Undo"
          >
            <FontAwesomeIcon icon={faUndo as IconProp} />
          </button>
          <button
            className="w-12 h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
            onClick={handleRedo}
            aria-label="Redo"
          >
            <FontAwesomeIcon icon={faRedo as IconProp} />
          </button>
        </div>
        <EditModeContext.Provider value={[editMode, edit_mode_setter]}>
          <motion.div
            className={`bg-white content w-96 h-[34rem] document`}
            style={{ fontSize: 10 }}
            ref={contentDiv}
            role="document"
            aria-live="polite"
          >
            {templateState.templateType == "normal" && (
              <NormalTemplate templateData={templateState} />
            )}
            {templateState.templateType == "fancy" && (
              <NormalTemplate templateData={templateState} />
            )}
          </motion.div>
        </EditModeContext.Provider>
      </section>
    </TabContext.Provider>
  );
}
