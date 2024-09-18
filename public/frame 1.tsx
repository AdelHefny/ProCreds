import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
function Frame() {
  const path = useRef(null);
  const { scrollYProgress } = useScroll({
    target: path,
    offset: ["8% 80%", "80% 8%"],
  });
  const l1 = useTransform(scrollYProgress, [0, 0.2333], [0, 1]);
  const c1 = useTransform(scrollYProgress, [0.2333, 0.3333], [0, 1]);
  const l2 = useTransform(scrollYProgress, [0.3333, 0.5666], [0, 1]);
  const c2 = useTransform(scrollYProgress, [0.5666, 0.6666], [0, 1]);
  const l3 = useTransform(scrollYProgress, [0.6666, 0.9], [0, 1]);
  const c3 = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  return (
    <svg
      height="62"
      viewBox="0 0 550 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="GradientL1">
          <motion.stop style={{ stopColor: "#344E41", offset: l1 }} />
          <motion.stop style={{ stopColor: "#A3B18A" }} />
        </linearGradient>
        <linearGradient id="GradientL2">
          <motion.stop style={{ stopColor: "#344E41", offset: l2 }} />
          <motion.stop style={{ stopColor: "#A3B18A" }} />
        </linearGradient>
        <linearGradient id="GradientL3">
          <motion.stop style={{ stopColor: "#344E41", offset: l3 }} />
          <motion.stop style={{ stopColor: "#A3B18A" }} />
        </linearGradient>
        <linearGradient id="GradientC1">
          <motion.stop style={{ stopColor: "#344E41", offset: c1 }} />
          <motion.stop style={{ stopColor: "#A3B18A" }} />
        </linearGradient>
        <linearGradient id="GradientC2">
          <motion.stop style={{ stopColor: "#344E41", offset: c2 }} />
          <motion.stop style={{ stopColor: "#A3B18A" }} />
        </linearGradient>
        <linearGradient id="GradientC3">
          <motion.stop style={{ stopColor: "#344E41", offset: c3 }} />
          <motion.stop style={{ stopColor: "#A3B18A" }} />
        </linearGradient>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="red" />
          <stop offset="50%" stop-color="black" stop-opacity="0" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
      </defs>
      <g clip-path="url(#clip0_1_18)">
        <circle cx="26" cy="31" r="25" fill="#344E41" />
        <path
          d="M28.2208 24V40H24.502V27.6094H24.3144L21.1582 29.7969V26.4531L24.9308 24H28.2208Z"
          fill="#DAD7CD"
        />
        <circle fill="url(#GradientC1)" cx="188" cy="31" r="25" />
        <path
          d="M186.165 40V37.2188L192.001 32.1094C192.438 31.7135 192.811 31.3516 193.118 31.0234C193.425 30.6901 193.66 30.3568 193.821 30.0234C193.983 29.6849 194.063 29.3177 194.063 28.9219C194.063 28.4792 193.967 28.1016 193.774 27.7891C193.582 27.4714 193.316 27.2266 192.978 27.0547C192.639 26.8828 192.251 26.7969 191.813 26.7969C191.371 26.7969 190.983 26.888 190.649 27.0703C190.316 27.2474 190.056 27.5052 189.868 27.8438C189.686 28.1823 189.595 28.5937 189.595 29.0781H185.931C185.931 27.9896 186.175 27.0495 186.665 26.2578C187.155 25.4661 187.842 24.8568 188.728 24.4297C189.618 23.9974 190.652 23.7812 191.829 23.7812C193.043 23.7812 194.097 23.9844 194.993 24.3906C195.889 24.7969 196.582 25.3646 197.071 26.0937C197.566 26.8177 197.813 27.6589 197.813 28.6172C197.813 29.2266 197.691 29.8307 197.446 30.4297C197.201 31.0286 196.761 31.6901 196.126 32.4141C195.496 33.138 194.6 34.0052 193.438 35.0156L191.524 36.7812V36.8828H198.009V40H186.165Z"
          fill="#DAD7CD"
        />

        <circle cx="349" cy="31" r="25" fill="url(#GradientC2)" />
        <path
          d="M431.71 40.2187C430.491 40.2187 429.41 40.0104 428.468 39.5937C427.53 39.1719 426.79 38.5911 426.249 37.8516C425.707 37.112 425.431 36.2604 425.421 35.2969H429.311C429.327 35.6458 429.439 35.9557 429.647 36.2266C429.856 36.4922 430.139 36.7005 430.499 36.8516C430.858 37.0026 431.267 37.0781 431.725 37.0781C432.184 37.0781 432.587 36.9974 432.936 36.8359C433.29 36.6693 433.566 36.4427 433.764 36.1562C433.962 35.8646 434.059 35.5312 434.053 35.1562C434.059 34.7812 433.952 34.4479 433.733 34.1562C433.514 33.8646 433.205 33.638 432.803 33.4766C432.408 33.3151 431.939 33.2344 431.397 33.2344H429.843V30.4844H431.397C431.871 30.4844 432.288 30.4062 432.647 30.25C433.012 30.0937 433.296 29.875 433.499 29.5937C433.702 29.3073 433.801 28.9792 433.796 28.6094C433.801 28.25 433.715 27.9349 433.538 27.6641C433.366 27.388 433.124 27.1745 432.811 27.0234C432.504 26.8724 432.147 26.7969 431.741 26.7969C431.314 26.7969 430.926 26.8724 430.577 27.0234C430.233 27.1745 429.96 27.388 429.757 27.6641C429.553 27.9401 429.447 28.2604 429.436 28.625H425.741C425.751 27.6719 426.017 26.8333 426.538 26.1094C427.059 25.3802 427.767 24.8099 428.663 24.3984C429.564 23.987 430.59 23.7812 431.741 23.7812C432.887 23.7812 433.895 23.9818 434.764 24.3828C435.634 24.7839 436.311 25.3307 436.796 26.0234C437.28 26.7109 437.522 27.4896 437.522 28.3594C437.527 29.2604 437.233 30.0026 436.639 30.5859C436.051 31.1693 435.293 31.5286 434.366 31.6641V31.7891C435.606 31.9349 436.54 32.3359 437.171 32.9922C437.806 33.6484 438.121 34.4687 438.116 35.4531C438.116 36.3802 437.843 37.2031 437.296 37.9219C436.754 38.6354 435.999 39.1979 435.03 39.6094C434.066 40.0156 432.96 40.2187 431.71 40.2187Z"
          fill="#DAD7CD"
          transform="translate(-83,0)"
        />
        <rect
          x="50.5" // Scaled down from 62
          y="23"
          width="113" // Scaled down from 142
          height="16"
          fill="url(#GradientL1)"
        />
        <rect
          x="211.5" // Scaled down from 266
          y="23"
          width="113" // Scaled down from 142
          height="16"
          fill="url(#GradientL2)"
        />
        <rect
          x="373" // Scaled down from 470
          y="23"
          width="113" // Scaled down from 142
          height="16"
          fill="url(#GradientL3)"
        />
        <circle
          cx="510" // Scaled down from 643
          cy="31"
          r="24" // Adjusted to fit better within the scaled-down size
          fill="url(#GradientC3)"
        />
        <path
          d="M513.4 37.3437V34.3281L519.955 24H522.635V28.0937H521.08L517.244 34.1719V34.2969H526.736V37.3437H513.4ZM521.127 40V36.4219L521.205 35.1016V24H524.822V40H521.127Z"
          fill="#DAD7CD"
          transform="translate(-10,0)"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_18">
          <rect width="550" height="62" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Frame;
