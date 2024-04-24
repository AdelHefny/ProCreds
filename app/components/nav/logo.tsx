import Link from "next/link";
import LogoExportar from "./logoExportar";
import { Variants, motion } from "framer-motion";
import "./nav.css";
function Logo() {
  return (
    <Link
      href={"#"}
      className="text-interactive font-extrabold font-mono flex flex-row"
    >
      <div className="logo">
        <LogoExportar />
      </div>
      <div className="relative before:content-[''] before:bg-secant2 before:h-[90%] before:w-px before:absolute before:left-1 after:top-0 flex flex-col pl-3 items-center justify-center">
        <h1 className="text-secant2 text-xl font-extrabold">ProCreds</h1>
        <h3 className="text-secant3 font-['']" style={{ fontSize: "0.5rem" }}>
          Build your wining resume
        </h3>
      </div>
    </Link>
  );
}

export default Logo;
