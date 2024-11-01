import { Dispatch, SetStateAction, createContext } from "react";
import { templateType } from "./templateContext";

export type history = {
  undoStack: templateType[];
  redoStack: templateType[];
};

export const HistoryContext = createContext<
  [history, Dispatch<SetStateAction<history>>]
>([{ undoStack: [], redoStack: [] }, () => {}]);
