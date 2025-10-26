"use client";

import Image from "next/image";
import styles from "./teams.module.css";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ICPC_Section from "@/src/components/Teams/ICPC_Section";
import CCDC_Section from "@/src/components/Teams/CCDC_Section";
import SET_Section from "@/src/components/Teams/SET_Section";

const teams = [
  {
    id: "icpc",
    name: "ICPC",
    fullName: "International Collegiate Programming Contest",
    logo: "/icpc.png",
    color: "#004AAD",
    gradient: "from-blue-600 to-blue-800",
    description: "Competitive programming excellence",
    component: ICPC_Section,
  },
  {
    id: "ccdc",
    name: "CCDC",
    fullName: "Collegiate Cyber Defense Competition",
    logo: "/ccdc.png",
    color: "#73B9F3",
    gradient: "from-sky-400 to-blue-600",
    description: "Cybersecurity defense mastery",
    component: CCDC_Section,
  },
  {
    id: "set",
    name: "SET",
    fullName: "Software Engineering Team",
    logo: "/set.png",
    color: "#004AAD",
    gradient: "from-indigo-600 to-blue-700",
    description: "Innovation through collaboration",
    component: SET_Section,
  },
];

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const scrollToTeam = (teamId) => {
    setSelectedTeam(teamId);
    const element = document.getElementById(`team-${teamId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        {/* Hero Section */}
        <motion.section
          className={styles.heroSection}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.heroContent}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Excellence in{" "}
              <span className={styles.highlightText}>Competition</span>
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Three elite teams, one unified mission of academic and
              professional excellence
            </motion.p>
          </div>
          <div className={styles.heroPattern}></div>
        </motion.section>

        {/* Teams Grid */}
        <section className={styles.teamsGrid}>
          <motion.div
            className={styles.gridContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teams.map((team) => (
              <motion.div
                key={team.id}
                className={styles.teamCard}
                variants={cardVariants}
                onClick={() => scrollToTeam(team.id)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.logoContainer}>
                    <div className={styles.logoWrapper}>
                      <Image
                        src={team.logo}
                        alt={`${team.name} Team`}
                        width={120}
                        height={120}
                        className={styles.teamLogo}
                        unoptimized={true}
                      />
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.teamName}>{team.name}</h2>
                    <p className={styles.teamFullName}>{team.fullName}</p>
                    <p className={styles.teamDescription}>{team.description}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.exploreButton}>
                    <span>Explore Team</span>
                    <i
                      className="bi bi-arrow-right"
                      style={{
                        fontSize: "1.2rem",
                      }}
                    />
                  </div>
                </div>

                <div
                  className={styles.cardBackground}
                  style={{
                    background: `linear-gradient(135deg, ${team.color}15, ${team.color}08)`,
                  }}
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team Detail Sections */}
        <div className={styles.teamDetailsContainer}>
          {teams.map((team) => {
            const TeamComponent = team.component;
            return (
              <div key={team.id} id={`team-${team.id}`}>
                <TeamComponent />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
