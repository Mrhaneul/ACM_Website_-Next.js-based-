import Image from "next/image";
import styles from "./teams-section.module.css";
import React from "react";

const ICPC_Section = () => {
  return (
		<>
			<section className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>ICPC Members</h3>
        <p className={styles.teamDescription}>
          The ICPC, or International Collegiate Programming Contest, is a global
          competitive programming competition...
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
  );
}

export default ICPC_Section
