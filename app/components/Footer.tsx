"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer
      ref={ref}
      className="bg-main w-full text-secant2 text-center py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Join Us and Stay Connected
        </h1>
        <p className="mb-6 text-lg">
          Subscribe to our newsletter to get the latest updates and exclusive
          offers.
        </p>
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
            className="hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faFacebookF as IconProp} size="2x" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
            className="hover:text-blue-400"
          >
            <FontAwesomeIcon icon={faTwitter as IconProp} size="2x" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
            className="hover:text-pink-500"
          >
            <FontAwesomeIcon icon={faInstagram as IconProp} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/adel-hefny-75b6601bb/"
            target="_blank"
            aria-label="LinkedIn"
            className="hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faLinkedin as IconProp} size="2x" />
          </a>
        </div>
        <p className="text-sm text-gray-400">
          © 2024 Adel Hefny. All rights reserved. | Privacy Policy | Terms of
          Service
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
