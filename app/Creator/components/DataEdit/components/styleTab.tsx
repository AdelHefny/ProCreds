"use client";

import SelectedContext from "@/app/Creator/contexts/selectedContext";
import { useContext } from "react";

function StyleTab() {
  const [selectedElement] = useContext(SelectedContext);

  return (
    <section>
      <h1>style</h1>
      {selectedElement == "" && (
        <div className="bg-secant3 p-5 rounded-full">
          <h1 className="text-interactive">
            Please Select an element to style
          </h1>
        </div>
      )}
      {selectedElement != "" && <h1>{selectedElement}</h1>}
    </section>
  );
}

export default StyleTab;
