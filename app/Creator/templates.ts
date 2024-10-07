import { templateType } from "../templateContext";
export const templates: templateType[] = [
  {
    templateId: 0,
    templateType: "normal",
    dateCreated: "",
    name: "template1",
    content: {
      photo: { enabled: false, alt: "", data: "", id: "" },
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
          id: "0",
          title: "Contact",
          details: [
            { id: "0-1", text: "john@example.com" },
            { id: "0-2", text: "Cityville" },
            { id: "0-3", text: "(123) 456-7890" },
          ],
        },
        {
          id: "1",
          title: "Education",
          details: [
            {
              id: "1-1",
              text: "",
              structure: {
                institution: "University of City",
                degree: "Bachelor of Science in Computer Science",
                date: { start: "10/2021", end: "10/2025", present: false },
                location: "City",
              },
            },
            {
              id: "1-2",
              text: "",
              structure: {
                institution: "University of City",
                degree: "Bachelor",
                date: { start: "", end: "5/2022", present: false },
                location: "City",
              },
            },
          ],
        },
        {
          title: "Skills",
          id: "2",
          details: [
            {
              id: "2-1",
              text: "JavaScript",
            },
            {
              id: "2-2",
              text: "HTML5 & CSS3",
            },
            {
              id: "2-3",
              text: "Python",
            },
            {
              id: "2-4",
              text: "React",
            },
            {
              id: "2-5",
              text: "Node.js",
            },
            {
              id: "2-6",
              text: "SQL",
            },
          ],
        },
        {
          id: "3",
          title: "Experience",
          details: [
            {
              id: "3-1",
              text: "Software Developer - XYZ Company (2019-2022)",
              structure: {
                postion: "Software Developer",
                company: "XYZ",
                date: { start: "2019", end: "2022", present: false },
                location: "cairo",
                accomplishment: "",
              },
            },
            {
              id: "3-2",
              text: "Internship - ABC Tech (Summer 2018)",
              structure: {
                postion: "Internship",
                company: "ABC Tech",
                date: { start: "2018", end: "2018", present: false },
                location: "cairo",
                accomplishment: "",
              },
            },
          ],
        },
        {
          id: "4",
          title: "Projects",
          details: [
            {
              id: "4-1",
              text: "E-commerce website using React and Node.js",
              structure: {
                name: "E-commerce website",
                description:
                  "A full-stack e-commerce website built using React and Node.js.",
                date: { start: "2023-01", end: "2023-06", ongoing: false },
                accomplishments:
                  "Implemented user authentication, payment gateway, and responsive design.",
              },
            },
            {
              id: "4-2",
              text: "Mobile app development using React Native",
              structure: {
                name: "Mobile app development",
                description:
                  "A cross-platform mobile app developed using React Native.",
                date: { start: "2023-07", end: "", ongoing: true },
                accomplishments:
                  "Developed the app's core features, integrated with various APIs, and ensured high performance.",
              },
            },
          ],
        },
      ],
    },
    style: {},
    saved: false,
  },
  {
    templateId: 1,
    dateCreated: "",
    templateType: "fancy",
    name: "template2",
    content: {
      photo: { enabled: false, alt: "", data: "", id: "" },
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
          id: "0",
          title: "Contact",
          details: [
            { id: "0-1", text: "john@example.com" },
            { id: "0-2", text: "Cityville" },
            { id: "0-3", text: "(123) 456-7890" },
          ],
        },
        {
          id: "1",
          title: "Education",
          details: [
            {
              id: "1-1",
              text: "",
              structure: {
                institution: "University of City",
                degree: "Bachelor of Science in Computer Science",
                date: { start: "10/2021", end: "10/2025", present: false },
                location: "City",
              },
            },
            {
              id: "1-2",
              text: "",
              structure: {
                institution: "University of City",
                degree: "Bachelor",
                date: { start: "", end: "5/2022", present: false },
                location: "City",
              },
            },
          ],
        },
        {
          title: "Skills",
          id: "2",
          details: [
            {
              id: "2-1",
              text: "JavaScript",
            },
            {
              id: "2-2",
              text: "HTML5 & CSS3",
            },
            {
              id: "2-3",
              text: "Python",
            },
            {
              id: "2-4",
              text: "React",
            },
            {
              id: "2-5",
              text: "Node.js",
            },
            {
              id: "2-6",
              text: "SQL",
            },
          ],
        },
        {
          id: "3",
          title: "Experience",
          details: [
            {
              id: "3-1",
              text: "Software Developer - XYZ Company (2019-2022)",
              structure: {
                postion: "Software Developer",
                company: "XYZ",
                date: { start: "2019", end: "2022", present: false },
                location: "cairo",
                accomplishment: "",
              },
            },
            {
              id: "3-2",
              text: "Internship - ABC Tech (Summer 2018)",
              structure: {
                postion: "Internship",
                company: "ABC Tech",
                date: { start: "2018", end: "2018", present: false },
                location: "cairo",
                accomplishment: "",
              },
            },
          ],
        },
        {
          id: "4",
          title: "Projects",
          details: [
            {
              id: "4-1",
              text: "E-commerce website using React and Node.js",
              structure: {
                name: "E-commerce website",
                description:
                  "A full-stack e-commerce website built using React and Node.js.",
                date: { start: "2023-01", end: "2023-06", ongoing: false },
                accomplishments:
                  "Implemented user authentication, payment gateway, and responsive design.",
              },
            },
            {
              id: "4-2",
              text: "Mobile app development using React Native",
              structure: {
                name: "Mobile app development",
                description:
                  "A cross-platform mobile app developed using React Native.",
                date: { start: "2023-07", end: "", ongoing: true },
                accomplishments:
                  "Developed the app's core features, integrated with various APIs, and ensured high performance.",
              },
            },
          ],
        },
      ],
    },
    style: {},
    saved: false,
  },
  {
    templateId: 2,
    dateCreated: "",
    templateType: "Blank",
    name: "",
    content: {
      photo: { enabled: false, alt: "", data: "", id: "" },
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
    style: {},
    saved: false,
  },
];
