import {
  CSSProperties,
  HTMLAttributes,
  SetStateAction,
  createContext,
} from "react";

export type styleDatatype = {
  header: {
    jobTitle: CSSProperties;
    firstName: CSSProperties;
    lastName: CSSProperties;
    email: CSSProperties;
    Phone: CSSProperties;
    City: CSSProperties;
    description: CSSProperties;
  };
  sections: {
    title: CSSProperties;
    details: CSSProperties[];
  }[];
};

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
  style: styleDatatype;
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
    style: {
      header: {
        jobTitle: {},
        firstName: {},
        lastName: {},
        email: {},
        Phone: {},
        City: {},
        description: {},
      },
      sections: [],
    },
    undoStack: [],
    redoStack: [],
    saved: false,
  },
  (arg: SetStateAction<templateType>) => {},
]);
