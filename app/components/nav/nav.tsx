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
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const [isLoginModolOpen, setIsLoginModolOpen] = useState(false);
  const [isSignupModolOpen, setIsSignupLoginModolOpen] = useState(false);
  const { loading, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      setIsMobile(isMobileScreen);

      // Animate to new position
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
        className="flex flex-row sm:space-x-6 space-x-0 py-2 sm:py-0 items-center text-xs sm:text-base justify-between px-7 fixed top-2 rounded-full bg-secant bg-opacity-60 backdrop-blur-md sm:left-1/2 left-1/2 sm:w-[28rem] w-[65%] sm:h-16 h-max z-40"
      >
        <Logo />

        {/* Burger Icon for Small Screens */}
        <button
          className="sm:hidden text-lg focus:outline-none"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={(isMenuOpen ? faTimes : faBars) as IconProp} />
        </button>

        {/* Links for Large Screens */}
        <ul className="hidden sm:flex flex-col sm:flex-row items-center justify-center sm:space-x-2">
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

        {/* Dropdown Menu for Small Screens */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-secant bg-opacity-90 rounded-b-md py-4 sm:hidden z-50"
          >
            <ul className="flex flex-col items-center space-y-4">
              {[
                { href: "/", text: "Home" },
                { href: "/Creator", text: "Create" },
                { href: "/contacts", text: "Contacts" },
              ].map((link) => (
                <li
                  key={link.href}
                  className="text-lg font-bold"
                  onClick={toggleMenu} // Close the menu on link click
                >
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.nav>

      <motion.nav
        initial={{ y: "-140%" }}
        animate={{ y: 0 }}
        transition={{ typepe: "spring" }}
        className="flex items-center justify-between px-7 fixed rounded-full bg-secant bg-opacity-60 backdrop-blur-md left-0 md:max-w-[13rem] w-fit top-2 h-16 z-40"
      >
        {user && (
          <button
            className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 "
            onClick={() => {
              signOut(auth);
            }}
          >
            Logout
          </button>
        )}
        {!user && (
          <>
            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center justify-between px-4 space-x-2 w-full">
              <li className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
                <button onClick={handleLoginModol}>Login</button>
              </li>
              <li className="relative font-bold after:absolute after:content-[''] after:w-0 after:h-[2px] after:bg-secant2 hover:after:w-full after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:left-0 ">
                <button onClick={handleSignupModol}>Sign Up</button>
              </li>
            </ul>

            {/* Burger Icon for Mobile with Animation */}
            <div className="md:hidden flex items-center text-secant3">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? 180 : 0 }} // Rotate on click
                transition={{ duration: 0.5 }} // Smooth animation duration
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: isOpen ? 1.2 : 1 }} // Icon scaling effect
                  transition={{ duration: 0.5 }} // Transition time
                >
                  <FontAwesomeIcon
                    icon={(isOpen ? faTimes : faBars) as IconProp}
                    size="2x"
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-16 left-0 mt-2 bg-secant shadow-lg rounded-md w-40 z-50 md:hidden"
              >
                <ul className="flex flex-col space-y-4 text-secant2 font-bold p-4">
                  <li>
                    <button onClick={handleLoginModol}>Login</button>
                  </li>
                  <li>
                    <button onClick={handleSignupModol}>Sign Up</button>
                  </li>
                </ul>
              </motion.div>
            )}
          </>
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
