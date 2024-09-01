import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Styles,
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

interface SectionData {
  id: string;
  title: string;
  details: { id: string; text: string }[];
}

interface TemplateData {
  content: {
    header: HeaderContent;
    sections: SectionData[];
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
    marginTop: 0,
  },
  h2: {
    fontSize: 20,
    color: "black",
  },
  h3: {
    fontSize: 18,
    color: "black",
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
});

function Section({
  id,
  sectionData,
  styleData,
}: {
  id: string;
  sectionData: { id: string; text: string }[];
  styleData: StyleMapping;
}) {
  return (
    <View>
      {sectionData.map((ele) => (
        <EditLi
          key={`${id}-${ele.id}`}
          data={ele.text}
          style={styleData[`${id}-${ele.id}`]}
          id={`${id}-${ele.id}`}
        />
      ))}
    </View>
  );
}

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

function Header({
  headerData,
  styleData,
}: {
  headerData: HeaderContent;
  styleData: StyleMapping;
}) {
  return (
    <View
      style={[styles.container, { alignItems: "center", marginBottom: 10 }]}
    >
      <View style={{ flexDirection: "row" }}>
        <Edit
          style={{ ...styleData["firstName"], ...styles.h1 } as Styles}
          id="firstName"
          data={headerData.firstName}
          headerType="h1"
        />
        <Edit
          style={
            {
              ...styles.h1,
              ...styleData["lastName"],
              ...{ marginLeft: 5 },
            } as Styles
          }
          id="lastName"
          data={headerData.lastName}
          headerType="h1"
        />
      </View>
      <Edit
        style={{ ...styles.h3, ...styleData["jobTitle"] } as Styles}
        id="jobTitle"
        data={headerData.jobTitle}
        headerType="h3"
      />
      <Edit
        style={{ ...styles.h3, ...styleData["email"] } as Styles}
        id="email"
        data={headerData.email}
        headerType="h3"
      />
      <Edit
        style={{ ...styles.h3, ...styleData["phone"] } as Styles}
        id="phone"
        data={headerData.Phone}
        headerType="h3"
      />
      <Edit
        style={{ ...styles.h3, ...styleData["city"] } as Styles}
        id="city"
        data={headerData.City}
        headerType="h3"
      />
      <View style={styles.hr} />
      <Edit
        style={styleData["description"]}
        id="description"
        data={headerData.description}
        headerType="p"
      />
    </View>
  );
}

function NormalTemplate({ templateData }: { templateData: TemplateData }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Header
          headerData={templateData.content.header}
          styleData={templateData.style}
        />
        {templateData.content.sections.map((ele) => (
          <View key={ele.id} style={styles.section}>
            <Text
              style={[styles.sectionTitle, templateData.style[`${ele.id}-0`]]}
            >
              {ele.title}
            </Text>
            <View style={styles.hr} />
            {ele.title === "Skills" ? (
              <SkillsSection
                id={ele.id}
                sectionData={ele.details}
                styleData={templateData.style}
              />
            ) : (
              <Section
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
    <Text id={id} style={style}>
      {data}
    </Text>
  );
}

export default NormalTemplate;
export { Edit, EditLi };
