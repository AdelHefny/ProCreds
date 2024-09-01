import { StyleMapping } from "@/app/templateContext";
import { EditLi } from "./editComponenets";

function Section({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: { id: string; text: string }[];
  styleData: StyleMapping;
}) {
  return (
    <ul>
      {sectionData.map((ele) => (
        <EditLi
          className="overflow-hidden"
          key={`${id}-${ele.id}`}
          data={ele.text}
          style={styleData[`${id}-${ele.id}`]}
          id={`${id}-${ele.id}`}
        />
      ))}
    </ul>
  );
}

export default Section;
