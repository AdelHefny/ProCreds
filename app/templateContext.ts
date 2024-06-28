import {
  CSSProperties,
  HTMLAttributes,
  SetStateAction,
  createContext,
} from "react";

export type StyleMapping = {
  [key: string]: CSSProperties;
};

export type templateType = {
  templateId: number;
  name: string;
  content: {
    header: {
      firstName: string;
      lastName: string;
      jobTitle: string;
      email: string;
      Phone: string;
      City: string;
      description: string;
    };
    sections: {
      id: string;
      title: string;
      details: {
        id: string;
        text: string;
      }[];
    }[];
  };
  style: StyleMapping;
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
    style: {},
    saved: false,
  },
  (arg: SetStateAction<templateType>) => {},
]);
