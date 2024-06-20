"use client";
import { useState } from "react";
import { HistoryContext, history } from "./historyContext";

function HistoryProvidor({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) {
  const [history, setHistory] = useState<history>({
    redoStack: [],
    undoStack: [],
  });
  return (
    <HistoryContext.Provider value={[history, setHistory]}>
      {children}
    </HistoryContext.Provider>
  );
}

export default HistoryProvidor;
