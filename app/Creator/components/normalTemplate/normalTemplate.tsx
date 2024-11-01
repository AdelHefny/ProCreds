import { StyleMapping, templateType } from "@/app/providors/templateContext";
import "./normalTemplate.css";
import { Edit, EditLi } from "./components/editComponenets";
import SkillsSection from "./components/skills";
import Experience from "./components/experience";
import Certification from "./components/Certification";
import Education from "./components/Education";
import Image from "next/image";
import Projects from "./components/projects";

function Header({
  headerData,
  styleData,
}: {
  headerData: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    city: string;
    description: string;
  };
  styleData: StyleMapping;
}) {
  return (
    <header className="header w-full flex items-center justify-start flex-col overflow-hidden">
      <div className="flex flex-row justify-center space-x-[0.25em] max-w-full text-left">
        <Edit
          className="text-lg fontbold break-words text-start max-w-1/2 "
          style={styleData["firstName"]}
          id="firstName"
          headerType="h1"
          data={headerData.firstName}
        />
        <Edit
          className="text-lg fontbold max-w-1/2"
          style={styleData["lastName"]}
          data={headerData.lastName}
          headerType="h1"
          id="lastName"
        />
      </div>
      <Edit
        style={styleData["jobTitle"]}
        id="jobTitle"
        data={headerData.jobTitle}
        headerType="h3"
        className={"text-md fontbold"}
      />
      <Edit
        style={styleData["email"]}
        id="email"
        data={headerData.email}
        headerType="h3"
        className={"text-md fontbold"}
      />
      <Edit
        style={styleData["phone"]}
        data={headerData.phone}
        id="phone"
        headerType="h3"
        className={"text-md fontbold"}
      />
      <Edit
        style={styleData["city"]}
        id="city"
        data={headerData.city}
        headerType="h3"
        className={"text-md fontbold"}
      />
      <hr id="header-hr" />
    </header>
  );
}

function NormalTemplate({ templateData }: { templateData: templateType }) {
  return (
    <div className="card templateDocument h-full w-full select-none">
      <div className="container">
        <div className="flex flex-row justify-start space-x-[1.25em] items-start h-full">
          {templateData.content.photo.enabled && (
            <Image
              src={(templateData.content.photo.data as string) || ""}
              alt="Photo"
              width={150}
              className="rounded-full min-w-[150px] max-h-[150px] object-cover"
              height={100}
            />
          )}
          <Header
            headerData={{
              firstName: templateData.content.header.firstName,
              lastName: templateData.content.header.lastName,
              email: templateData.content.header.email,
              jobTitle: templateData.content.header.jobTitle,
              phone: templateData.content.header.Phone,
              city: templateData.content.header.City,
              description: templateData.content.header.description,
            }}
            styleData={templateData.style}
          />
        </div>
        <section className="max-w-full">
          <Edit
            data={templateData.content.header.description}
            className="break-words"
            id="description"
            style={templateData.style["description"]}
            headerType="p"
          />
        </section>
        {templateData.content.sections.map((ele) => {
          return (
            <section key={ele.id} className={`${ele.title}Section section`}>
              <h1
                id={`${ele.id}-0`}
                className="text-secant3 font-extrabold text-lg font-sans"
                style={templateData.style[`${ele.id}-0`]}
              >
                {ele.title}
              </h1>
              <hr
                id={`${ele.id}-hr`}
                className="block h-px w-[4em] border-0 border-t border-secant3 p-0"
              />
              {ele.title == "Skills" && (
                <SkillsSection
                  id={ele.id}
                  sectionData={ele.details}
                  styleData={templateData.style}
                  key={ele.id}
                />
              )}
              {ele.title == "Experience" && (
                <Experience
                  id={ele.id}
                  sectionData={ele.details}
                  styleData={templateData.style}
                  key={ele.id}
                />
              )}
              {ele.title == "Certification" && (
                <Certification
                  id={ele.id}
                  sectionData={ele.details}
                  styleData={templateData.style}
                  key={ele.id}
                />
              )}
              {ele.title == "Education" && (
                <Education
                  id={ele.id}
                  sectionData={ele.details}
                  styleData={templateData.style}
                  key={ele.id}
                />
              )}
              {ele.title == "Projects" && (
                <Projects
                  id={ele.id}
                  sectionData={ele.details}
                  styleData={templateData.style}
                  key={ele.id}
                />
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default NormalTemplate;
