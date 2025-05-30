"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* NAV HEADER */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b-4"
        style={{ borderColor: "#004AAD" }}
      >
        <div className="flex items-center space-x-4">
          <Image
            src="/ACMatCBULogo.png"
            alt="ACM Logo"
            width={75}
            height={75}
          />
          <h1 className="text-2xl font-bold leading-tight">
            Association for
            <br />
            Computing Machinery
          </h1>
        </div>

        <nav className="navbar">
          <a href="/" className="navLink">
            Home <span className="diamond"></span>
          </a>
          <a href="/teams" className="navLink">
            Teams <span className="diamond"></span>
          </a>
          <a href="/about" className="navLink">
            About <span className="diamond"></span>
          </a>
          <a href="/contact" className="connectButton">
            Let's Connect!
          </a>
        </nav>
      </header>

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
