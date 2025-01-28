import { useState, useContext } from "react";
import { TemplateContext } from "@/app/providors/templateContext";
import EditSelectContext from "@/app/Creator/contexts/EditSelectContext";
import "./checkbox.css";

const DropdownMenu = () => {
  const [templateState] = useContext(TemplateContext);
  const [selectedSection, setSelectedSection] = useContext(EditSelectContext);
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown open/close
  };

  const handleSelect = (index, title) => {
    setSelectedSection(index); // Update the selected section
    setIsOpen(false); // Close the dropdown after selection
  };

  // Determine the name of the currently selected section
  const currentTitle =
    selectedSection === 0
      ? "Header"
      : templateState.content.sections[selectedSection - 1]?.title;

  return (
    <div className="relative sm:hidden inline-block py-2">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        className="text-main font-bold px-4 py-2 rounded-md selectEle transition"
      >
        {currentTitle || "Select Tab"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-secant2 shadow-lg rounded-md z-10 text-main font-bold">
          <ul className="py-2">
            {/* Header option */}
            <li
              key={0}
              className="cursor-pointer hover:bg-secant3 px-4 py-2"
              onClick={() => handleSelect(0, "Header")}
            >
              Header
            </li>

            {/* Dynamically render sections */}
            {templateState.content.sections.map((ele, ind) => (
              <li
                key={ind}
                className="cursor-pointer hover:bg-secant3 px-4 py-2"
                onClick={() => handleSelect(ind + 1, ele.title)}
              >
                {ele.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
