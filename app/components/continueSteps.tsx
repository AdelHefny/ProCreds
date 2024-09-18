import { Font } from "@react-pdf/renderer";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
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
    <div className="relative w-full h-[400vh]">
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
      <section className="flex lg:w-1/2 w-full mt-20 lg:mt-0 flex-col items-center justify-center">
        <div className="px-10 lg:px-0 lg:w-1/2 w-full">
          <h1 className="font-extrabold text-xl flex items-center justify-center flex-row space-x-2">
            <span className="w-8 h-8 flex rounded-full bg-secant2 text-main items-center justify-center font-bold">
              1
            </span>
            <span>Start by choosing a Template</span>
          </h1>
          <p className="mt-4">
            Our professional resume templates are designed in strict accordance
            with industry standards and best practices.
          </p>
        </div>
      </section>
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
