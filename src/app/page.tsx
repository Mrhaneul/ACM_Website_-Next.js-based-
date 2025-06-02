"use client";

import styles from "./page.module.css";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
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
    </>
  );
}


