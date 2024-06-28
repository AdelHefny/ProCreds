import { MutableRefObject, SetStateAction, createContext } from "react";

const SelectedContext = createContext<
  [string, (arg: SetStateAction<string>) => void]
>(["", (arg: SetStateAction<string>) => {}]);

export default SelectedContext;
