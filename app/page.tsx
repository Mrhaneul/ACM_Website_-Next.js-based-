"use client";

import styles from "./page.module.css";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar"; // Ryan - Added a Navbar Component, so we could use it on any other page.

export default function Home() {
  return (
    <>
			{/* NAVBAR */}
			<Navbar />
      {/* MAIN SECTION */}
      <main className={styles.campus}>
        <div className={styles.overlay}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-bold text-justify text-white leading-loose"
          >
            Association for
            <br />
            Computing
            <br />
            Machinery
          </motion.h1>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footerContainer">
          <div className="lineContainer">
            <div className="line"></div>
            <div className="triangle"></div>
          </div>
          <div className="footerIcons">
            <ul>
              <li>
                <a
                  className="footerLinks"
                  href="https://discord.gg/zpfkTBut"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-discord"></i>
                </a>
              </li>
              <li>
                <a
                  className="footerLinks"
                  href="https://www.instagram.com/acm_cbu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  className="footerLinks"
                  href="mailto:softwaredevcbu@gmail.com"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
            </ul>
            <p>ACM @ CBU 2024</p>
          </div>
          <div className="lineContainer">
            <div className="triangleLeft"></div>
            <div className="line"></div>
          </div>
        </div>
      </footer>
    </>
  );
}
