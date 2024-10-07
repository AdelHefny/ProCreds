import { TemplateContext } from "@/app/templateContext";
import {
  faEllipsisV,
  faFileImage,
  faFilePdf,
} from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
  MutableRefObject,
  ReactElement,
  useContext,
  useRef,
  useState,
} from "react";
import { toJpeg } from "html-to-image";
import LoadTemplateModal from "../../loadTemplateModal";

function Options({
  templateComponent,
}: {
  templateComponent: MutableRefObject<HTMLDivElement>;
}) {
  const [templateState, setter] = useContext(TemplateContext);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadTemplateModalRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    loadTemplateModalRef.current?.close();
  };
  const handleLoadTemplate = () => {
    loadTemplateModalRef.current?.showModal();
    setIsModalOpen(true);
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
  const handleDownloadJPG = () => {
    if (templateComponent.current) {
      // Clone the component
      const clonedNode = templateComponent.current.cloneNode(true);

      // Remove the translate from the cloned node
      (clonedNode as HTMLElement).style.translate = "none";
      (clonedNode as HTMLElement).style.scale = "1";
      (clonedNode as HTMLElement).style.left = "-9999px"; // Move it off-screen so the user doesn't see it

      // Append the cloned node to the body for processing
      document.body.appendChild(clonedNode);

      // Convert the cloned node to JPEG
      toJpeg(clonedNode as HTMLElement, {
        cacheBust: true,
      }).then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "template.jpeg";
        link.click();

        // Remove the cloned node after processing
        document.body.removeChild(clonedNode);
      });
    }
  };

  return (
    <>
      <LoadTemplateModal
        dialogRef={loadTemplateModalRef}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />
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
              className="absolute bg-secant top-full translate-y-1/3 w-40 space-y-1 flex flex-col items-center justify-center font-bold py-2 rounded-xl"
            >
              <li>
                <button
                  onClick={handleLoadTemplate}
                  className="hover:text-main flex flex-row justify-center items-center space-x-2 transition-colors duration-150 ease-in-out rounded-2xl w-36 py-2 hover:bg-secant3"
                >
                  <h1>Load</h1>
                </button>
              </li>
              <li>
                <button
                  onClick={handleDownloadPdf}
                  className="hover:text-main flex flex-row justify-center items-center space-x-2 transition-colors duration-150 ease-in-out rounded-2xl w-36 py-2 hover:bg-secant3"
                >
                  <FontAwesomeIcon
                    icon={faFilePdf as IconProp}
                    className="h-5"
                  />
                  <h1>Download</h1>
                </button>
              </li>
              <li>
                <button
                  onClick={handleDownloadJPG}
                  className="hover:text-main flex flex-row justify-center items-center space-x-2 transition-colors duration-150 ease-in-out rounded-2xl w-36 py-2 hover:bg-secant3"
                >
                  <FontAwesomeIcon
                    icon={faFileImage as IconProp}
                    className="h-5"
                  />
                  <h1>Download</h1>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const savedTemplates = JSON.parse(
                      localStorage.getItem("templates")
                    );
                    localStorage.setItem(
                      "templates",
                      JSON.stringify(
                        savedTemplates.filter(
                          (template: any) =>
                            template.templateId !== templateState.templateId
                        )
                      )
                    );
                    setter({
                      ...templateState,
                      templateId: -1,
                      name: "",
                      saved: false,
                      style: {},
                      content: {
                        header: {
                          City: "",
                          description: "",
                          email: "",
                          jobTitle: "",
                          Phone: "",
                          firstName: "",
                          lastName: "",
                        },
                        photo: {
                          alt: "",
                          data: "",
                          enabled: false,
                          id: "",
                        },
                        sections: [],
                      },
                    });
                  }}
                  className="hover:text-main transition-colors duration-150 ease-in-out rounded-2xl w-36 py-2 hover:bg-secant3"
                >
                  Delete
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Options;
