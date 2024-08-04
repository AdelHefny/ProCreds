import { StyleMapping, templateType } from "@/app/templateContext";
import "./normalTemplate.css";
import { Edit, EditLi } from "./editComponenets";

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
      <Edit
        id={`${id}-0`}
        headerType="h2"
        data={title}
        style={styleData[`${id}-0`]}
      />
      <hr id={`${id}-hr`} />
      <ul>
        {sectionData.map((ele, index) => (
          <EditLi
            className="overflow-hidden"
            key={`${id}-${ele.id}`}
            data={ele.text}
            style={styleData[`${id}-${ele.id}`]}
            id={`${id}-${ele.id}`}
          />
        ))}
      </ul>
    </section>
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
