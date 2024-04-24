import { templateType } from "../templateContext";
export const templates: templateType[] = [
  {
    id: 0,
    name: "normal",
    pages: [
      `
      <body>
      <style>
        .card {
          width: 256px;
          height: 384px;
          background-color: #fff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          color:black;
        }
        .container {
          padding: 5px;
        }
        .container h1,.container h2,.container h3 {
          color: #333;
        }
        .container h1 {
          margin-top: 0;
          font-size: 14px; /* Adjust font size */
        }
        .section {
          margin-bottom: 3px; /* Adjust spacing */
        }
        .section h2 {
          border-bottom: 1px solid #333;
          padding-bottom: 2px;
          margin-bottom: 2px; /* Adjust spacing */
          font-size: 10px; /* Adjust font size */
        }
        .section ul {
          list-style-type: none;
          padding: 0;
        }
        .section ul li {
          margin-bottom: 2px; /* Adjust spacing */
          font-size: 8px; /* Adjust font size */
        }
      </style>
        <div class="card">
          <div class="container">
            <header>
              <h1>John Doe</h1>
              <p>Software Developer</p>
            </header>
      
            <section class="section">
              <h2>Contact Information</h2>
              <ul>
                <li>Email: john@example.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Main St, Cityville, State, 12345</li>
              </ul>
            </section>
      
            <section class="section">
              <h2>Education</h2>
              <ul>
                <li>Bachelor of Science in Computer Science - University of City</li>
                <li>Graduated: May 2022</li>
              </ul>
            </section>
      
            <section class="section">
              <h2>Skills</h2>
              <ul>
                <li>JavaScript</li>
                <li>HTML5 & CSS3</li>
                <li>Python</li>
                <li>React</li>
                <li>Node.js</li>
                <li>SQL</li>
              </ul>
            </section>
      
            <section class="section">
              <h2>Experience</h2>
              <ul>
                <li>Software Developer - XYZ Company (2019-2022)</li>
                <li>Internship - ABC Tech (Summer 2018)</li>
              </ul>
            </section>
      
            <section class="section">
              <h2>Projects</h2>
              <ul>
                <li>E-commerce website using React and Node.js</li>
                <li>Mobile app development using React Native</li>
              </ul>
            </section>
          </div>
        </div>
      </body>
      </html>      
  `,
    ],
    undoStack: [],
    redoStack: [],
    saved: true,
  },
  {
    id: 1,
    name: "fancy",
    pages: [
      `
    <body>
      <div class="card">
        <div class="container">
          <header>
            <h1>John Doe</h1>
            <p>Software Developer</p>
          </header>
    
          <section class="section">
            <h2>Contact Information</h2>
            <ul>
              <li>Email: john@example.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Main St, Cityville, State, 12345</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Education</h2>
            <ul>
              <li>Bachelor of Science in Computer Science - University of City</li>
              <li>Graduated: May 2022</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Skills</h2>
            <ul>
              <li>JavaScript</li>
              <li>HTML5 & CSS3</li>
              <li>Python</li>
              <li>React</li>
              <li>Node.js</li>
              <li>SQL</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Experience</h2>
            <ul>
              <li>Software Developer - XYZ Company (2019-2022)</li>
              <li>Internship - ABC Tech (Summer 2018)</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Projects</h2>
            <ul>
              <li>E-commerce website using React and Node.js</li>
              <li>Mobile app development using React Native</li>
            </ul>
          </section>
        </div>
      </div>
    </body>
    </html>      
`,
    ],
    undoStack: [],
    redoStack: [],
    saved: true,
  },
  {
    id: 2,
    name: "custom",
    pages: [
      `
    <body>
      <div class="card">
        <div class="container">
          <header>
            <h1>John Doe</h1>
            <p>Software Developer</p>
          </header>
    
          <section class="section">
            <h2>Contact Information</h2>
            <ul>
              <li>Email: john@example.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Main St, Cityville, State, 12345</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Education</h2>
            <ul>
              <li>Bachelor of Science in Computer Science - University of City</li>
              <li>Graduated: May 2022</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Skills</h2>
            <ul>
              <li>JavaScript</li>
              <li>HTML5 & CSS3</li>
              <li>Python</li>
              <li>React</li>
              <li>Node.js</li>
              <li>SQL</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Experience</h2>
            <ul>
              <li>Software Developer - XYZ Company (2019-2022)</li>
              <li>Internship - ABC Tech (Summer 2018)</li>
            </ul>
          </section>
    
          <section class="section">
            <h2>Projects</h2>
            <ul>
              <li>E-commerce website using React and Node.js</li>
              <li>Mobile app development using React Native</li>
            </ul>
          </section>
        </div>
      </div>
    </body>
    </html>      
`,
    ],
    undoStack: [],
    redoStack: [],
    saved: true,
  },
];
