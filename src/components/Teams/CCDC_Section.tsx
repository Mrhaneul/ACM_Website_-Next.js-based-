import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const CCDC_Section = () => {
  return (
    <>
      <section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>CCDC Team</h3>

        {/* Introduction */}
        <div className={styles.introSection}>
          <h4 className={styles.sectionSubtitle}>About the Team</h4>
          <p className={styles.teamDescription}>
            The CCDC team is ACM&apos;s premier competitive cybersecurity
            branch, representing CBU in the prestigious Collegiate Cyber Defense
            Competition. Our team defends network infrastructures against
            professional red team hackers while maintaining critical business
            operations—simulating real-world enterprise security challenges.
          </p>
        </div>

        {/* What They Do */}
        <div className={styles.whatWeDoSection}>
          <h4 className={styles.sectionSubtitle}>What We Do</h4>
          <p className={styles.teamDescription}>
            Founded in 2023, our Cyber Branch competes against universities
            across the Western Region of the US. Teams are responsible for
            securing and maintaining 10 virtual machines in a fictional
            corporate environment while facing constant attacks from industry
            professionals. Members gain hands-on experience with:
          </p>
          <ul className={styles.skillsList}>
            <li>Network defense and incident response</li>
            <li>System hardening and security monitoring</li>
            <li>Service availability under pressure</li>
            <li>Team coordination and communication</li>
          </ul>
        </div>

        {/* Team Stats */}
        <div className={styles.statsSection}>
          <h4 className={styles.sectionSubtitle}>Team Information</h4>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Team Size</p>
              <p className={styles.statValue}>12-15 members</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Meeting Schedule</p>
              <p className={styles.statValue}>3 Days a week</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Current Goal</p>
              <p className={styles.statValue}>Top 10 Placement</p>
            </div>
          </div>
          <div className={styles.achievementBox}>
            <p className={styles.achievementLabel}>Recent Progress</p>
            <p className={styles.achievementText}>
              First year: 21st out of 22 teams → Last year: 19th out of 27 teams
              <br />
              <span className={styles.achievementText}>
                Significant improvement and climbing the ranks!
              </span>
            </p>
          </div>
        </div>

        {/* Leadership Section */}
        <div className={styles.leadershipSection}>
          <h4 className={styles.sectionSubtitle}>Team Leadership</h4>
          <div className={styles.memberGrid}>
            {/* Team Lead */}
            <div className={styles.memberCard}>
              <div className={styles.avatar}>
                <i className="bi bi-person-circle"></i>
              </div>
              <p className={styles.name}>Joshua Gomez</p>
              <p className={styles.role}>Team Lead</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 2026</p>
                <a
                  href="mailto:Joshua.Gomez@calbaptist.edu"
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
            Interested in joining the CCDC team? Connect with us through Discord
            to learn more about tryouts, practice sessions, and team
            opportunities. We welcome members of all skill levels who are
            passionate about cybersecurity.
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

export default CCDC_Section;
