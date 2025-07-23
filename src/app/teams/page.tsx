"use client";

import Image from "next/image";
import styles from "./teams.module.css";
import React, { useEffect, useState } from "react";
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
    description: "Competitive programming excellence"
  },
  {
    id: "ccdc",
    name: "CCDC", 
    fullName: "Collegiate Cyber Defense Competition",
    logo: "/ccdc.png",
    color: "#73B9F3",
    gradient: "from-sky-400 to-blue-600",
    description: "Cybersecurity defense mastery"
  },
  {
    id: "set",
    name: "SET",
    fullName: "Software Engineering Team", 
    logo: "/set.png",
    color: "#004AAD",
    gradient: "from-indigo-600 to-blue-700",
    description: "Innovation through collaboration"
  }
];

export default function TeamsPage() {
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

	const handleTeamClick = (teamName: string) => {
		setActiveSection(activeSection === teamName ? null: teamName);
	};

	useEffect(() => {
		if(activeSection) {
			setTimeout(() => {
				const element = document.getElementById(activeSection);
				if(element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			}, 100);
		}
	}, [activeSection]);

  return (
		<>
    	<div className={styles.pageContainer}>
        {/* Hero Section */}
        <motion.section 
          className={styles.heroSection}
          initial={{ opacity: 0, y: 50 }}
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
              Excellence in <span className={styles.highlightText}>Competition</span>
            </motion.h1>
            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Three elite teams, one unified mission of academic and professional excellence
            </motion.p>
          </div>
          <div className={styles.heroPattern}></div>
        </motion.section>

        {/* Teams Grid */}
        <section className={styles.teamsGrid}>
          <div className={styles.gridContainer}>
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                className={`${styles.teamCard} ${activeSection === team.id ? styles.active : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredTeam(team.id)}
                onHoverEnd={() => setHoveredTeam(null)}
                onClick={() => handleTeamClick(team.id)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.logoContainer}>
                    <motion.div
                      className={styles.logoWrapper}
                      animate={{
                        rotateY: hoveredTeam === team.id ? 360 : 0
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={team.logo}
                        alt={`${team.name} Team`}
                        width={120}
                        height={120}
                        className={styles.teamLogo}
                      />
                    </motion.div>
                  </div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.teamName}>{team.name}</h2>
                    <p className={styles.teamFullName}>{team.fullName}</p>
                    <p className={styles.teamDescription}>{team.description}</p>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <motion.div 
                    className={styles.exploreButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore Team</span>
                    <motion.i 
                      className="bi bi-arrow-right"
                      animate={{
                        x: hoveredTeam === team.id ? 5 : 0
                      }}
                      style={{
                        fontSize: '1.2rem',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </motion.div>
                </div>
                
                <div 
                  className={styles.cardBackground}
                  style={{ background: `linear-gradient(135deg, ${team.color}15, ${team.color}08)` }}
                ></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Sections */}
        <AnimatePresence>
          {activeSection && (
            <motion.section
              id={activeSection}
              className={styles.teamSection}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {activeSection === "icpc" && <ICPC_Section />}
                {activeSection === "ccdc" && <CCDC_Section />}
                {activeSection === "set" && <SET_Section />}
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
		</>
  );
}