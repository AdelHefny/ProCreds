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
    id: 3,
    name: "asd",
    pages: [],
    undoStack: [],
    redoStack: [],
    saved: false,
  });
  return (
    <TemplateContext.Provider value={[template, setTemplate]}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </TemplateContext.Provider>
  );
}
