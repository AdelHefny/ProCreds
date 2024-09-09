import { StyleMapping } from "@/app/templateContext";

function Projects({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: {
    id: string;
    text: string;
    structure?: {
      name: string;
      description: string;
      date: { start: string; end: string; ongoing: boolean };
      accomplishments: string;
    };
  }[];
  styleData: StyleMapping;
}) {
  return (
    <section className="my-[0.25em]">
      <ul className="flex flex-col">
        {sectionData.map((project) => (
          <li
            key={`${id}-${project.id}`}
            className="overflow-hidden px-[0.5em] py-[0.5em] rounded-lg"
            style={styleData[`${id}-${project.id}`]}
            id={`${id}-${project.id}`}
          >
            <h2
              id={`${id}-${project.id}-name`}
              className="text-lg font-semibold"
            >
              {project.structure.name}
            </h2>
            <div className="text-sm text-secant3">
              {project.structure.date.start}{" "}
              {project.structure.date.ongoing
                ? "- Present"
                : `- ${project.structure.date.end}`}
            </div>
            <p id={`${id}-${project.id}-description`}>
              {project.structure.description}
            </p>
            <p className="text-sm" id={`${id}-${project.id}-accomplishments`}>
              {project.structure.accomplishments}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;
