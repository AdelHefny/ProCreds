import { StyleMapping } from "@/app/templateContext";
import { Edit, EditLi } from "./editComponenets";

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
    <ul className="flex flex-row flex-wrap space-x-2 my-2">
      {sectionData.map((ele) => (
        <Edit
          className="overflow-hidden px-1 bg-secant3 text-white rounded-lg"
          headerType="h3"
          key={`${ele.id}`}
          data={ele.text}
          style={styleData[`${ele.id}`]}
          id={`${ele.id}`}
        />
      ))}
    </ul>
  );
}

export default SkillsSection;
