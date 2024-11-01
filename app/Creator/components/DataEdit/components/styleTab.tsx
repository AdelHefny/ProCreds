"use client";

import SelectedContext from "@/app/Creator/contexts/selectedContext";
import { TemplateContext } from "@/app/providors/templateContext";
import { useContext, useEffect } from "react";

function StyleTab() {
  const [selectedElement] = useContext(SelectedContext);
  const [templateState, setter] = useContext(TemplateContext);

  const selectedStyle = selectedElement
    ? templateState.style[selectedElement]
    : null;

  return (
    <section className="relative w-[29rem] z-50  transition- bg-secant p-4 rounded-xl">
      <h1 className="font-serif font-bold text-lg">Style</h1>
      {selectedElement === "" && (
        <div className="bg-secant3 p-5 rounded-full">
          <h1 className="text-interactive">
            Please Select an element to style
          </h1>
        </div>
      )}
      {selectedElement !== "" && (
        <section>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="color-input">Color</label>
              <input
                type="color"
                className="p-1 h-10 w-14 block bg-transparent cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                value={selectedStyle ? selectedStyle.color : "#000000"}
                onChange={(value) => {
                  setter((prev) => {
                    return {
                      ...prev,
                      style: {
                        ...prev.style,
                        [selectedElement]: {
                          ...prev.style[selectedElement],
                          color: value.target.value,
                        },
                      },
                    };
                  });
                }}
                id="color-input"
                title="Choose your color"
              />
            </div>
            <div className="flex flex-row items-center justify-between space-x-2 ">
              <label htmlFor="font-size-input">Font size</label>
              <input
                type="number"
                size={2}
                name="font-size"
                id="font-size-input"
                className="rounded-lg px-2 py-1"
                value={selectedStyle ? selectedStyle.fontSize : 11}
                onChange={(value) => {
                  setter((prev) => {
                    return {
                      ...prev,
                      style: {
                        ...prev.style,
                        [selectedElement]: {
                          ...prev.style[selectedElement],
                          fontSize: Number(value.target.value),
                        },
                      },
                    };
                  });
                }}
              />
            </div>
          </form>
        </section>
      )}
    </section>
  );
}

export default StyleTab;
