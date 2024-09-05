import { SetStateAction, createContext } from "react";

const EditSelectContext = createContext<[number, (selection: number) => void]>([
  0,
  (selection: number) => {},
]);

export default EditSelectContext;
