import { StyleMapping } from "@/app/templateContext";
function Experience({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: {
    id: string;
    text: string;
    structure?: {
      postion: string;
      company: string;
      date: { start: string; end: string; present: boolean };
      location: string;
      accomplishments: string;
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
          <h1 className="font-bold">{ele.structure.postion}</h1>
          <h3>{ele.structure.company}</h3>
          <div className="flex flex-row items-center justify-between space-x-2 text-secant3 text-xs">
            <div className="flex flex-row items-center space-x-1">
              <h3>{ele.structure.date.start}</h3>
              <span className="text-black">-</span>
              {ele.structure.date.present ? (
                <h3>Present</h3>
              ) : (
                <h3>{ele.structure.date.end}</h3>
              )}
            </div>
            {ele.structure.location !== undefined && (
              <h3>{ele.structure.location}</h3>
            )}
          </div>
          <p className="text-sm">{ele.structure.accomplishments}</p>
        </li>
      ))}
    </ul>
  );
}

export default Experience;
