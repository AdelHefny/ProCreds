import { Font } from "@react-pdf/renderer";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
function ContinueSteps() {
  const path = useRef(null);
  const { scrollYProgress } = useScroll({
    target: path,
    offset: ["8% 80%", "80% 8%"],
  });

  const c = useTransform(scrollYProgress, [0, 0.1], [0, 100]);
  const l1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 100]);
  const c1 = useTransform(scrollYProgress, [0.3, 0.4], [0, 100]);
  const l2 = useTransform(scrollYProgress, [0.4, 0.6], [0, 100]);
  const c2 = useTransform(scrollYProgress, [0.6, 0.7], [0, 100]);
  const l3 = useTransform(scrollYProgress, [0.7, 0.9], [0, 100]);
  const c3 = useTransform(scrollYProgress, [0.9, 1], [0, 100]);
  return (
    <div className="relative w-full h-[225vh]">
      <section className="sticky lg:left-1/2 top-[4.75rem] w-full lg:max-w-[50%] flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="flex flex-row items-center justify-center translate-x-2">
            <motion.div
              className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-8 h-8 translate-x-1 transition rounded-full flex items-center justify-center text-main text-lg font-bold"
              style={{
                background: useTransform(
                  c,
                  (value) =>
                    `linear-gradient(to right, #344E41 0% ${value}%, #A3B18A ${value}% 100%)`
                ),
                translate: "0.25rem",
                scale: useTransform(
                  c,
                  (value) => `${value == 100 ? "1.2" : "1"}`
                ),
                transition: "transform 350ms cubic-bezier(.47,1.64,.41,.8);",
              }}
            >
              <h1>1</h1>
            </motion.div>
            <motion.div
              className="lg:w-28 sm:w-24 w-20 lg:h-4 sm:h-3 h-2 bg-secant2"
              style={{
                background: useTransform(
                  l1,
                  (value) =>
                    `linear-gradient(to right, #344E41 0% ${value}%, #A3B18A ${value}% 100%)`
                ),
              }}
            ></motion.div>
            <motion.div
              className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-8 h-8 rounded-full -translate-x-1 flex items-center justify-center text-main text-lg font-bold"
              style={{
                background: useTransform(
                  c1,
                  (value) =>
                    `linear-gradient(to right, #344E41 0% ${value}%, #A3B18A ${value}% 100%)`
                ),
                translate: "-0.25rem",
                scale: useTransform(
                  c1,
                  (value) => `${value == 100 ? "1.2" : "1"}`
                ),
                transition: "transform 350ms cubic-bezier(.47,1.64,.41,.8);",
              }}
            >
              <h1>2</h1>
            </motion.div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <motion.div
              className="lg:w-28 sm:w-24 w-20 lg:h-4 sm:h-3 h-2 bg-secant2"
              style={{
                background: useTransform(
                  l2,
                  (value) =>
                    `linear-gradient(to right, #344E41 0% ${value}%, #A3B18A ${value}% 100%)`
                ),
              }}
            ></motion.div>
          </div>
          <div className="flex flex-row items-center justify-center -translate-x-2">
            <motion.div
              className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-8 h-8 rounded-full -translate-x-1 flex items-center justify-center text-main text-lg font-bold"
              style={{
                background: useTransform(
                  c2,
                  (value) =>
                    `linear-gradient(to right, #344E41 0% ${value}%, #A3B18A ${value}% 100%)`
                ),
                translate: "0.25rem",
                scale: useTransform(
                  c2,
                  (value) => `${value == 100 ? "1.2" : "1"}`
                ),
                transition: "transform 350ms cubic-bezier(.47,1.64,.41,.8);",
              }}
            >
              <h1>3</h1>
            </motion.div>
            <motion.div
              className="lg:w-28 sm:w-24 w-20 lg:h-4 sm:h-3 h-2 bg-secant2"
              style={{
                background: useTransform(
                  l3,
                  (value) =>
                    `linear-gradient(to right, #344E41 0% ${value}%, #A3B18A ${value}% 100%)`
                ),
              }}
            ></motion.div>
            <motion.div
              className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-8 h-8 rounded-full -translate-x-1 flex items-center justify-center text-main text-lg font-bold"
              style={{
                background: useTransform(
                  c3,
                  (value) =>
                    `linear-gradient(to right, #344E41 0% ${value}%, #A3B18A ${value}% 100%)`
                ),
                translate: "-0.25rem",
                scale: useTransform(
                  c3,
                  (value) => `${value == 100 ? "1.2" : "1"}`
                ),
                transition: "transform 350ms cubic-bezier(.47,1.64,.41,.8);",
              }}
            >
              <h1>4</h1>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="flex lg:w-1/2 w-full mt-20 lg:mt-0 flex-col items-center justify-center">
        <Reveal>
          <section className="px-10 lg:px-5 w-full text-xl h-[75vh] flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-xl flex items-center justify-center flex-row space-x-2">
              <span className="w-8 h-8 flex rounded-full bg-secant2 text-main items-center justify-center font-bold">
                1
              </span>
              <motion.span
                style={{
                  color: "#344e4133",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#344e41,#344e41)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: useTransform(c, (value) => `${value}% 100%`),
                }}
              >
                Start by choosing a Template
              </motion.span>
            </h1>
            <p className="mt-12 text-lg line leading-relaxed">
              <motion.span
                style={{
                  color: "#344e4166",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#344e41,#344e41)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: useTransform(l1, (value) => `${value}% 100%`),
                }}
              >
                Our professional resume templates are designed in strict
                accordance with industry standards and best practices, ensuring
                that your resume stands out from the competition, you can choose
                the suitble sections to add to you resume when you choose the
                template you customize the look of your resume to match your
                personal style and preferences.
              </motion.span>
            </p>
          </section>
        </Reveal>
        <Reveal>
          <section className="px-10 lg:px-5 w-full text-xl h-[75vh] flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-xl flex items-center justify-center flex-row space-x-2">
              <span className="w-8 h-8 flex rounded-full bg-secant2 text-main items-center justify-center font-bold">
                2
              </span>
              <motion.span
                style={{
                  color: "#344e4133",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#344e41,#344e41)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: useTransform(c1, (value) => `${value}% 100%`),
                }}
              >
                Edit the template as you want
              </motion.span>
            </h1>
            <p className="mt-12 text-lg line leading-relaxed">
              <motion.span
                style={{
                  color: "#344e4166",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#344e41,#344e41)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: useTransform(l2, (value) => `${value}% 100%`),
                }}
              >
                Feel free to edit the template as you wish to tailor it to your
                specific needs and preferences.
              </motion.span>
            </p>
          </section>
        </Reveal>
        <Reveal>
          <section className="px-10 lg:px-5 w-full text-xl h-[75vh] flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-xl flex items-center justify-center flex-row space-x-2">
              <span className="w-8 h-8 flex rounded-full bg-secant2 text-main items-center justify-center font-bold">
                3
              </span>
              <motion.span
                style={{
                  color: "#344e4133",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#344e41,#344e41)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: useTransform(c2, (value) => `${value}% 100%`),
                }}
              >
                Submit job applications with your resume.
              </motion.span>
            </h1>
            <p className="mt-12 text-lg line leading-relaxed">
              <motion.span
                style={{
                  color: "#344e4166",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#344e41,#344e41)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: useTransform(l3, (value) => `${value}% 100%`),
                }}
              >
                Utilize your completed resume to apply for various job
                opportunities and showcase your qualifications and experience to
                potential employers.
              </motion.span>
            </p>
          </section>
        </Reveal>
      </div>
      <svg
        className="absolute lg:left-1/2  top-0 -left-[9999px] mx-auto h-full"
        viewBox="0 0 36 8192"
        width="36"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={path}
      >
        <g clipPath="url(#clip0_1_1057)">
          <rect width="36" height="8192" fill="transparent" />
          <motion.path
            style={{ pathLength: scrollYProgress }}
            d="M18 0L18 8192"
            stroke="#344E41"
            strokeWidth="36"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1057">
            <rect width="36" height="8192" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default ContinueSteps;
