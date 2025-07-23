import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const SET_Section = () => {
  return (
    <>
			<section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>SET Members</h3>
        <p className={styles.teamDescription}>
          The Software Engineering Team (SET) focuses on building real-world applications, learning industry best practices, and developing collaborative software solutions for the university and community.
        </p>
        <div className={styles.memberGrid}>
          <div className={styles.memberCard}>
            <div className={styles.avatar}>
              <i className="bi bi-person-circle"></i>
            </div>
            <p className={styles.name}>Firstname Last</p>
            <div className={styles.gradEmail}>
              <p className={styles.gradclass}>Class of 20XX</p>
              <a
                href="mailto:test@example.com"
                className={styles.emailIconContainer}
              >
                <i className="bi bi-envelope-fill" style={{color: 'white', fontSize: '1rem'}}></i>
              </a>
            </div>
          </div>
        </div>
      </section>
		</>
  )
}

export default SET_Section
