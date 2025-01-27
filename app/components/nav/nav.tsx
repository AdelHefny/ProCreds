"use client";
import { motion, useAnimation } from "framer-motion";
import Logo from "./logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useContext, useEffect, useState } from "react";
import LoginModal from "./components/loginModol";
import Link from "next/link";
import SignupModal from "./components/signupModol";
import { AuthContext } from "@/app/providors/authProvidor";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const [isLoginModolOpen, setIsLoginModolOpen] = useState(false);
  const [isSignupModolOpen, setIsSignupLoginModolOpen] = useState(false);
  const { loading, user } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLoginModol = () => {
    setIsLoginModolOpen(() => true);
  };
  const handlecloseLoginModol = () => {
    setIsLoginModolOpen(() => false);
  };
  const handleSignupModol = () => {
    setIsSignupLoginModolOpen(() => true);
  };
  const handlecloseSignupModol = () => {
    setIsSignupLoginModolOpen(() => false);
  };
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileScreen = window.innerWidth < 640; // sm breakpoint

      controls.start({
        y: 0,
        x: isMobileScreen ? "0%" : "-50%",
        transition: { duration: 0.5 },
      });
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [controls]);

  return (
    <>
      <motion.nav
        initial={{ y: "-140%", x: "-50%" }}
        animate={{ y: 0 }}
        className="flex flex-row md:space-x-6 space-x-0 py-2 md:py-0 items-center text-xs md:text-base justify-between px-7 fixed top-2 rounded-full bg-secant bg-opacity-60 backdrop-blur-md md:left-1/2 left-1/2 md:w-max w-[65%] md:h-16 h-max z-40"
      >
        <Logo />

        {/* Burger Icon for small Screens */}
        <div className="md:hidden flex items-center text-secant3">
          <motion.button
            onClick={() => {
              toggleMenu();
              setIsOpen(!isOpen);
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }} // Rotate on click
            transition={{ duration: 0.3 }} // Smooth animation duration
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isOpen ? 1.2 : 1 }} // Icon scaling effect
              transition={{ duration: 0.3 }} // Transition time
            >
              <FontAwesomeIcon
                icon={(isOpen ? faTimes : faBars) as IconProp}
                size="2x"
              />
            </motion.div>
          </motion.button>
        </div>
        {/* Links for Large Screens */}
        <ul className="hidden md:flex flex-col md:flex-row items-center justify-center md:space-x-2">
          {[
            { href: "/", text: "Home" },
            { href: "/Creator", text: "Create" },
            { href: "/contacts", text: "Contacts" },
          ].map((link) => (
            <li
              key={link.href}
              className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 text-lg hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0"
            >
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
        <ul className="hidden md:flex items-center justify-between px-4 space-x-2 border-l-2 border-l-secant3">
          {!user && (
            /* AUthentication for larege screens */
            <>
              <li className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
                <button onClick={handleLoginModol}>Login</button>
              </li>
              <li className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
                <button onClick={handleSignupModol}>Sign Up</button>
              </li>
            </>
          )}
          {user && (
            <li className="hidden md:block relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
              <button
                onClick={() => {
                  signOut(auth);
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
        {/* Dropdown Menu for Small Screens */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-secant bg-opacity-90 rounded-b-md py-4 md:hidden z-50  text-lg font-bold"
          >
            <ul className="flex flex-col items-center space-y-4">
              {!user && (
                <div className="flex flex-row justify-center items-center w-full pb-2 text-md">
                  <li className=" w-1/2 flex justify-center">
                    <button onClick={handleLoginModol}>Login</button>
                  </li>
                  <li className=" w-1/2 flex justify-center border-l-2 border-l-secant2">
                    <button onClick={handleSignupModol}>Sign Up</button>
                  </li>
                </div>
              )}
              {user && (
                <li>
                  <button
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
              {[
                { href: "/", text: "Home" },
                { href: "/Creator", text: "Create" },
                { href: "/contacts", text: "Contacts" },
              ].map((link) => (
                <li
                  key={link.href}
                  onClick={toggleMenu} // Close the menu on link click
                >
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.nav>
      <LoginModal
        isModolOpen={isLoginModolOpen}
        handleCloseModal={handlecloseLoginModol}
        handleOpenSignupModal={handleSignupModol}
      />
      <SignupModal
        isModolOpen={isSignupModolOpen}
        handleCloseModal={handlecloseSignupModol}
        handleOpenLoginModal={handleLoginModol}
      />
    </>
  );
}

export default Nav;
