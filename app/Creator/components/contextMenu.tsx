import { CSSProperties, MouseEvent, RefObject, useContext } from "react";
import { TemplateContext } from "@/app/providors/templateContext";
import "./contextMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import TabContext from "../contexts/tabContext";
import SelectedContext from "../contexts/selectedContext";
function ContextMenu({
  refObject,
  styleElement,
  marker,
  styleTab,
}: {
  refObject: RefObject<HTMLUListElement>;
  styleElement: string;
  marker: RefObject<HTMLDivElement>;
  styleTab: RefObject<HTMLButtonElement>;
}) {
  const [, setCurrTab] = useContext(TabContext);
  const [, setter] = useContext(TemplateContext);
  const [, setSelectedElement] = useContext(SelectedContext);
  const handleColorChange = (color: string) => {
    setter((prev) => {
      return {
        ...prev,
        style: {
          ...prev.style,
          [styleElement]: { ...prev.style[styleElement], color: color },
        },
      };
    });
  };
  const handleFontChange = (fontSize: string) => {
    let appliedVal;
    if (fontSize == "small") {
      appliedVal = "0.875rem";
    } else if (fontSize == "medium") {
      appliedVal = "1.125rem";
    } else {
      appliedVal = "1.250rem";
    }
    setter((prev) => {
      return {
        ...prev,
        style: {
          ...prev.style,
          [styleElement]: { ...prev.style[styleElement], fontSize: appliedVal },
        },
      };
    });
  };
  const handleWeightChange = (weight: string) => {
    let appliedVal;
    if (weight == "small") {
      appliedVal = "300";
    } else if (weight == "medium") {
      appliedVal = "600";
    } else {
      appliedVal = "800";
    }
    setter((prev) => {
      return {
        ...prev,
        style: {
          ...prev.style,
          [styleElement]: {
            ...prev.style[styleElement],
            fontWeight: appliedVal,
          },
        },
      };
    });
  };
  const handleCustomPage = () => {
    setCurrTab(1);
    setSelectedElement(styleElement);
    if (marker.current && styleTab.current) {
      marker.current.style.height = styleTab.current.offsetHeight + "px";
      marker.current.style.top = styleTab.current.offsetTop + "px";
    }
  };
  return (
    <ul
      className="off bg-main min-w-36 p-1 rounded-lg absolute z-50 flex flex-col items-center justify-center"
      ref={refObject}
    >
      <li className="cursor-pointer relative flex flex-row items-center justify-center hover:bg-secant rounded-lg px-4 w-full text-center transition-colors duration-150 context_menu">
        <span>Style</span>
        <h3 className="absolute right-2 edit_arrow transition-all duration-200">
          <FontAwesomeIcon
            className="font-light text-secant3 opacity-60 "
            icon={faArrowRight as IconProp}
          />
        </h3>
        <ul className="edit_menu bg-main min-w-36 p-1 rounded-lg absolute z-50 flex flex-col items-center justify-center">
          <li className="cursor-pointer relative flex flex-row items-center justify-center hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150 color_btn">
            <h3>Color</h3>
            <h3 className="absolute right-2 top-0 color_arrow transition-all duration-200">
              <FontAwesomeIcon
                className="font-light text-secant3 opacity-60 "
                icon={faArrowRight as IconProp}
              />
            </h3>
            <ul className="color_menu bg-main w-max p-1 rounded-lg absolute z-50 flex flex-col items-center justify-center">
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleColorChange("red");
                }}
              >
                <h3>Red</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleColorChange("blue");
                }}
              >
                <h3>Blue</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleColorChange("black");
                }}
              >
                <h3>Black</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleColorChange("white");
                }}
              >
                <h3>White</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleColorChange("purple");
                }}
              >
                <h3>Purple</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={handleCustomPage}
              >
                <h3>Custom</h3>
              </li>
            </ul>
          </li>
          <li className="cursor-pointer relative flex flex-row items-center justify-center hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150 font_btn">
            <h3>Font size</h3>
            <h3 className="absolute right-2 top-0 font_arrow transition-all duration-200">
              <FontAwesomeIcon
                className="font-light text-secant3 opacity-60"
                icon={faArrowRight as IconProp}
              />
            </h3>
            <ul className="font_menu bg-main w-max p-1 rounded-lg absolute z-50 flex flex-col items-center justify-center">
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleFontChange("small");
                }}
              >
                <h3>Small</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleFontChange("medium");
                }}
              >
                <h3>Medium</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleFontChange("large");
                }}
              >
                <h3>Large</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={handleCustomPage}
              >
                <h3>Custom</h3>
              </li>
            </ul>
          </li>
          <li className="cursor-pointer relative hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150 weight_btn">
            <h3>font weight</h3>
            <h3 className="absolute right-2 top-0 weight_arrow transition-all duration-200">
              <FontAwesomeIcon
                className="font-light text-secant3 opacity-60 "
                icon={faArrowRight as IconProp}
              />
            </h3>
            <ul className="weight_menu bg-main w-max p-1 rounded-lg absolute z-50 flex flex-col items-center justify-center">
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleWeightChange("small");
                }}
              >
                <h3>Small</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleWeightChange("medium");
                }}
              >
                <h3>Medium</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={() => {
                  handleWeightChange("large");
                }}
              >
                <h3>Large</h3>
              </li>
              <li
                className="cursor-pointer hover:bg-secant px-4 w-full text-center rounded-lg transition-colors duration-150"
                onClick={handleCustomPage}
              >
                <h3>Custom</h3>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="text-red cursor-pointer rounded-lg hover:bg-secant px-2 w-full text-center transition-colors duration-150">
        Delete
      </li>
    </ul>
  );
}

export default ContextMenu;
