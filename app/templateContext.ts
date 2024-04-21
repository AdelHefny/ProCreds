"use client";
import { SetStateAction, createContext } from "react";

export const TemplateContext = createContext<
  [{ name: string }, (arg: SetStateAction<{ name: string }>) => void]
>([{ name: "adel" }, (arg: SetStateAction<{ name: string }>) => {}]);
