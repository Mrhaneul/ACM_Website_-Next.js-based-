"use client";
import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const GD_Section = () => {
  return (
    <>
      <section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>Game Design Members</h3>
        <p className={styles.teamDescription}>
          Game Design focuses on developing the skills needed to create engaging
          and original games. Our goal is to compete and succeed in both campus
          and public game jams while collaborating with students from other
          majors to expand our expertise.
        </p>
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
              href="mailto:diegochristopher.patterson@calbaptist.edu" className=
              {styles.emailIconContainer}
              <a>
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
              href="mailto:darrinjames.moss@calbaptist.edu" className=
              {styles.emailIconContainer}
              <a>
                <i
                  className="bi bi-envelope-fill"
                  style={{ color: "white", fontSize: "1rem" }}
                ></i>
              </a>
            </div>
          </div>
          {/* Placeholder for additional team members (4 more to reach team size of 6) */}
          {[...Array(4)].map((_, index) => (
            <div className={styles.memberCard} key={index}>
              <div className={styles.avatar}>
                <i className="bi bi-person-circle"></i>
              </div>
              <p className={styles.name}>Team Member {index + 1}</p>
              <div className={styles.gradEmail}>
                <p className={styles.gradclass}>Class of 20XX</p>
                href="mailto:member@calbaptist.edu" className=
                {styles.emailIconContainer}
                <a>
                  <i
                    className="bi bi-envelope-fill"
                    style={{ color: "white", fontSize: "1rem" }}
                  ></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default GD_Section;
