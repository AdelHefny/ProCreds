"use client";
import { useState, useEffect } from "react";
import { TemplateContext } from "./templateContext";

export default function TemplateProvidor({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  const [template, setTemplate] = useState({ name: "ad" });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) {
    return (
      <TemplateContext.Provider value={[template, setTemplate]}>
        {children}
      </TemplateContext.Provider>
    );
  } else {
    return <>{children}</>;
  }
}
