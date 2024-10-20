"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./logo";
function Nav() {
  return (
    <motion.nav
      initial={{ y: "-140%", x: "-50%" }}
      animate={{ y: 0 }}
      className="flex sm:space-x-6 space-x-3 items-center text-xs sm:text-base justify-between px-7 fixed top-2 rounded-full bg-secant bg-opacity-60 backdrop-blur-md left-1/2 sm:w-[28rem] w-[85%] h-16 z-40"
    >
      <Logo />
      <ul className="flex items-center justify-center space-x-2">
        <li className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
          <Link href={"/Creator"}>Create</Link>
        </li>
        <li className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
          <Link href={"/"}>Contacts</Link>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Nav;
