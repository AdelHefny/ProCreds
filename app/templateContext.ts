import { SetStateAction, createContext } from "react";

export type templateType = {
  templateId: number;
  name: string;
  content: {
    header: {
      jobTitle: string;
      firstName: string;
      lastName: string;
      email: string;
      Phone: string;
      City: string;
      description: string;
    };
    sections: {
      title: string;
      details: string[];
    }[];
  };
  undoStack: templateType[];
  redoStack: templateType[];
  saved: boolean;
};

export const TemplateContext = createContext<
  [templateType, (arg: SetStateAction<templateType>) => void]
>([
  {
    templateId: -1,
    name: "",
    content: {
      header: {
        jobTitle: "",
        firstName: "",
        lastName: "",
        email: "",
        Phone: "",
        City: "",
        description: "",
      },
      sections: [],
    },
    undoStack: [],
    redoStack: [],
    saved: false,
  },
  (arg: SetStateAction<templateType>) => {},
]);
