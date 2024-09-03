import TabContext from "@/app/Creator/contexts/tabContext";
import { HistoryContext } from "@/app/historyContext";
import { useBtnBubbleEffect } from "@/app/hooks";
import { TemplateContext, templateType } from "@/app/templateContext";
import { motion } from "framer-motion";
import { cloneDeep } from "lodash";
import { useContext, useRef, useState } from "react";
import "../checkbox.css";

function CertificateSection({
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
  const [EditCertMode, setEditCertMode] = useState<string | null>(null);
  const CertSection = useRef<HTMLDivElement>(null);
  const [Cert, setCert] = useState<{
    title: string;
    issuer: string;
    date: { start: string; end: string; present: boolean };
    url: string;
  }>({
    title: "",
    issuer: "",
    date: { start: "", end: "", present: false },
    url: "",
  });
  const addBtn = useRef<HTMLButtonElement>(null);
  const {
    isResetting,
    btnTranslateX,
    btnTranslateY,
    textTranslateX,
    textTranslateY,
  } = useBtnBubbleEffect(addBtn);

  const handleAddCert = () => {
    if (Cert.title.length == 0 || Cert.issuer.length == 0) {
      return;
    }
    const newTemplateState: templateType = cloneDeep(templateState);
    if (EditCertMode) {
      // Edit existing certificate
      newTemplateState.content.sections.forEach((ele, ind) => {
        if (ele.title === "Certification") {
          const certificateIndex = ele.details.findIndex(
            (detail) => detail.id === EditCertMode
          );
          if (certificateIndex !== -1) {
            ele.details[certificateIndex].structure = Cert;
          }
          setEditCertMode(null);
        }
      });
    } else {
      newTemplateState.content.sections.forEach((ele, ind) => {
        if (ele.title === "Certification") {
          ele.details.push({
            id: ind + `-${ele.details.length + 1}`,
            text: "",
            structure: Cert,
          });
        }
      });
    }

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
    setCert({
      title: "",
      issuer: "",
      date: { start: "", end: "", present: false },
      url: "",
    });
    setter(newTemplateState);
  };

  const handleEditClick = (certificateId: string) => {
    if (CertSection.current) {
      CertSection.current.scroll({ top: 0, behavior: "smooth" });
    }
    const section = templateState.content.sections.find(
      (section) => section.title === "Certification"
    );
    if (section) {
      const certificate = section.details.find(
        (detail) => detail.id === certificateId
      );
      if (certificate) {
        setCert(certificate.structure);
        setEditCertMode(certificateId);
      }
    }
  };

  const handleDeleteClick = (certificateId: string) => {
    const newTemplateState = cloneDeep(templateState);
    const sectionIndex = newTemplateState.content.sections.findIndex(
      (section) => section.title === "Certification"
    );

    newTemplateState.content.sections[sectionIndex].details =
      newTemplateState.content.sections[sectionIndex].details.filter(
        (detail) => detail.id !== certificateId
      );

    setHistory((prevHistory) => {
      const newHistory = cloneDeep(prevHistory);
      newHistory.undoStack.push(newTemplateState);

      if (newHistory.undoStack.length > 50) newHistory.undoStack.shift();
      newHistory.redoStack = [];

      return newHistory;
    });

    setter(newTemplateState);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={CertSection}
      className="CertSection flex flex-col justify-start items-center w-full space-y-4 px-4 max-h-80 overflow-y-scroll"
    >
      <fieldset className="flex flex-col space-y-2 w-full items-start ">
        <h1 className="relative font-bold">Add Certificate</h1>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="Title" className="font-bold">
            Title
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="Title"
              id="Title"
              value={Cert.title}
              onChange={(e) =>
                setCert((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="Issuer" className="font-bold">
            Issuer
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="Issuer"
              id="Issuer"
              value={Cert.issuer}
              onChange={(e) =>
                setCert((prev) => ({
                  ...prev,
                  issuer: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <fieldset className="flex flex-row justify-between items-center w-full">
          <label htmlFor="startDate" className="font-bold text-sm">
            Start
          </label>

          <div className="max-w-16 relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 max-w-16 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="startDate"
              id="startDate"
              placeholder="m/y"
              value={Cert.date.start}
              onChange={(e) =>
                setCert((prev) => ({
                  ...prev,
                  date: { ...prev.date, start: e.target.value },
                }))
              }
            />
          </div>
          <label htmlFor="endDate" className="font-bold text-sm">
            End
          </label>

          <div className="max-w-16 relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 max-w-16 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="endDate"
              id="endDate"
              placeholder="m/y"
              value={Cert.date.end}
              disabled={Cert.date.present}
              onChange={(e) =>
                setCert((prev) => ({
                  ...prev,
                  date: { ...prev.date, end: e.target.value },
                }))
              }
            />
          </div>
          <label htmlFor="datePresent" className="font-bold text-sm">
            Present
          </label>
          <div className="checkbox-wrapper-23">
            <input
              type="checkbox"
              name="datePresent"
              onChange={(e) => {
                setCert((prev) => ({
                  ...prev,
                  date: {
                    ...prev.date,
                    present: Boolean(e.target.checked),
                  },
                }));
              }}
              checked={Cert.date.present}
              id="datePresent"
            />
            <label
              htmlFor="datePresent"
              style={{ width: "20px", height: "20px" }}
            >
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
        </fieldset>
        <div className="flex flex-row items-center justify-between w-full">
          <label htmlFor="URL" className="font-bold">
            URL
          </label>
          <div className="relative before:content-[''] before:bg-secant3 before:h-[2px] before:w-full before:origin-center before:absolute before:bottom-0 before:left-0 before:transition-all before:ease-in-out before:duration-300">
            <input
              className="focus:outline-none px-4 py-1 caret-secant"
              tabIndex={!currTab ? 1 : -1}
              type="text"
              name="URL"
              id="URL"
              value={Cert.url}
              onChange={(e) =>
                setCert((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </fieldset>

      <motion.button
        ref={addBtn}
        onClick={handleAddCert}
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
          {EditCertMode ? "Edit" : "Add"}
        </motion.span>
      </motion.button>

      <motion.section
        className={`w-full space-y-2 ${
          EditSelect == 2 ? "pb-10" : "pb-0"
        } flex flex-col justify-start items-center `}
      >
        <div className="w-full flex flex-col justify-start items-start space-y-2">
          <h2 className="relative font-bold">Certificates</h2>
          {templateState.content.sections
            .find((section) => section.title === "Certification")
            ?.details.map((detail) => (
              <div
                key={detail.id}
                className="w-full flex flex-col justify-start items-start space-y-2"
              >
                <div className="w-full flex justify-between items-center space-x-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-lg">{detail.structure.title}</span>
                    <span className="text-sm">
                      {detail.structure.issuer}
                      <span> </span>
                      <span>(</span>
                      {detail.structure.date.start}-
                      {detail.structure.date.present
                        ? "Present"
                        : detail.structure.date.end}
                      <span>)</span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-secant2 hover:underline"
                      onClick={() => handleEditClick(detail.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-secant2 hover:underline"
                      onClick={() => handleDeleteClick(detail.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <a
                  href={detail.structure.url}
                  className="text-sm text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {detail.structure.url}
                </a>
              </div>
            ))}
        </div>
      </motion.section>
    </motion.section>
  );
}

export default CertificateSection;
