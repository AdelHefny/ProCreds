import { StyleMapping } from "@/app/templateContext";

function Education({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: {
    id: string;
    text: string;
    structure?: {
      institution: string;
      degree: string;
      date: { start: string; end: string; present: boolean };
      location: string;
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
          <h1 className="font-bold">{ele.structure.institution}</h1>
          <h3>{ele.structure.degree}</h3>
          <div className="flex flex-row items-center justify-between text-secant3 text-xs">
            <div className="flex flex-row items-center space-x-1 ">
              <h3>{ele.structure.date.start}</h3>
              <span className="text-black">-</span>
              {ele.structure.date.present ? (
                <h3>Present</h3>
              ) : (
                <h3>{ele.structure.date.end}</h3>
              )}
            </div>
            <h3 className="text-sm">{ele.structure.location}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Education;
