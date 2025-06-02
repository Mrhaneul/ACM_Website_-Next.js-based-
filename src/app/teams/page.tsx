"use client";

import Image from "next/image";
import styles from "./teams.module.css";
import React, { useEffect, useState } from "react";
import ICPC_Section from "@/src/components/Teams/ICPC_Section";
import CCDC_Section from "@/src/components/Teams/CCDC_Section";
import SET_Section from "@/src/components/Teams/SET_Section";

export default function TeamsPage() {
	// RYAN - Using useState to keep track of which section is currently open,
	// so that is what activeSection, and setActiveSection are for. activeSection
	// keeps track of the active section, eg. "icpc", and setActiveSection is for
	// changing activeSection.
	const [activeSection, setActiveSection] = useState(null);

	// RYAN - handleTeamClick is for changing which section is active, so we use the
	// setActiveSection from above and that lets us change which team is active.
	const handleTeamClick = (teamName) => {
		setActiveSection(activeSection === teamName ? null: teamName);
	};

	// RYAN - This is for getting the page to scroll down and show the current team
	// that the user is viewing.
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
    	<main className={styles.main}>
      <h1 className={styles.teamOverviewTitle}>Our Teams</h1>

      {/* === Team Cards Section === */}
      <section className={styles.teamOverview}>
        <div className={styles.teamCards}>
          {/* ICPC */}
          <div
							className={styles.teamCard}
							data-team="icpc"
							onClick={() => handleTeamClick("icpc")}
							style={{ cursor: "pointer" }}
					>
						<Image
              src="/icpc.png"
              alt="ICPC Team"
              width={250}
              height={250}
              className={styles.teamLogo}
            />
            <h2>ICPC</h2>
            <p>International Collegiate Programming Contest</p>
            <div className={styles.arrow}></div>
          </div>

          	{/* CCDC */}
          	<div
							className={styles.teamCard}
							data-team="ccdc"
							onClick={() => handleTeamClick("ccdc")}
							style={{ cursor: "pointer" }}
						>
            	<Image
              	src="/ccdc.png"
              	alt="CCDC Team"
              	width={250}
              	height={250}
              	className={styles.teamLogo}
            	/>
            	<h2>CCDC</h2>
            	<p>Collegiate Cyber Defense Competition</p>
            	<div className={styles.arrow}></div>
          	</div>

          	{/* SET */}
          	<div
							className={styles.teamCard}
							data-team="set"
							onClick={() => handleTeamClick("set")}
							style={{ cursor: "pointer" }}
						>
            	<Image
              	src="/set.png"
              	alt="SET Team"
              	width={250}
              	height={250}
              	className={styles.teamLogo}
            	/>
            	<h2>SET</h2>
            	<p>Software Engineering Team</p>
            	<div className={styles.arrow}></div>
          	</div>
        	</div>
      	</section>

      	{/* === ICPC Section === */}
				<div
					id="icpc"
					style={{
						display: activeSection === "icpc" ? "block" : "none",
						marginTop: "2rem"
					}}
				>
					<ICPC_Section />
				</div>
				{/* === CCDC Section === */}
				<div
					id="ccdc"
					style={{
						display: activeSection === "ccdc" ? "block" : "none",
						marginTop: "2rem"
					}}
				>
					<CCDC_Section />
				</div>
				{/* === SET Section === */}
				<div
					id="set"
					style={{
						display: activeSection === "set" ? "block" : "none",
						marginTop: "2rem"
					}}
				>
					<SET_Section />
				</div>
				<footer>
					<div className="w-full h-10 bg-#004AAD"/>
				</footer>
    	</main>
		</>
  );
}

