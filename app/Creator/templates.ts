import { templateType } from "../templateContext";
export const templates: templateType[] = [
  {
    templateId: 0,
    name: "normal",
    content: {
      header: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        City: "Cityville",
        Phone: "(123) 456-7890",
        description: "work",
        jobTitle: "Software Developer",
      },
      sections: [
        {
          title: "Contact",
          details: ["john@example.com", "Cityville", "(123) 456-7890"],
        },
        {
          title: "Education",
          details: [
            "Bachelor of Science in Computer Science - University of City",
            "Graduated: May 2022",
          ],
        },
        {
          title: "Skills",
          details: [
            "JavaScript",
            "HTML5 & CSS3",
            "Python",
            "React",
            "Node.js",
            "SQL",
          ],
        },
        {
          title: "Experience",
          details: [
            "Software Developer - XYZ Company (2019-2022)",
            "Internship - ABC Tech (Summer 2018)",
          ],
        },
        {
          title: "Projects",
          details: [
            "E-commerce website using React and Node.js",
            "Mobile app development using React Native",
          ],
        },
      ],
    },
    style: {
      header: {
        jobTitle: {},
        firstName: {},
        lastName: {},
        email: {},
        Phone: {},
        City: {},
        description: {},
      },
      sections: [],
    },
    undoStack: [],
    redoStack: [],
    saved: false,
  },
  {
    templateId: 0,
    name: "fancy",
    content: {
      header: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        City: "Cityville",
        Phone: "(123) 456-7890",
        description: "work",
        jobTitle: "Software Developer",
      },
      sections: [
        {
          title: "Contact",
          details: ["john@example.com", "Cityville", "(123) 456-7890"],
        },
        {
          title: "Education",
          details: [
            "Bachelor of Science in Computer Science - University of City",
            "Graduated: May 2022",
          ],
        },
        {
          title: "Skills",
          details: [
            "JavaScript",
            "HTML5 & CSS3",
            "Python",
            "React",
            "Node.js",
            "SQL",
          ],
        },
        {
          title: "Experience",
          details: [
            "Software Developer - XYZ Company (2019-2022)",
            "Internship - ABC Tech (Summer 2018)",
          ],
        },
        {
          title: "Projects",
          details: [
            "E-commerce website using React and Node.js",
            "Mobile app development using React Native",
          ],
        },
      ],
    },
    style: {
      header: {
        jobTitle: {},
        firstName: {},
        lastName: {},
        email: {},
        Phone: {},
        City: {},
        description: {},
      },
      sections: [],
    },
    undoStack: [],
    redoStack: [],
    saved: false,
  },
  {
    templateId: 0,
    name: "Blank",
    content: {
      header: {
        firstName: "",
        lastName: "",
        email: "",
        City: "",
        Phone: "",
        description: "",
        jobTitle: "",
      },
      sections: [],
    },
    style: {
      header: {
        jobTitle: {},
        firstName: {},
        lastName: {},
        email: {},
        Phone: {},
        City: {},
        description: {},
      },
      sections: [],
    },
    undoStack: [],
    redoStack: [],
    saved: false,
  },
];
