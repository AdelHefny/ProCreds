import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { templateType } from "@/app/providors/templateContext";
import NormalTemplate from "./normalTemplate/normalTemplate";

const templatesChildrenvariants: Variants = {
  hidden: {
    x: "100vw",
    rotateZ: -30,
  },
  visible: {
    x: 0,
    rotateZ: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    rotateZ: -30,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};
function TemplateCard({ template }: { template: templateType }) {
  const [hovered, setisHovered] = useState(false);
  return (
    <motion.div key={template.name} variants={templatesChildrenvariants}>
      <div className="absolute top-6 left-0 flex items-center justify-start w-32 h-8">
        <div
          className={`${
            hovered ? "w-32" : "w-6"
          } h-8 transition-all bg-secant3 rounded-r-full overflow-hidden`}
        >
          <h3 className="font-bold w-32 h-full text-center text-white">
            {template.name}
          </h3>
        </div>
      </div>

      <motion.div
        onHoverStart={() => {
          setisHovered(true);
        }}
        onHoverEnd={() => {
          setisHovered(false);
        }}
        className="md:w-96 max-w-96 h-[30rem] cursor-pointer flex flex-col items-center justify-center text-[0.55rem] border-secant3 border-2 rounded-xl shadow-md shadow-secant3 overflow-hidden"
      >
        {template.templateType == "normal" && (
          <NormalTemplate templateData={template} />
        )}
        {template.templateType == "fancy" && (
          <NormalTemplate templateData={template} />
        )}
      </motion.div>
    </motion.div>
  );
}

export default TemplateCard;
