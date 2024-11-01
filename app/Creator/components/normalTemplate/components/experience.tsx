import { StyleMapping } from "@/app/providors/templateContext";
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
    <ul className="flex flex-col my-[0.5em]">
      {sectionData.map((ele) => (
        <li
          className="overflow-hidden px-[0.25em] rounded-lg"
          key={`${id}-${ele.id}`}
          style={styleData[`${id}-${ele.id}`]}
          id={`${id}-${ele.id}`}
        >
          <h1 id={`${id}-${ele.id}-postion`} className="font-bold">
            {ele.structure.postion}
          </h1>
          <h3 id={`${id}-${ele.id}-company`}>{ele.structure.company}</h3>
          <div className="flex flex-row items-center justify-between space-x-[0.5em] text-secant3 text-xs">
            <div className="flex flex-row items-center space-x-[0.25em]">
              <h3 id={`${id}-${ele.id}-start`}>{ele.structure.date.start}</h3>
              <span className="text-black">-</span>
              {ele.structure.date.present ? (
                <h3 id={`${id}-${ele.id}-Present`}>Present</h3>
              ) : (
                <h3 id={`${id}-${ele.id}-end`}>{ele.structure.date.end}</h3>
              )}
            </div>
            {ele.structure.location !== undefined && (
              <h3 id={`${id}-${ele.id}-location`}>{ele.structure.location}</h3>
            )}
          </div>
          <p className="text-sm" id={`${id}-${ele.id}-accomplishments`}>
            {ele.structure.accomplishments}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default Experience;
