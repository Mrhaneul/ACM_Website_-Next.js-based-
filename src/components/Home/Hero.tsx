"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TextType from "@/src/components/TextType";
import { site } from "@/src/config/site";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-68px)] items-center overflow-hidden bg-brand-ink text-white">
      <Image
        src="/home.jpg"
        alt="The engineering building at California Baptist University"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,74,173,0.82),rgba(88,203,247,0.55))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" />

      <div className="container-x relative py-24 text-center sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow !text-white/80"
        >
          {site.university}
        </motion.p>
        <h1 className="mx-auto mt-4 min-h-[3.3em] max-w-4xl text-4xl font-semibold leading-[1.08] sm:min-h-[2.2em] sm:text-6xl lg:text-7xl">
          <TextType
            text={["Association for Computing Machinery"]}
            as="span"
            typingSpeed={70}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-accent"
            loop={false}
            variableSpeed={null}
            onSentenceComplete={() => {}}
          />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl"
        >
          Empowering the next generation of computer scientists at {site.university}.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link href="/join" className="btn-inverse">
            Join ACM <i className="bi bi-arrow-right" />
          </Link>
          <Link href="/teams" className="btn-outline-inverse">
            Explore teams
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
