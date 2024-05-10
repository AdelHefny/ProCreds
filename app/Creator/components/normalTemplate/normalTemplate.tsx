import { templateType } from "@/app/templateContext";
import { useContext } from "react";
import "./normalTemplate.css";
function Header({
  headerData,
}: {
  headerData: { name: string; jobTitle: string; email: string };
}) {
  return (
    <header className="flex items-center justify-center flex-col">
      <h1 className="text-lg fontbold">{headerData.name}</h1>
      <h3>{headerData.email}</h3>
      <p>{headerData.jobTitle}</p>
    </header>
  );
}

function Section({
  title,
  sectionData,
}: {
  title: string;
  sectionData: string[];
}) {
  return (
    <section className={`${title}Section section`}>
      <h2>{title}</h2>
      <hr />
      <ul>
        {sectionData.map((ele) => (
          <li>{ele}</li>
        ))}
      </ul>
    </section>
  );
}

function NormalTemplate({ templateData }: { templateData: templateType }) {
  return (
    <div className="card min-w-96 min-h-96">
      <div className="container">
        <Header
          headerData={{
            name:
              templateData.content.header.firstName +
              " " +
              templateData.content.header.lastName,
            email: templateData.content.header.email,
            jobTitle: templateData.content.header.jobTitle,
          }}
        />

        {templateData.content.sections.map((ele) => (
          <Section title={ele.title} sectionData={ele.details} />
        ))}
      </div>
    </div>
  );
}

export default NormalTemplate;
