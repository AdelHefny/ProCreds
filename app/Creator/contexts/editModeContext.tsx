import { SetStateAction, createContext } from "react";

type editType = {
  edit: boolean;
  who: string;
};

const EditModeContext = createContext<
  [editType, (edit: boolean, who: string) => void]
>([{ edit: false, who: "" }, (edit: boolean, who: string) => {}]);

export default EditModeContext;
