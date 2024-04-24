import { SetStateAction, createContext } from "react";

export type templateType = {
  id: number;
  name: string;
  pages: string[];
  undoStack: string[];
  redoStack: string[];
  saved: boolean;
};

export const TemplateContext = createContext<
  [templateType, (arg: SetStateAction<templateType>) => void]
>([
  { id: 3, name: "", pages: [], undoStack: [], redoStack: [], saved: false },
  (arg: SetStateAction<templateType>) => {},
]);
