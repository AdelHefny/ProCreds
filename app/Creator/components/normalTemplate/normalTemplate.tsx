"use client";
import { styleDatatype, templateType } from "@/app/templateContext";
import { SetStateAction, useContext } from "react";
import "./normalTemplate.css";
import { color } from "framer-motion";
function Header({
  headerData,
  styleData,
}: {
  headerData: { name: string; jobTitle: string; email: string };
  styleData: styleDatatype;
}) {
  return (
    <header className="flex items-center justify-center flex-col">
      <h1 className="text-lg fontbold" style={styleData.header.firstName}>
        {headerData.name}
      </h1>
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

function NormalTemplate({
  templateData,
  templateSetter,
}: {
  templateData: templateType;
  templateSetter: (arg: SetStateAction<templateType>) => void;
}) {
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
          styleData={templateData.style}
        />
        {templateData.content.sections.map((ele, index) => {
          return (
            <Section title={ele.title} sectionData={ele.details} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default NormalTemplate;
