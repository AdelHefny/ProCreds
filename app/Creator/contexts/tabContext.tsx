import { SetStateAction, createContext } from "react";

const TabContext = createContext<
  [number, (arg: SetStateAction<number>) => void]
>([-1, (arg: SetStateAction<number>) => {}]);

export default TabContext;
