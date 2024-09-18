"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Steps from "./components/steps";
import TemplatesCarusel from "./components/templatesCarusel";
import "./animGradient.css";
import ContinueSteps from "./components/continueSteps";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col items-center justify-center">
        <section className="flex flex-col items-center justify-center min-h-screen sm:mt-16 mt-24 px-16">
          <h1 className="font-bold text-3xl text-center pb-4">
            Resume builder, Easy way to start and apply
          </h1>
          <p className="w-3/4 text-lg text-center">
            Begin crafting your credentials with simple steps and refine them
            along the way.
          </p>
          <div className="flex flex-row items-center justify-center pt-4">
            <Image
              src={"/template.PNG"}
              alt="template image"
              width={150}
              height={300}
              className="-rotate-[20deg] translate-y-5 translate-x-8 select-none"
            />
            <Image
              src={"/template.PNG"}
              alt="template image"
              width={150}
              height={300}
              className="z-10 select-none"
            />
            <Image
              src={"/template.PNG"}
              alt="template image"
              width={150}
              height={300}
              className="rotate-[20deg] translate-y-5 -translate-x-8 select-none"
            />
          </div>
          <Link
            href={"/Creator"}
            className="startCreating h-10 text-sm p-4 flex items-center justify-center mt-10 rounded-full text-main"
          >
            Start Creating
          </Link>
        </section>
        <Steps />
        <ContinueSteps />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
