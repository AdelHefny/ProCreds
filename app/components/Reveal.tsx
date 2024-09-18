import { useAnimation, useInView, motion } from "framer-motion";
import { useEffect, useRef } from "react";

function Reveal({ children }) {
  const section = useRef(null);
  const isInView = useInView(section, {
    once: true,
    margin: "-500px",
  });
  const firstSectionControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log("adel");
      firstSectionControl.start("visible");
    }
  }, [isInView]);
  return (
    <motion.div
      variants={{
        hidden: {
          translateY: "-4rem",
          translateX: "-4rem",

          opacity: 0,
        },
        visible: {
          translateY: "0rem",
          translateX: "0rem",
          opacity: 1,
        },
      }}
      initial="hidden"
      animate={firstSectionControl}
      ref={section}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
