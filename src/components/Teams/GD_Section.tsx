"use client";
import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const GD_Section = () => {
  return (
    <>
      <section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>Game Design Team</h3>

        {/* Introduction */}
        <div className={styles.introSection}>
          <h4 className={styles.sectionSubtitle}>About the Team</h4>
          <p className={styles.teamDescription}>
            The Game Design team is ACM&apos;s creative hub for aspiring game
            developers and designers. We bring together students passionate
            about creating engaging, original games through hands-on development
            and collaborative projects.
          </p>
        </div>

        {/* What They Do */}
        <div className={styles.whatWeDoSection}>
          <h4 className={styles.sectionSubtitle}>What We Do</h4>
          <p className={styles.teamDescription}>
            Our team focuses on developing the technical and creative skills
            needed to design and build compelling games. We actively participate
            in game jams and collaborate across disciplines to expand our
            expertise. Members gain experience with:
          </p>
          <ul className={styles.skillsList}>
            <li>Game mechanics and level design</li>
            <li>Unity and Unreal Engine development</li>
            <li>Collaborative project management</li>
            <li>Rapid prototyping in game jams</li>
            <li>Cross-disciplinary collaboration (art, music, narrative)</li>
          </ul>
        </div>

        {/* Team Stats */}
        <div className={styles.statsSection}>
          <h4 className={styles.sectionSubtitle}>Team Information</h4>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Team Size</p>
              <p className={styles.statValue}>6+ members</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Focus Areas</p>
              <p className={styles.statValue}>Game Development</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Current Goal</p>
              <p className={styles.statValue}>Game Jam Success</p>
            </div>
          </div>
          <div className={styles.achievementBox}>
            <p className={styles.achievementLabel}>Our Mission</p>
            <p className={styles.achievementText}>
              Compete and succeed in both campus and public game jams while
              building innovative games that push creative boundaries.
              <br />
              <span className={styles.achievementText}>
                Creating the next generation of game developers!
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
              <p className={styles.name}>Diego Patterson</p>
              <p className={styles.role}>Team Lead</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 2026</p>
                <a
                  href="mailto:diegochristopher.patterson@calbaptist.edu"
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
              <p className={styles.name}>Darrin Moss</p>
              <p className={styles.role}>Co-Lead</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 20XX</p>
                <a
                  href="mailto:darrinjames.moss@calbaptist.edu"
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
            Interested in game design and development? Join our team to work on
            exciting projects, participate in game jams, and collaborate with
            fellow game enthusiasts. All skill levels are welcome!
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

export default GD_Section;
