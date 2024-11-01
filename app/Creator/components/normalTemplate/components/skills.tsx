import { StyleMapping } from "@/app/providors/templateContext";
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
    <ul className="flex flex-row flex-wrap text-sm  my-[0.5em] gap-[0.5em]">
      {sectionData.map((ele) => (
        <Edit
          className="overflow-hidden px-[0.5em] py-[0.w5em] bg-secant3 text-white rounded-xl"
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
