import { useContext, useEffect, useState } from "react";
import "./checkbox.css";
import { TemplateContext, templateType } from "@/app/templateContext";
const avSections = [
  "Experience",
  "Skills",
  "Projects",
  "Education",
  "Certification",
];
function LayoutTab() {
  const [template, setter] = useContext(TemplateContext);
  const [sectionsList, setSectionsList] = useState(avSections);
  const [selectedCar, setSelectedCar] = useState("");

  useEffect(() => {
    setSectionsList(
      avSections.filter(
        (section) =>
          !template.content.sections.some(({ title }) => title === section)
      )
    );
  }, [template.content.sections]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    const newSection = {
      id: template.content.sections.length.toString(),
      title: value,
      details: [],
    };

    setter((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [...prev.content.sections, newSection],
      },
    }));

    setSectionsList((prevSections) =>
      prevSections.filter((section) => section !== value)
    );
  };

  return (
    <section className="relative bg-secant p-4 rounded-3xl h-24 flex flex-col justify-between items-center">
      <section>
        <div className="flex flex-row justify-between items-center space-x-2">
          <div className="checkbox-wrapper-23">
            <input type="checkbox" id="check-23" />
            <label htmlFor="check-23" style={{ width: "20px", height: "20px" }}>
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
          <label htmlFor="check-23">Photo</label>
        </div>
      </section>
      <section>
        <select
          name="sections"
          id="sections"
          className="rounded-3xl h-7 cursor-pointer outline-none text-white text-center selectEle"
          value={selectedCar}
          onChange={handleSelectChange}
        >
          <option value="" hidden>
            Add
          </option>
          {sectionsList.map((section) => (
            <option key={section} className="bg-secant2" value={section}>
              {section}
            </option>
          ))}
          <option className="bg-secant2" value="Custom">
            Custom
          </option>
        </select>
      </section>
    </section>
  );
}

export default LayoutTab;
