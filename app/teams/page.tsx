import Image from "next/image";
import styles from "./teams.module.css";
import Navbar from "../components/Navbar";

export default function TeamsPage() {
  return (
		<>
			<Navbar />
    <main className={styles.main}>
      <h1 className={styles.teamOverviewTitle}>Our Teams</h1>

      {/* === Team Cards Section === */}
      <section className={styles.teamOverview}>
        <div className={styles.teamCards}>
          {/* ICPC */}
          <div className={styles.teamCard} data-team="icpc">
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
          <div className={styles.teamCard} data-team="ccdc">
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
          <div className={styles.teamCard} data-team="set">
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
      <section id="icpc" className={`${styles.teamSection} ${styles.active}`}>
        <h3 className={styles.teamSectionTitle}>ICPC Members</h3>
        <p className={styles.teamDescription}>
          The ICPC, or International Collegiate Programming Contest, is a global
          competitive programming competition...
        </p>
        <div className={styles.memberGrid}>
          <div className={styles.memberCard}>
            <div className={styles.avatar}>
              <Image
                src="/profile.png"
                alt="ICPC Member"
                width={250}
                height={250}
                className={styles.memberImage}
              />
            </div>
            <p className={styles.name}>Firstname Last</p>
            <div className={styles.gradEmail}>
              <p className={styles.gradclass}>Class of 20XX</p>
              <a
                href="mailto:test@example.com"
                className={styles.emailIconContainer}
              >
                <Image
                  src="/EMAIL_ICON.png"
                  alt="email"
                  width={16}
                  height={16}
                  className={styles.emailIcon}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Repeat for CCDC and SET sections... */}
    </main>
		</>
  );
}
