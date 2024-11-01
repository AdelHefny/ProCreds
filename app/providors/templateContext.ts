import {
  CSSProperties,
  HTMLAttributes,
  SetStateAction,
  createContext,
} from "react";
interface ImageData {
  id: string;
  data: string | ArrayBuffer; // base64 encoded image or URL
  alt: string;
  enabled: boolean;
}

export type StyleMapping = {
  [key: string]: CSSProperties;
};

export type templateType = {
  templateId: number;
  templateType: string;
  id: string;
  uid: string;
  name: string;
  dateCreated: number;
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
        structure?: any;
      }[];
    }[];
    photo: ImageData;
  };
  style: StyleMapping;
  saved: boolean;
};

export const TemplateContext = createContext<
  [templateType, (arg: SetStateAction<templateType>) => void]
>([
  {
    templateId: -1,
    id: "",
    uid: "",
    templateType: "normal",
    name: "",
    dateCreated: new Date(Date.now()).getTime(),
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
      photo: { enabled: false, data: "", alt: "", id: "" },
    },
    style: {},
    saved: false,
  },
  (arg: SetStateAction<templateType>) => {},
]);
