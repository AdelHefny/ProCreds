import { DocumentData, DocumentReference } from "firebase/firestore";

import { createContext, Dispatch, SetStateAction } from "react";

export type document = DocumentReference<DocumentData, DocumentData>;

export const DocumentContext = createContext<
  [document, Dispatch<SetStateAction<document>>]
>([null, () => {}]);
