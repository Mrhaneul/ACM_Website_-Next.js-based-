"use client";

import styles from "./page.module.css";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FaTrophy, FaShieldAlt, FaCode, FaGamepad, FaArrowRight } from "react-icons/fa";
import TextType from "@/src/components/TextType";
import { useIsMobile, useIsTablet, useIsDesktop } from "../hooks/Responsive";
const teams = [
  {
    name: "ICPC",
    title: "International Collegiate Programming Contest",
    description:
      "Sharpen your algorithms and compete globally in prestigious programming competitions",
    icon: FaTrophy,
    color: "#004AAD",
    gradient: "from-blue-600 to-blue-800",
    members: 15,
    competitions: 8,
  },
  {
    name: "CCDC",
    title: "Collegiate Cyber Defense Competition",
    description:
      "Defend networks, learn cybersecurity, and protect against real-world threats",
    icon: FaShieldAlt,
    color: "#58cbf7",
    gradient: "from-cyan-400 to-blue-500",
    members: 12,
    competitions: 5,
  },
  {
    name: "SET",
    title: "Software Engineering Team",
    description:
      "Build real applications, gain industry experience, and create impactful solutions",
    icon: FaCode,
    color: "#004AAD",
    gradient: "from-indigo-600 to-purple-600",
    members: 20,
    projects: 8,
  },
  {
    name: "Game Design",
    title: "Game Design Team",
    description:
      "Create engaging games, compete in game jams, and bring your creative visions to life",
    icon: FaGamepad,
    color: "#004AAD",
    gradient: "from-blue-600 to-blue-800",
    members: 6,
    projects: 4,
  },
];

export default function Home() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isMobile = useIsMobile();
  const useTablet = useIsTablet();
  const useDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <>
      {/* HERO SECTION */}
      <main ref={ref} className={styles.campus}>
        <motion.div
          className={styles.overlay}
          style={{ y, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center px-4 max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-white leading-tight mb-8"
            >
              <TextType
                text={["Association for Computing Machinery"]}
                as="span"
                typingSpeed={75}
                showCursor={true}
                cursorCharacter="_"
                cursorClassName="text-[#58cbf7]"
                pauseDuration={1500}
                loop={false}
                variableSpeed={null}
                onSentenceComplete={() => {}}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
            >
              Empowering the next generation of computer scientists at
              California Baptist University
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/login" className={styles.blobBtn}>
                Join ACM Today
                <span className={styles.blobBtnInner}>
                  <span className={styles.blobBtnBlobs}>
                    <span className={styles.blobBtnBlob}></span>
                    <span className={styles.blobBtnBlob}></span>
                    <span className={styles.blobBtnBlob}></span>
                    <span className={styles.blobBtnBlob}></span>
                  </span>
                </span>
              </Link>
              <Link
                href="/teams"
                className={`${styles.blobBtn} ${styles.blobBtnSecondary}`}
              >
                Explore Teams
                <span className={styles.blobBtnInner}>
                  <span className={styles.blobBtnBlobs}>
                    <span className={styles.blobBtnBlob}></span>
                    <span className={styles.blobBtnBlob}></span>
                    <span className={styles.blobBtnBlob}></span>
                    <span className={styles.blobBtnBlob}></span>
                  </span>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* TEAMS PREVIEW SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-400/5 z-0"></div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#004AAD] mb-6">
              Our Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join one of our specialized teams and dive deep into your passion
              for technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teams.map((team, index) => {
              const IconComponent = team.icon;
              return (
                <motion.div
                  key={team.name}
                  // initial={{ opacity: 0, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { y: -10, transition: { duration: 0.2 } }
                  }
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-[#58cbf7] transition-all duration-300 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${team.gradient} rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105`}
                    >
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#004AAD]">
                        {team.name}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {team.members || team.projects}{" "}
                        {team.members ? "Members" : "Projects"}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                      {team.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {team.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Active Team
                      </span>
                      {team.competitions && (
                        <span>{team.competitions} Competitions</span>
                      )}
                    </div>

                    {/* Learn More Link */}
                    <Link
                      href="/teams"
                      className="inline-flex items-center gap-2 text-[#004AAD] font-semibold group-hover:text-[#58cbf7] transition-colors duration-300"
                    >
                      Learn More
                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>

                  {/* Hover effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>
                </motion.div>
              );
            })}
          </div>

          {/* Learn More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link
              href="/teams"
              className="group inline-flex items-center gap-3 bg-[#004AAD] hover:bg-[#58cbf7] text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span>Explore All Teams</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-r from-[#004AAD] to-[#58cbf7] text-white relative z-10">
        <div className="container mx-auto px-4 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join the Future?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Start your journey with ACM @ CBU today and connect with
              like-minded students who share your passion for technology
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-[#004AAD] font-bold py-4 px-12 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Get Started Now
              <FaArrowRight className="text-lg" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SVG Filter for Blob Effect */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
