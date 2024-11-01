"use client";
import { useState, useEffect } from "react";
import { TemplateContext, templateType } from "./templateContext";
import { AnimatePresence } from "framer-motion";

export const emptyTemplate: templateType = {
  templateId: -1,
  templateType: "normal",
  uid: "",
  id: "",
  dateCreated: new Date(Date.now()).getTime(),
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
};

export default function TemplateProvidor({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  const [template, setTemplate] = useState<templateType>(emptyTemplate);
  return (
    <TemplateContext.Provider value={[template, setTemplate]}>
      {children}
    </TemplateContext.Provider>
  );
}
