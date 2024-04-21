"use client";
import PdfEditor from "../components/pdfEditor/pdfEditor";
import { useContext } from "react";
import { TemplateContext } from "../templateContext";
function Creator() {
  const [templateState, setter] = useContext(TemplateContext);
  return (
    <section className="flex flex-row h-screen">
      <section className="w-1/4">
        <h1>{templateState.name}</h1>
      </section>
      <PdfEditor />
    </section>
  );
}

export default Creator;
