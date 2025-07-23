import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const CCDC_Section = () => {
  return (
    <>
			<section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>CCDC Members</h3>
        <p className={styles.teamDescription}>
          The Collegiate Cyber Defense Competition (CCDC) is a cybersecurity competition where students defend network infrastructures against red team attacks while maintaining business operations and services.
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

export default CCDC_Section
