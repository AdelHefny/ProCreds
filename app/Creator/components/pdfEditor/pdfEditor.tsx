"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./pdfEditor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsisV,
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
import { redirect, usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [editMode, setEditMode] = useState({
    edit: false,
    who: "",
  });
  useEffect(() => {
    console.log(templateState);
  }, [templateState]);
  const [showOptions, setShowOptions] = useState(false);
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
    if (contentDiv.current && clickPosition.current) {
      const offsetX = e.clientX - clickPosition.current.x;
      const offsetY = e.clientY - clickPosition.current.y;
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
      const scaleValue = Math.max(
        0.1,
        Math.min(
          3,
          +(contentDiv.current.style.scale == ""
            ? 1
            : contentDiv.current.style.scale) + (e.deltaY > 0 ? -0.05 : 0.05)
        )
      );
      if (contentDiv.current) {
        contentDiv.current.style.scale = `${scaleValue}`;
      }
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

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch("/Creator/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateState), // Send templateState in the body
      });

      // Check if the response is OK
      if (response.ok) {
        // Create a blob from the response
        const blob = await response.blob();

        // Create a URL for the blob and trigger the download
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "template.pdf"; // Default filename
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url); // Clean up the URL object
      } else {
        console.error("Failed to download PDF");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    setIsSaving(true);
    const intervalId = setInterval(() => {
      localStorage.setItem("templateState", JSON.stringify(templateState));
      setIsSaving(false);
    }, 3000);

    return () => clearInterval(intervalId);
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
      content.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
      content.current.addEventListener("mousedown", (e) => {
        clickPosition.current = { x: e.clientX, y: e.clientY };
        content.current?.addEventListener("mousemove", mouseMoveHandler);
        setSelectedElement("");
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
        .querySelectorAll(
          ".card h2,.card h3,.card h1,.card p,.card hr ,.card li"
        )
        .forEach((ele) => {
          (ele as HTMLParagraphElement).addEventListener(
            "click",
            settingSelected
          );
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
          clickPosition.current = { x: e.clientX, y: e.clientY };
          content.current?.addEventListener("mousemove", mouseMoveHandler);
          setSelectedElement("");
        });
        content.current.removeEventListener("mouseup", () => {
          content.current?.removeEventListener("mousemove", mouseMoveHandler);
        });
        content.current
          .querySelectorAll(
            ".card h2,.card h3,.card h1,.card p,.card hr ,.card li"
          )
          .forEach((ele) => {
            (ele as HTMLParagraphElement).removeEventListener(
              "click",
              settingSelected
            );
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
  }, [editMode]);

  return (
    <TabContext.Provider value={[currTab, setCurrTab]}>
      <ContextMenu
        refObject={contextMenuEle}
        styleElement={styleElement}
        marker={marker}
        styleTab={styleTab}
      />
      <section
        className="bg-secant2 overflow-hidden bg-opacity-70 h-full flex items-center justify-center relative w-full editor cursor-grab"
        ref={content}
        tabIndex={0}
        aria-label="PDF Editor"
      >
        <DataEdit markerRef={marker} styleTab={styleTab} />
        <div
          className="absolute top-5 right-3 w-5 h-7 text-secant3 flex items-end justify-end z-30"
          aria-label="Options"
        >
          <button
            onClick={() => {
              setShowOptions((prev) => !prev);
            }}
            className="flex justify-center items-center hover:text-secant transition-colors duration-150 ease-in-out"
          >
            <FontAwesomeIcon icon={faEllipsisV as IconProp} className="h-7" />
          </button>
          <AnimatePresence>
            {showOptions && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bg-secant top-full translate-y-1/3 w-32 flex items-center justify-center font-bold py-2 rounded-xl"
              >
                <li className="">
                  <button
                    onClick={handleDownloadPdf}
                    className="hover:text-main transition-colors duration-150 ease-in-out rounded-2xl w-28 py-2 hover:bg-secant3"
                  >
                    Download
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <div
          className="absolute bottom-0 text-secant3 right-0 flex items-center justify-center space-x-1 z-30"
          aria-label="Zoom Controls"
        >
          <button
            className="bg-amber-500 w-12 h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
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
            className="bg-amber-500 w-12 h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
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
            className="bg-amber-500 w-12  h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
            onClick={handleUndo}
            aria-label="Undo"
          >
            <FontAwesomeIcon icon={faUndo as IconProp} />
          </button>
          <button
            className="bg-amber-500 w-12 h-5 rounded-md text-sm hover:text-secant transition-colors duration-150 ease-in-out"
            onClick={handleRedo}
            aria-label="Redo"
          >
            <FontAwesomeIcon icon={faRedo as IconProp} />
          </button>
        </div>
        <EditModeContext.Provider value={[editMode, edit_mode_setter]}>
          <motion.div
            className={`bg-white content w-96 h-[34rem] document`}
            ref={contentDiv}
            role="document"
            aria-live="polite"
          >
            {templateState.templateId == 0 && (
              <NormalTemplate templateData={templateState} />
            )}
            {templateState.templateId == 1 && (
              <NormalTemplate templateData={templateState} />
            )}
          </motion.div>
        </EditModeContext.Provider>
      </section>
    </TabContext.Provider>
  );
}
