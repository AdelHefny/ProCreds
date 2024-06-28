import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { templates } from "../Creator/templates";

function TemplatesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["end end", "start start"],
  });
  const motionX = useTransform(scrollYProgress, [1, 0], [0, 1]);
  const scrollPos = useTransform(() => {
    return motionX.get() * 1000;
  });
  return (
    <section
      className="min-h-[200vh] w-full flex items-center justify-center overflow-hidden"
      ref={carouselRef}
    >
      <motion.div
        className="flex flex-row items-center justify-center min-w-max space-x-5"
        style={{ x: scrollPos }}
      >
        {templates.map((ele) => (
          <Image
            width={"300"}
            height={"300"}
            alt="resume template"
            src={`/template.PNG`}
            className={`min-w-[27vw]`}
            key={ele.templateId}
          />
        ))}
        {templates.map((ele) => (
          <Image
            width={"300"}
            height={"300"}
            alt="resume template"
            src={`/template.PNG`}
            className={`min-w-[27vw]`}
            key={ele.templateId + templates.length}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default TemplatesCarousel;
