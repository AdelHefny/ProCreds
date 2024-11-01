import { StyleMapping } from "@/app/templateContext";
import Link from "next/link";
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
    <ul className="flex flex-col my-[0.5em]">
      {sectionData.map((ele) => (
        <li
          className="overflow-hidden px-[0.25em] rounded-lg"
          key={`${id}-${ele.id}`}
          style={styleData[`${id}-${ele.id}`]}
          id={`${id}-${ele.id}`}
        >
          <h1 id={`${id}-${ele.id}-title`} className="font-bold">
            {ele.structure.title}
          </h1>
          <h3 id={`${id}-${ele.id}-issuer`}>{ele.structure.issuer}</h3>
          <div className="flex flex-row items-center space-x-[0.25em] text-secant3 text-xs">
            <h3 id={`${id}-${ele.id}-start`}>{ele.structure.date.start}</h3>
            <span className="text-black">-</span>
            {ele.structure.date.present ? (
              <h3 id={`${id}-${ele.id}-Present`}>Present</h3>
            ) : (
              <h3 id={`${id}-${ele.id}-end`}>{ele.structure.date.end}</h3>
            )}
          </div>

          <Link
            className="text-sm"
            target="_blank"
            href={ele.structure.url}
            id={`${id}-${ele.id}-url`}
          >
            Certification URL
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Certification;
