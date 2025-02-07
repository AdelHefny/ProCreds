"use client";
import { RefObject, useContext } from "react";
import "./DataEdit.css";
import StyleTab from "./components/styleTab";
import TabSection from "./components/tabSection";
import TabContext from "../../contexts/tabContext";
import HeaderEdit from "./components/HeaderDataEdit";
import LayoutTab from "./components/layoutTab";

const obj = {
  field: "hello",
};

function DataEdit({
  markerRef,
  styleTab,
}: {
  markerRef: RefObject<HTMLDivElement>;
  styleTab: RefObject<HTMLButtonElement>;
}) {
  const [currTab] = useContext(TabContext);
  return (
    <div
      className="cursor-default"
      onMouseDownCapture={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-40">
        <div className="relative">
          <TabSection markerRef={markerRef} styleTab={styleTab} />
        </div>
      </div>
      <div>
        <section
          className={`${
            currTab != 2
              ? "-translate-x-[105%] opacity-0 left-2"
              : "opacity-100 sm:translate-x-12 translate-x-0"
          } transition-all duration-500 absolute sm:w-max w-full left-0 top-1/2 -translate-y-1/2 sm:z-20 z-40`}
        >
          <LayoutTab markerRef={markerRef} sectionBtn={styleTab} />
        </section>
        <section
          className={`${
            currTab != 1
              ? "-translate-x-[105%] opacity-0 left-2"
              : "opacity-100 sm:translate-x-12 translate-x-0"
          } transition-all duration-500 absolute sm:w-max w-full left-0 sm:top-1/2 top-from-nav sm:h-fit h-[85%] sm:-translate-y-1/2 sm:z-20 z-40`}
        >
          <StyleTab markerRef={markerRef} styleTab={styleTab} />
        </section>
        <section
          className={`${
            currTab != 0
              ? "-translate-x-[105%] opacity-0 left-2"
              : "opacity-100 sm:translate-x-12 translate-x-0"
          } transition-all duration-500 absolute sm:w-max w-full left-0 sm:top-1/2 top-from-nav sm:h-fit h-[85%] sm:-translate-y-1/2 sm:z-20 z-40`}
        >
          <HeaderEdit markerRef={markerRef} sectionBtn={styleTab} />
        </section>
      </div>
    </div>
  );
}

export default DataEdit;
