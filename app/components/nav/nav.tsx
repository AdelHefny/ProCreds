"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
function Nav() {
  return (
    <motion.nav
      initial={{ y: "-140%", x: "-50%" }}
      animate={{ y: 0 }}
      className="flex space-x-6 items-center justify-between px-7 fixed top-2 rounded-full bg-secant bg-opacity-60 backdrop-blur-md left-1/2 sm:w-96 w-3/4 h-16 z-40"
    >
      <Link href={"#"} className="text-interactive font-extrabold font-mono">
        <Image
          src={"/procreds-high-resolution-logo.png"}
          alt="logo"
          width={256}
          height={256}
        />
      </Link>
      <ul className="flex items-center justify-center space-x-2">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/Creator"}>Create</Link>
        </li>
        <li>
          <Link href={"/"}>Contacts</Link>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Nav;
