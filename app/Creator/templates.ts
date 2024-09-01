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
              text: "Bachelor of Science in Computer Science - University of City",
            },
            { id: "1-2", text: "Graduated: May 2022" },
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
            { id: "4-1", text: "E-commerce website using React and Node.js" },
            { id: "4-2", text: "Mobile app development using React Native" },
          ],
        },
      ],
    },
    style: {},
    saved: false,
  },
  {
    templateId: 1,
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
              text: "Bachelor of Science in Computer Science - University of City",
            },
            { id: "1-2", text: "Graduated: May 2022" },
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
            { id: "4-1", text: "E-commerce website using React and Node.js" },
            { id: "4-2", text: "Mobile app development using React Native" },
          ],
        },
      ],
    },
    style: {},
    saved: false,
  },
  {
    templateId: 2,
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
    style: {},
    saved: false,
  },
];
