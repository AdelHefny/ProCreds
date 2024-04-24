import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function TemplatesCarousel() {
  const carouselRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: carouselRef });

  // Calculate rotation angle and x position based on scroll progress
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 45] // Rotate from -360 to 360 degrees
  );
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [-10, 10] // Move from -100 to 100 pixels horizontally
  );

  // Calculate circular motion
  const circleX = useTransform(
    scrollYProgress,
    [0, 1],
    [-100, 100] // Move from -100 to 100 pixels horizontally
  );
  const circleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 200] // Move from 0 to 200 pixels vertically
  );

  return (
    <section className="min-h-[200vh] w-full">
      <button>
        <FontAwesomeIcon icon={faCaretRight as IconDefinition} />
      </button>
      <button>
        <FontAwesomeIcon icon={faCaretLeft as IconDefinition} />
      </button>
      <div
        ref={carouselRef}
        className="w-full h-96 overflow-hidden flex items-center justify-center"
        style={{ perspective: "500px" }}
      >
        <motion.img
          src="/template.PNG"
          alt="template image"
          style={{
            rotateZ,
            translateX,
            x: circleX, // Apply circular motion horizontally
            y: circleY, // Apply circular motion vertically
            transformOrigin: "center center",
          }}
          className="w-64 h-64 bg-secant2 rounded-lg"
        />
        <motion.img
          src="/template.PNG"
          alt="template image"
          style={{
            rotateZ,
            translateX,
            x: circleX, // Apply circular motion horizontally
            y: circleY, // Apply circular motion vertically
            transformOrigin: "center center",
          }}
          className="w-64 h-64 bg-secant2 rounded-lg"
        />
        <motion.img
          src="/template.PNG"
          alt="template image"
          style={{
            rotateZ,
            translateX,
            x: circleX, // Apply circular motion horizontally
            y: circleY, // Apply circular motion vertically
            transformOrigin: "center center",
          }}
          className="w-64 h-64 bg-secant2 rounded-lg"
        />
      </div>
    </section>
  );
}

export default TemplatesCarousel;
