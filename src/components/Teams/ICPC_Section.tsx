import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const ICPC_Section = () => {
  return (
    <>
      <section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>ICPC Team</h3>

        {/* Introduction */}
        <div className={styles.introSection}>
          <h4 className={styles.sectionSubtitle}>About the Team</h4>
          <p className={styles.teamDescription}>
            The ICPC team represents ACM in the International Collegiate
            Programming Contest, one of the most prestigious competitive
            programming competitions in the world. Our team tackles challenging
            algorithmic problems and competes against universities globally to
            test our problem-solving skills under pressure.
          </p>
        </div>

        {/* What They Do */}
        <div className={styles.whatWeDoSection}>
          <h4 className={styles.sectionSubtitle}>What We Do</h4>
          <p className={styles.teamDescription}>
            ICPC is the premier global programming competition for university
            students. Teams of three work together to solve complex algorithmic
            challenges within a limited time frame. Our members develop
            expertise in:
          </p>
          <ul className={styles.skillsList}>
            <li>Advanced algorithms and data structures</li>
            <li>Competitive programming techniques</li>
            <li>Problem-solving under time constraints</li>
            <li>Team collaboration and strategy</li>
            <li>Code optimization and debugging</li>
          </ul>
        </div>

        {/* Team Stats */}
        <div className={styles.statsSection}>
          <h4 className={styles.sectionSubtitle}>Team Information</h4>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Competition Format</p>
              <p className={styles.statValue}>3-person teams</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Focus</p>
              <p className={styles.statValue}>Algorithmic Problem Solving</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Scope</p>
              <p className={styles.statValue}>Global Competition</p>
            </div>
          </div>
          <div className={styles.achievementBox}>
            <p className={styles.achievementLabel}>Our Mission</p>
            <p className={styles.achievementText}>
              Compete at the highest level of collegiate programming while
              developing world-class problem-solving skills that prepare us for
              technical careers.
              <br />
              <span className={styles.achievementText}>
                Building tomorrow&apos;s algorithmic thinkers!
              </span>
            </p>
          </div>
        </div>

        {/* Leadership Section */}
        <div className={styles.leadershipSection}>
          <h4 className={styles.sectionSubtitle}>Team Leadership</h4>
          <div className={styles.memberGrid}>
            <div className={styles.memberCard}>
              <div className={styles.avatar}>
                <i className="bi bi-person-circle"></i>
              </div>
              <p className={styles.name}>Joshua Baeza</p>
              <p className={styles.role}>Team Lead</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 20XX</p>
                <a
                  href="mailto:JoshuaAlexander.Baeza@calbaptist.edu"
                  className={styles.emailIconContainer}
                >
                  <i
                    className="bi bi-envelope-fill"
                    style={{ color: "white", fontSize: "1rem" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* How to Join Section */}
        <div className={styles.joinSection}>
          <h4 className={styles.sectionSubtitle}>How to Join</h4>
          <p className={styles.teamDescription}>
            Interested in competitive programming and algorithmic challenges?
            Connect with us on Discord to learn about practice sessions, team
            formation, and upcoming ICPC competitions. All skill levels are
            encouraged to participate!
          </p>
          <div className={styles.contactLinks}>
            <a
              href="https://discord.gg/8hpnqsN8Aw"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordButton}
            >
              <i className="bi bi-discord"></i> Join our Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ICPC_Section;
