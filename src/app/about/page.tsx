"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: "easeOut" },
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-4xl font-bold text-center text-[#004AAD] mb-8"
        >
          About ACM @ CBU
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-[#004AAD] mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The Association for Computing Machinery (ACM) at California
              Baptist University is a student organization dedicated to
              advancing computing as a science and profession. We bring together
              students passionate about computer science, software engineering,
              cybersecurity, and technology innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
              className="bg-white border-2 border-[#004AAD] rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-[#004AAD] mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700">
                To foster a community of learners and innovators who advance
                computing technology while integrating Christian values in their
                professional and academic pursuits.
              </p>
            </motion.div>

            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.5 }}
              className="bg-white border-2 border-[#58cbf7] rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-[#004AAD] mb-3">
                What We Do
              </h3>
              <p className="text-gray-700">
                We organize coding competitions, hackathons, tech talks,
                networking events, and provide opportunities for hands-on
                experience through our specialized teams.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.6 }}
            className="bg-gradient-to-r from-[#004AAD] to-[#58cbf7] text-white rounded-lg p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6">
              Whether you're a beginner or an experienced programmer, there's a
              place for you in ACM @ CBU!
            </p>
            <div className="space-x-4">
              <a
                href="/teams"
                className="bg-white text-[#004AAD] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Explore Our Teams
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#004AAD] transition"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
