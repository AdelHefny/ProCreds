import { MouseEvent, useEffect, useRef } from "react";

interface TabSectionProps {
  tabSetter: (val: number) => void;
}

function TabSection({ tabSetter }: TabSectionProps) {
  const marker = useRef<HTMLDivElement>(null);
  const sectionBtn = useRef<HTMLButtonElement>(null);
  const handleSectionTab = (target: EventTarget, val: number) => {
    tabSetter(val);
    if (marker.current) {
      marker.current.style.width =
        (target as HTMLDivElement).offsetWidth + "px";
      marker.current.style.left = (target as HTMLDivElement).offsetLeft + "px";
    }
  };
  useEffect(() => {
    sectionBtn.current?.click();
  }, []);
  return (
    <section className="flex flex-row w-fit items-center justify-center relative">
      <div>
        <button
          className="outline-none p-2"
          onClick={(e) => {
            handleSectionTab(e.target, 0);
          }}
          ref={sectionBtn}
        >
          Sections
        </button>
      </div>
      <div>
        <button
          className="outline-none p-2"
          onClick={(e) => {
            handleSectionTab(e.target, 1);
          }}
        >
          style
        </button>
      </div>
      <div
        className="w-20 transition-all duration-300 drop-shadow-lg h-full absolute bottom-0 bg-gradient-to-b from-transparent to-secant  z-20 left-0"
        ref={marker}
      ></div>
    </section>
  );
}

export default TabSection;
