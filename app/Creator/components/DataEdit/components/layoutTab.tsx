import { useContext, useState } from "react";
import "./checkbox.css";
import { TemplateContext } from "@/app/templateContext";
const sectionsList = [
  "Experience",
  "Skills",
  "Projects",
  "Education",
  "Certification",
];
function LayoutTab() {
  const [template, setter] = useContext(TemplateContext);
  const [selectedCar, setSelectedCar] = useState("");
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedCar("Add");
    if (value === "volvo") {
      console.log("adel");
    }
  };
  return (
    <section className="relative bg-secant p-4 rounded-3xl h-24 flex flex-col justify-between items-center">
      <section className="">
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
      <section className="">
        <select
          name="cars"
          id="cars"
          className="rounded-3xl h-7 cursor-pointer outline-none text-white text-center selectEle"
          value={selectedCar}
          onChange={handleSelectChange}
        >
          <option value="" hidden>
            Add
          </option>
          {sectionsList.map((ele) => {
            let flag = false;
            for (let i = 0; i < template.content.sections.length; i++) {
              if (ele == template.content.sections[i].title) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              return (
                <option className="bg-secant2" value={`${ele}`}>
                  {ele}
                </option>
              );
            } else {
              return null;
            }
          })}

          <option className="bg-secant2" value="Custom">
            Custom
          </option>
        </select>
        <div></div>
      </section>
    </section>
  );
}

export default LayoutTab;
