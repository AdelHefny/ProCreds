import { StyleMapping } from "@/app/templateContext";
import { EditLi } from "../editComponenets";

function SkillsSection({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: { id: string; text: string }[];
  styleData: StyleMapping;
}) {
  return (
    <ul className="flex flex-row flex-wrap">
      {sectionData.map((ele) => (
        <EditLi
          className="overflow-hidden bg-secant3 text-white rounded-lg"
          key={`${id}-${ele.id}`}
          data={ele.text}
          style={styleData[`${id}-${ele.id}`]}
          id={`${id}-${ele.id}`}
        />
      ))}
    </ul>
  );
}

export default SkillsSection;
