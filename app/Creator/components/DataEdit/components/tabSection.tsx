import TabContext from "@/app/Creator/contexts/tabContext";
import { RefObject, useContext, useEffect, useRef } from "react";

function TabSection({
  markerRef,
  styleTab,
}: {
  markerRef: RefObject<HTMLDivElement>;
  styleTab: RefObject<HTMLButtonElement>;
}) {
  const sectionBtn = useRef<HTMLButtonElement>(null);
  const [, setCurrTab] = useContext(TabContext);

  const handleSectionTab = (target: EventTarget, val: number) => {
    setCurrTab(val);
    if (markerRef.current && target instanceof HTMLElement) {
      markerRef.current.style.width = target.offsetWidth + "px";
      markerRef.current.style.left = target.offsetLeft + "px";
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
          ref={styleTab}
          onClick={(e) => {
            handleSectionTab(e.target, 1);
          }}
        >
          Style
        </button>
      </div>
    </section>
  );
}

export default TabSection;
