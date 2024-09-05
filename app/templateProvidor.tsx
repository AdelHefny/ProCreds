"use client";
import { useState, useEffect } from "react";
import { TemplateContext, templateType } from "./templateContext";
import { AnimatePresence } from "framer-motion";

export default function TemplateProvidor({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  const [template, setTemplate] = useState<templateType>({
    templateId: -1,
    name: "",
    content: {
      photo: { enabled: false, data: "", alt: "", id: "" },
      header: {
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        Phone: "",
        City: "",
        description: "",
      },
      sections: [],
    },
    style: {},
    saved: false,
  });
  return (
    <TemplateContext.Provider value={[template, setTemplate]}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </TemplateContext.Provider>
  );
}
