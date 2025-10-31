import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const SET_Section = () => {
  return (
    <>
      <section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>Software Engineering Team</h3>

        {/* Introduction */}
        <div className={styles.introSection}>
          <h4 className={styles.sectionSubtitle}>About the Team</h4>
          <p className={styles.teamDescription}>
            The Software Engineering Team (SET) is ACM&apos;s innovation
            powerhouse, where we tackle ambitious projects from building Large
            Language Models from scratch to mastering React animations.
            We&apos;re the leading edge in AI development at CBU, designing and
            building complex programming projects for real-world career
            preparedness.
          </p>
        </div>

        {/* What They Do */}
        <div className={styles.whatWeDoSection}>
          <h4 className={styles.sectionSubtitle}>What We Do</h4>
          <p className={styles.teamDescription}>
            SET is passionate about building impactful projects that push the
            boundaries of what&apos;s possible. We combine cutting-edge AI
            research with practical software development to create solutions
            that serve the CBU community. Members gain hands-on experience with:
          </p>
          <ul className={styles.skillsList}>
            <li>AI and machine learning development</li>
            <li>Full-stack web development (React, Next.js)</li>
            <li>Ground-up transformer model training</li>
            <li>Production-level software engineering</li>
            <li>Collaborative project design and architecture</li>
          </ul>
        </div>

        {/* Current Projects */}
        <div className={styles.statsSection}>
          <h4 className={styles.sectionSubtitle}>Current Projects</h4>
          <div className={styles.achievementBox}>
            <p className={styles.achievementLabel}>
              GUTT - Ground-Up-Trained-Transformer
            </p>
            <p className={styles.achievementText}>
              Our flagship AI framework designed to work with any dataset and
              train models for any application at CBU. Current applications
              include a front desk helper with an interactive map to help
              students find information about clubs, office locations, and the
              best spots to eat.
              <br />
              <span className={styles.achievementText}>
                Building AI that serves our community!
              </span>
            </p>
          </div>
          <div
            className={styles.achievementBox}
            style={{ marginTop: "1.5rem" }}
          >
            <p className={styles.achievementLabel}>ACM Website</p>
            <p className={styles.achievementText}>
              Finalizing and fully publishing the ACM website with up-to-date
              information while maintaining professional standards and modern
              design.
            </p>
          </div>
        </div>

        {/* Team Stats */}
        <div className={styles.statsSection}>
          <h4 className={styles.sectionSubtitle}>Team Information</h4>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Team Size</p>
              <p className={styles.statValue}>~10 members</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Meeting Time</p>
              <p className={styles.statValue}>Mondays 4:30-5:30 PM</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Location</p>
              <p className={styles.statValue}>Room 203</p>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className={styles.leadershipSection}>
          <h4 className={styles.sectionSubtitle}>Team Leadership</h4>
          <div className={styles.memberGrid}>
            {/* Team Lead 1 */}
            <div className={styles.memberCard}>
              <div className={styles.avatar}>
                <i className="bi bi-person-circle"></i>
              </div>
              <p className={styles.name}>Joshua Gomez</p>
              <p className={styles.role}>Team Lead</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 2026</p>
                <a
                  href="mailto:joshuahernando.gomez@calbaptist.edu"
                  className={styles.emailIconContainer}
                >
                  <i
                    className="bi bi-envelope-fill"
                    style={{ color: "white", fontSize: "1rem" }}
                  ></i>
                </a>
              </div>
            </div>

            {/* Team Lead 2 */}
            <div className={styles.memberCard}>
              <div className={styles.avatar}>
                <i className="bi bi-person-circle"></i>
              </div>
              <p className={styles.name}>Andrew Willis</p>
              <p className={styles.role}>Team Lead</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 2025</p>
                <a
                  href="mailto:AndrewWillis771@outlook.com"
                  className={styles.emailIconContainer}
                >
                  <i
                    className="bi bi-envelope-fill"
                    style={{ color: "white", fontSize: "1rem" }}
                  ></i>
                </a>
              </div>
            </div>

            {/* Co-Lead */}
            <div className={styles.memberCard}>
              <div className={styles.avatar}>
                <i className="bi bi-person-circle"></i>
              </div>
              <p className={styles.name}>Joey Russell</p>
              <p className={styles.role}>Co-Lead | Website Manager</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 20XX</p>
                <a
                  href="mailto:Josephbernard.russell@calbaptist.edu"
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
            Ready to build cutting-edge software and AI projects? Join us at our
            Monday meetings in Room 203, or connect with us on Discord. We
            welcome all students passionate about software engineering and
            innovation!
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

export default SET_Section;
