import { StyleMapping } from "@/app/templateContext";
import { EditLi } from "./editComponenets";
function Certification({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: {
    id: string;
    text: string;
    structure?: {
      title: string;
      issuer: string;
      date: { start: string; end: string; present: boolean };
      url: string;
    };
  }[];
  styleData: StyleMapping;
}) {
  return (
    <ul className="flex flex-col my-2">
      {sectionData.map((ele) => (
        <li
          className="overflow-hidden px-1 rounded-lg"
          key={`${id}-${ele.id}`}
          style={styleData[`${id}-${ele.id}`]}
          id={`${id}-${ele.id}`}
        >
          <h1 className="font-bold">{ele.structure.title}</h1>
          <h3>{ele.structure.issuer}</h3>
          <div className="flex flex-row items-center space-x-1 text-secant3 text-xs">
            <h3>{ele.structure.date.start}</h3>
            <span className="text-black">-</span>
            {ele.structure.date.present ? (
              <h3>Present</h3>
            ) : (
              <h3>{ele.structure.date.end}</h3>
            )}
          </div>
          <p className="text-sm">{ele.structure.url}</p>
        </li>
      ))}
    </ul>
  );
}

export default Certification;
