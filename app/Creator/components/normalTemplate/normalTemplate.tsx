"use client";
import { StyleMapping, templateType } from "@/app/templateContext";
import { CSSProperties, SetStateAction, useContext } from "react";
import "./normalTemplate.css";
import { color } from "framer-motion";
function Header({
  headerData,
  styleData,
}: {
  headerData: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    city: string;
    description: string;
  };
  styleData: StyleMapping;
}) {
  return (
    <>
      <header className="flex items-center justify-center flex-col">
        <h1
          className="text-lg fontbold"
          style={styleData["header-name"]}
          id="header-name"
        >
          {headerData.name}
        </h1>
        <h3 style={styleData["header-jobTitle"]} id="header-jobTitle">
          {headerData.jobTitle}
        </h3>
        <h3 style={styleData["header-email"]} id="header-email">
          {headerData.email}
        </h3>
        <h3 style={styleData["header-phone"]} id="header-phone">
          {headerData.phone}
        </h3>
        <h3 style={styleData["header-city"]} id="header-city">
          {headerData.city}
        </h3>
        <hr id="header-hr" />
      </header>
      <section>
        <p style={styleData["header-description"]} id="header-description">
          {headerData.description}
        </p>
      </section>
    </>
  );
}

function Section({
  id,
  title,
  sectionData,
  styleData,
}: {
  id: string;
  title: string;
  sectionData: { id: string; text: string }[];
  styleData: StyleMapping;
}) {
  return (
    <section className={`${title}Section section`}>
      <h2 style={styleData[`${id}-0`]} id={`${id}-0`}>
        {title}
      </h2>
      <hr id={`${id}-hr`} />
      <ul>
        {sectionData.map((ele, index) => (
          <li
            key={index}
            style={styleData[`${id}-${ele.id}`]}
            id={`${id}-${ele.id}`}
          >
            {ele.text}
          </li>
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
    <div className="card max-w-96 min-w-96 min-h-96">
      <div className="container">
        <Header
          headerData={{
            name:
              templateData.content.header.firstName +
              " " +
              templateData.content.header.lastName,
            email: templateData.content.header.email,
            jobTitle: templateData.content.header.jobTitle,
            phone: templateData.content.header.Phone,
            city: templateData.content.header.City,
            description: templateData.content.header.description,
          }}
          styleData={templateData.style}
        />
        {templateData.content.sections.map((ele) => {
          return (
            <Section
              title={ele.title}
              id={ele.id}
              sectionData={ele.details}
              styleData={templateData.style}
              key={ele.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NormalTemplate;
