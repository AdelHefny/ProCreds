import { StyleMapping, templateType } from "@/app/templateContext";
import "./normalTemplate.css";
import { Edit, EditLi } from "./editComponenets";
import Section from "./components/section";
import SkillsSection from "./components/skills";

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
    <>
      <header className="header flex items-center justify-center flex-col overflow-hidden">
        <div className="flex flex-row justify-center space-x-1">
          <Edit
            className="text-lg fontbold"
            style={styleData["firstName"]}
            id="firstName"
            headerType="h1"
            data={headerData.firstName}
          />
          <Edit
            className="text-lg fontbold"
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
      <section>
        <Edit
          data={headerData.description}
          className="break-words"
          id="description"
          style={styleData["description"]}
          headerType="p"
        />
      </section>
    </>
  );
}

function NormalTemplate({ templateData }: { templateData: templateType }) {
  return (
    <div className="card">
      <div className="container">
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
        {templateData.content.sections.map((ele) => {
          return (
            <section className={`${ele.title}Section section`}>
              <h1
                id={`${ele.id}-0`}
                className="text-secant3 font-extrabold text-lg font-sans"
                style={templateData.style[`${ele.id}-0`]}
              >
                {ele.title}
              </h1>
              <hr
                id={`${ele.id}-hr`}
                className="block h-px w-16 border-0 border-t border-secant3 p-0"
              />
              {ele.title == "Skills" && (
                <SkillsSection
                  id={ele.id}
                  sectionData={ele.details}
                  styleData={templateData.style}
                  key={ele.id}
                />
              )}
              {ele.title == "Custom" && (
                <Section
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
