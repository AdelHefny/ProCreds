import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

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
  const l3 = useTransform(scrollYProgress, [0.7, 1], [0, 100]);
  const currentVideo = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.8, 1],
    [0, 1, 3, 5, 6]
  );
  const [videoIndex, setVideoIndex] = useState(0);

  // Update videoIndex whenever the MotionValue updates
  useMotionValueEvent(currentVideo, "change", (latest) => {
    console.log(latest);
    setVideoIndex(Math.round(latest));
  });
  return (
    <div className="flex flex-row justify-between relative w-full h-[350vh] bg-secant2 text-secant2 ">
      <div className="flex lg:w-1/2 w-full mt-20 lg:mt-0 flex-col items-center justify-center space-y-[10%]">
        <Reveal>
          <section className="px-10 lg:px-5 w-full text-xl h-[75vh] flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-xl flex items-center justify-center flex-row space-x-6">
              <motion.div
                className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-8 h-8 translate-x-1 transition rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: useTransform(
                    l1,
                    (value) =>
                      `linear-gradient(to right, #A3B18A 0% ${value}%, #dad7cd ${value}% 100%)`
                  ),
                  translate: "0.25rem",
                  scale: useTransform(
                    l1,
                    (value) => `${value == 100 ? "1.2" : "1"}`
                  ),
                  transition: "transform 350ms cubic-bezier(.47,1.64,.41,.8);",
                }}
              >
                <h1>1</h1>
              </motion.div>
              <motion.span
                style={{
                  color: "#dad7cd33",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#dad7cd,#dad7cd)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: useTransform(c, (value) => `${value}% 100%`),
                }}
              >
                Start by choosing a Template
              </motion.span>
            </h1>
            <p className="mt-12 px-5 line leading-relaxed">
              <motion.span
                style={{
                  color: "#dad7cd66",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#dad7cd,#dad7cd)`,
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
            <h1 className="font-extrabold text-xl flex items-center justify-center flex-row space-x-6">
              <motion.div
                className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-8 h-8 rounded-full -translate-x-1 flex items-center justify-center text-lg font-bold"
                style={{
                  background: useTransform(
                    l2,
                    (value) =>
                      `linear-gradient(to right, #A3B18A 0% ${value}%, #DAD7CD ${value}% 100%)`
                  ),
                  translate: "-0.25rem",
                  scale: useTransform(
                    l2,
                    (value) => `${value == 100 ? "1.2" : "1"}`
                  ),
                  transition: "transform 350ms cubic-bezier(.47,1.64,.41,.8);",
                }}
              >
                <h1>2</h1>
              </motion.div>
              <motion.span
                style={{
                  color: "#dad7cd33",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#dad7cd,#dad7cd)`,
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
                  color: "#dad7cd66",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#dad7cd,#dad7cd)`,
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
            <h1 className="font-extrabold text-xl flex items-center justify-center flex-row space-x-6">
              <motion.div
                className="lg:w-16 lg:h-16 sm:w-12 sm:h-12 w-8 h-8 rounded-full -translate-x-1 flex items-center justify-center text-lg font-bold"
                style={{
                  background: useTransform(
                    l3,
                    (value) =>
                      `linear-gradient(to right, #A3B18A 0% ${value}%, #DAD7CD ${value}% 100%)`
                  ),
                  translate: "0.25rem",
                  scale: useTransform(
                    l3,
                    (value) => `${value == 100 ? "1.2" : "1"}`
                  ),
                  transition: "transform 350ms cubic-bezier(.47,1.64,.41,.8);",
                }}
              >
                <h1>3</h1>
              </motion.div>
              <motion.span
                style={{
                  color: "#dad7cd33",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#dad7cd,#dad7cd)`,
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
                  color: "#dad7cd66",
                  backgroundClip: "text",
                  backgroundImage: `linear-gradient(to right,#dad7cd,#dad7cd)`,
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
            stroke="#dad7cd"
            strokeWidth="36"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1057">
            <rect width="36" height="8192" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <section className="sticky hidden text-main lg:flex lg:left-1/2 top-36 w-full lg:max-w-[50%] h-fit flex-col items-center justify-center">
        <motion.div
          className={`${
            videoIndex != 1
              ? "translate-x-[100px] opacity-0"
              : "opacity-1 -translate-x-1/2"
          }  w-[35rem] aspect-[16/9] transition-all duration-300 absolute top-0 left-1/2`}
        >
          <ReactPlayer
            url={
              "https://www.youtube.com/embed/i4re8JafXco?si=RDNIrbTM4RtJaPzH"
            }
            width="100%"
            height="100%"
            muted={true}
            loop={true}
            playing={videoIndex == 1}
            controls={false}
          />
        </motion.div>
        <motion.div
          className={`${
            videoIndex != 3
              ? "translate-x-[100px] opacity-0"
              : "opacity-1 -translate-x-1/2"
          }  w-[35rem] aspect-[16/9] transition-all duration-300 absolute top-0 left-1/2 `}
        >
          <ReactPlayer
            url={
              "https://www.youtube.com/embed/i4re8JafXco?si=RDNIrbTM4RtJaPzH"
            }
            width="100%"
            height="100%"
            muted={true}
            loop={true}
            playing={videoIndex == 3}
            controls={false}
          />
        </motion.div>
        <motion.div
          className={`${
            videoIndex != 5
              ? "translate-x-[100px] opacity-0"
              : "-translate-x-1/2 opacity-1"
          }  w-[35rem] aspect-[16/9] transition-all duration-300 absolute top-0 left-1/2`}
        >
          <ReactPlayer
            url={
              "https://www.youtube.com/embed/i4re8JafXco?si=RDNIrbTM4RtJaPzH"
            }
            width="100%"
            height="100%"
            muted={true}
            loop={true}
            playing={videoIndex == 5}
            controls={false}
          />
        </motion.div>
      </section>
    </div>
  );
}

export default ContinueSteps;
