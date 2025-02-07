"use client";
import { useState } from "react";
import { document, DocumentContext } from "./documentContext";

function DocumentProvidor({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  const [Document, setDocument] = useState<document>(null);
  return (
    <DocumentContext.Provider value={[Document, setDocument]}>
      {children}
    </DocumentContext.Provider>
  );
}

export default DocumentProvidor;
