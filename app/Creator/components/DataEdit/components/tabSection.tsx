import TabContext from "@/app/Creator/contexts/tabContext";
import { faPaintBrush, faPenSquare } from "@fortawesome/fontawesome-free-solid";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RefObject, useContext, useEffect, useRef } from "react";
import layoutImage from "../../../../../public/layout-60.png";
import Image from "next/image";
function TabSection({
  markerRef,
  styleTab,
}: {
  markerRef: RefObject<HTMLDivElement>;
  styleTab: RefObject<HTMLButtonElement>;
}) {
  const sectionBtn = useRef<HTMLButtonElement>(null);
  const layoutBtn = useRef<HTMLButtonElement>(null);
  const [, setCurrTab] = useContext(TabContext);

  useEffect(() => {
    sectionBtn.current?.click();
  }, []);

  return (
    <>
      <div
        className="w-10 transition-all z-0 duration-300 drop-shadow-lg absolute top-0 bg-gradient-to-r from-secant to-transparent  left-0"
        ref={markerRef}
      ></div>
      <section className="flex flex-col w-fit items-center justify-center relative">
        <div>
          <button
            className="outline-none p-2 z-10"
            ref={layoutBtn}
            onClick={(e) => {
              setCurrTab((prev) => {
                if (prev == 2) {
                  if (markerRef.current) {
                    markerRef.current.style.height = "0px";
                  }
                  return 3;
                } else {
                  if (markerRef.current) {
                    markerRef.current.style.height =
                      layoutBtn.current.offsetHeight + "px";
                    markerRef.current.style.top =
                      layoutBtn.current.offsetTop + "px";
                  }
                  return 2;
                }
              });
            }}
          >
            <Image
              className="w-[1.125rem]"
              src={layoutImage}
              alt="layout image"
            />
          </button>
        </div>
        <div>
          <button
            className="outline-none p-2 z-10"
            ref={sectionBtn}
            onClick={(e) => {
              setCurrTab((prev) => {
                if (prev == 0) {
                  if (markerRef.current) {
                    markerRef.current.style.height = "0px";
                  }
                  return 3;
                } else {
                  if (markerRef.current) {
                    markerRef.current.style.height =
                      sectionBtn.current.offsetHeight + "px";
                    markerRef.current.style.top =
                      sectionBtn.current.offsetTop + "px";
                  }
                  return 0;
                }
              });
            }}
          >
            <FontAwesomeIcon icon={faPenSquare as IconDefinition} />
          </button>
        </div>
        <div>
          <button
            className="outline-none p-2 z-10"
            ref={styleTab}
            onClick={(e) => {
              setCurrTab((prev) => {
                if (prev == 1) {
                  if (markerRef.current) {
                    markerRef.current.style.height = "0px";
                  }
                  return 3;
                } else {
                  if (markerRef.current) {
                    markerRef.current.style.height =
                      styleTab.current.offsetHeight + "px";
                    markerRef.current.style.top =
                      styleTab.current.offsetTop + "px";
                  }
                  return 1;
                }
              });
            }}
          >
            <FontAwesomeIcon icon={faPaintBrush as IconDefinition} />
          </button>
        </div>
      </section>
    </>
  );
}

export default TabSection;
