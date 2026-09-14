import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/src/components/ui/Reveal";
import { teams } from "@/src/data/teams";
import { site } from "@/src/config/site";

export const metadata: Metadata = {
  title: "ACM @ CBU · Computing club at California Baptist University",
};

const steps = [
  {
    n: "01",
    title: "Tell us about you",
    text: "A short form asking your year, what you're interested in, and any skills you already have. Only your name and email are required.",
  },
  {
    n: "02",
    title: "Get on Microsoft Teams",
    text: "Every meeting and practice is announced in Teams. We walk you through installing it on your phone and turning on notifications so you hear about them.",
  },
  {
    n: "03",
    title: "Show up",
    text: "Come to a team practice or a general meeting. Someone will introduce themselves and that is the whole onboarding process.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-ink text-white">
        <Image
          src="/home.png"
          alt="The engineering building at California Baptist University"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/75 to-brand-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />
        <div className="grain absolute inset-0" />

        <div className="container-x relative py-24 sm:py-32 lg:py-40">
          <p className="eyebrow !text-accent">Student chapter · {site.university}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Learn to build things with people who are still figuring it out too.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            ACM is the computing club at CBU. There are four teams: competitive programming, cyber
            defense, software engineering, and game design. Any major can join, and you don&apos;t
            need any experience.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/join" className="btn-inverse">
              Join ACM <i className="bi bi-arrow-right" />
            </Link>
            <Link href="/teams" className="btn-outline-inverse">
              See the teams
            </Link>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <p className="eyebrow">Four teams</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Pick one, or try a couple.</h2>
            </div>
            <p className="max-w-prose text-lg leading-relaxed text-ink-2 lg:pt-9">
              Each team runs its own practices and projects. You can be on more than one, and you
              can switch later. Most freshmen sit in on two or three during the first month before
              they settle on one.
            </p>
          </Reveal>

          <ol className="mt-14 divide-y divide-line border-y border-line">
            {teams.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 0.05}>
                <Link
                  href={`/teams#${t.id}`}
                  className="group grid items-center gap-4 py-7 sm:grid-cols-[3rem_4rem_1fr_auto] sm:gap-8"
                >
                  <span className="font-mono text-sm text-ink-3">0{i + 1}</span>
                  <Image
                    src={t.logo}
                    alt=""
                    width={64}
                    height={64}
                    className="h-14 w-14 object-contain"
                    unoptimized
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-ink group-hover:text-brand sm:text-2xl">
                      {t.name}
                      <span className="ml-3 font-mono text-sm font-normal text-ink-3">{t.short}</span>
                    </h3>
                    <p className="mt-1 max-w-prose text-ink-2">{t.summary}</p>
                  </div>
                  <span className="hidden text-brand transition group-hover:translate-x-1 sm:block">
                    <i className="bi bi-arrow-right text-xl" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* How joining works */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How joining works</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">It takes three steps and there is no interview.</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="relative border-t-2 border-brand pt-6">
                <span className="font-mono text-sm text-brand">{s.n}</span>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link href="/join" className="btn-primary">
              Start with the form <i className="bi bi-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Photo + pitch */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Image
              src="/about_img1.png"
              alt="Students studying in the engineering building atrium"
              width={479}
              height={715}
              className="w-full rounded-2xl object-cover shadow-[0_30px_60px_-30px_rgba(11,31,68,0.45)]"
            />
            <div className="absolute -bottom-5 -right-3 hidden rounded-xl bg-white px-5 py-4 shadow-lg sm:block">
              <p className="text-xs uppercase tracking-wider text-ink-3">Open to</p>
              <p className="font-semibold">Every major, every year</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Why bother</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Classes teach you the language. Here you learn to finish a project.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-2">
              <p>
                The projects and contests here look like real work. You are in a repository with
                other people&apos;s code, there is a deadline, the network is under attack, or the
                game has to be playable by Sunday.
              </p>
              <p>
                That is the kind of thing that ends up on a résumé and comes up in interviews. It is
                also how you find the people you will do group projects with for the next four years.
              </p>
            </div>
            <Link href="/about" className="btn-ghost mt-6 -ml-4">
              More about the chapter <i className="bi bi-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden bg-brand py-20 text-white sm:py-24">
        <div className="grain absolute inset-0" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
        <div className="container-x relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">New members welcome any week of the semester.</h2>
            <p className="mt-4 text-lg text-white/80">
              Fill out the form, get on Teams, and come to the next meeting. It takes less time
              than reading this page did.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="btn-inverse">
              Join ACM
            </Link>
            <Link href="/contact" className="btn-outline-inverse">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
