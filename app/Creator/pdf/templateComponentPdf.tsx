import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Styles,
  Image,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Arial",
  src: "/ARIAL.TTF",
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [],
});
interface StyleMapping {
  [key: string]: Styles;
}

interface HeaderContent {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  Phone: string;
  City: string;
  description: string;
}
interface ImageData {
  id: string;
  data: string | ArrayBuffer; // base64 encoded image or URL
  alt: string;
  enabled: boolean;
}

interface SectionData {
  id: string;
  title: string;
  details: { id: string; text: string }[];
}

interface TemplateData {
  content: {
    header: HeaderContent;
    sections: SectionData[];
    photo: ImageData;
  };
  style: StyleMapping;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    color: "#3a5a40",
    maxWidth: 800,
    margin: "50px auto",
    padding: 20,
  },
  h1: {
    fontSize: 24,
    color: "black",
    maxLines: 1,
    marginTop: 0,
  },
  h2: {
    fontSize: 20,
    maxLines: 1,
    color: "black",
  },
  h3: {
    fontSize: 18,
    color: "black",
    maxLines: 1,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#3a5a40",
    fontSize: 16,
    fontWeight: "extrabold",
  },
  hr: {
    height: 1,
    width: 48,
    backgroundColor: "#3a5a40",
    marginVertical: 5,
  },
  sectionUl: {
    listStyleType: "none",
    padding: 0,
  },
  headerH1: {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  headerH3: {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  parentInputBefore: {
    transform: "scaleX(0)",
    opacity: 0,
  },
  parentInputFocusedBefore: {
    transform: "scaleX(1)",
    opacity: 1,
    backgroundColor: "",
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  institution: {
    fontSize: 14,
  },
  EduContainer: {
    flexDirection: "column",
    marginVertical: 8,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
    fontSize: 12,
    color: "#3a5a40",
  },
  dateText: {
    marginHorizontal: 4,
  },
  description: {
    fontSize: 12,
    marginBottom: 96,
  },
});

function SkillsSection({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: { id: string; text: string }[];
  styleData: StyleMapping;
}) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {sectionData.map((ele) => (
        <Text
          key={`${id}-${ele.id}`}
          id={`${id}-${ele.id}`}
          style={{
            ...{
              marginLeft: 8,
              marginVertical: 8,
              overflow: "hidden",
              paddingHorizontal: 8,
              paddingVertical: 2,
              backgroundColor: "#3a5a40",
              color: "#FFFFFF",
              borderRadius: 8,
            },
            ...styleData[`${id}-${ele.id}`],
          }}
        >
          {ele.text}
        </Text>
      ))}
    </View>
  );
}
function EducationSection({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: {
    id: string;
    text: string;
    structure?: {
      degree: string;
      institution: string;
      date: { start: string; end: string; present: boolean };
      location: string;
      description: string;
    };
  }[];
  styleData: StyleMapping;
}) {
  return (
    <View style={styles.EduContainer}>
      {sectionData.map((ele) => (
        <View
          key={`${id}-${ele.id}`}
          id={`${id}-${ele.id}`}
          style={{
            ...styles.item,
            ...styleData[`${id}-${ele.id}`],
          }}
        >
          <Text style={styles.title}>{ele.structure?.degree}</Text>
          <Text style={styles.institution}>{ele.structure?.institution}</Text>
          <View style={styles.dateContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>{ele.structure?.date.start}</Text>
              <Text style={styles.dateText}>-</Text>
              {ele.structure?.date.present ? (
                <Text>Present</Text>
              ) : (
                <Text>{ele.structure?.date.end}</Text>
              )}
            </View>
            {ele.structure?.location && <Text>{ele.structure.location}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}
function ExperienceSection({
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
    <View style={{ flexDirection: "column", marginVertical: 8 }}>
      {sectionData.map((ele) => (
        <View
          key={`${id}-${ele.id}`}
          id={`${id}-${ele.id}`}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            overflow: "hidden",
            ...styleData[`${id}-${ele.id}`],
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {ele.structure?.postion}
          </Text>
          <Text style={{ fontSize: 14 }}>{ele.structure?.company}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 2,
              fontSize: 12,
              color: "#3a5a40",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>{ele.structure?.date.start}</Text>
              <Text style={{ marginHorizontal: 4 }}>-</Text>
              {ele.structure?.date.present ? (
                <Text>Present</Text>
              ) : (
                <Text>{ele.structure?.date.end}</Text>
              )}
            </View>
            {ele.structure?.location && <Text>{ele.structure.location}</Text>}
          </View>
          <Text style={{ fontSize: 12 }}>{ele.structure?.accomplishments}</Text>
        </View>
      ))}
    </View>
  );
}
function CertificationSection({
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
    <View style={{ flexDirection: "column", marginVertical: 8 }}>
      {sectionData.map((ele) => (
        <View
          key={`${id}-${ele.id}`}
          id={`${id}-${ele.id}`}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            overflow: "hidden",
            ...styleData[`${id}-${ele.id}`],
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {ele.structure?.title}
          </Text>
          <Text style={{ fontSize: 14 }}>{ele.structure?.issuer}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2,
              fontSize: 12,
              color: "#3a5a40", // secant3 color
            }}
          >
            <Text>{ele.structure?.date.start}</Text>
            <Text style={{ marginHorizontal: 4 }}>-</Text>
            {ele.structure?.date.present ? (
              <Text>Present</Text>
            ) : (
              <Text>{ele.structure?.date.end}</Text>
            )}
          </View>
          <Link
            href={ele.structure.url}
            style={{ fontSize: 12, color: "#3a5a40" }}
          >
            Certification URL
          </Link>
        </View>
      ))}
    </View>
  );
}
function Header({
  headerData,
  styleData,
}: {
  headerData: HeaderContent;
  styleData: StyleMapping;
}) {
  return (
    <View
      style={{
        ...styles.container,
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        marginLeft: 20,
        width: "100%",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text
          style={{
            ...styles.h1,
            ...styleData["firstName"],
            ...{ maxWidth: "50%", textAlign: "left" },
          }}
        >
          {headerData.firstName}
        </Text>
        <Text
          style={{
            ...styles.h1,
            ...styleData["lastName"],
            ...{ maxWidth: "50%", textAlign: "left" },
            marginLeft: 5,
          }}
        >
          {headerData.lastName}
        </Text>
      </View>
      <Text
        style={{ ...styles.h3, ...styleData["jobTitle"], textAlign: "center" }}
      >
        {headerData.jobTitle}
      </Text>
      <Text
        style={{ ...styles.h3, ...styleData["email"], textAlign: "center" }}
      >
        {headerData.email}
      </Text>
      <Text
        style={{ ...styles.h3, ...styleData["phone"], textAlign: "center" }}
      >
        {headerData.Phone}
      </Text>
      <Text style={{ ...styles.h3, ...styleData["city"], textAlign: "center" }}>
        {headerData.City}
      </Text>
    </View>
  );
}

function NormalTemplate({ templateData }: { templateData: TemplateData }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {templateData.content.photo.enabled && (
            <Image
              src={templateData.content.photo.data as string}
              style={{
                width: 150,
                height: 150,
                borderRadius: 9999,
                minWidth: 150,
                minHeight: 150,
                objectFit: "cover",
              }}
            />
          )}
          <View style={{ marginLeft: 20 }}>
            {" "}
            {/* Adjust the margin as needed */}
            <Header
              headerData={templateData.content.header}
              styleData={templateData.style}
            />
          </View>
        </View>
        <Text style={templateData.style["description"]}>
          {templateData.content.header.description}
        </Text>
        {templateData.content.sections.map((ele) => (
          <View key={ele.id} style={styles.section}>
            <Text
              style={[styles.sectionTitle, templateData.style[`${ele.id}-0`]]}
            >
              {ele.title}
            </Text>
            <View style={styles.hr} />
            {ele.title === "Skills" && (
              <SkillsSection
                id={ele.id}
                sectionData={ele.details}
                styleData={templateData.style}
              />
            )}
            {ele.title === "Experience" && (
              <ExperienceSection
                id={ele.id}
                sectionData={ele.details}
                styleData={templateData.style}
              />
            )}
            {ele.title === "Certification" && (
              <CertificationSection
                id={ele.id}
                sectionData={ele.details}
                styleData={templateData.style}
              />
            )}
            {ele.title === "Education" && (
              <EducationSection
                id={ele.id}
                sectionData={ele.details}
                styleData={templateData.style}
              />
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}

function Edit({
  id,
  data,
  headerType,
  style,
}: {
  id: string;
  data: string;
  headerType: string;
  style: Styles;
}) {
  return (
    <Text id={id} style={style}>
      {data}
    </Text>
  );
}

function EditLi({
  id,
  data,
  style,
}: {
  id: string;
  data: string;
  style: Styles;
}) {
  return (
    <Text id={id} style={{ ...style, ...{ textAlign: "center" } }}>
      {data}
    </Text>
  );
}

export default NormalTemplate;
export { Edit, EditLi };
