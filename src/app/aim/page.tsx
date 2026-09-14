import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/src/components/ui/Reveal";
import { aim } from "@/src/data/aim";
import { teams } from "@/src/data/teams";

export const metadata: Metadata = {
  title: "AIM partnership",
  description:
    "ACM | TEC is building software, security work, and training tools for Africa Inland Mission. What each division is doing and how to get involved.",
};

export default function AimPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div>
            <p className="eyebrow">Partnership · New this year</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Every division is building for {aim.name}.
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-2">{aim.why}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/join" className="btn-primary">
                Join a division <i className="bi bi-arrow-right" />
              </Link>
              <a href={aim.website} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                aimint.org <i className="bi bi-box-arrow-up-right text-xs" />
              </a>
            </div>
          </div>
          <div className="card flex flex-col items-center gap-5 p-8 text-center">
            <Image src={aim.logo} alt="Africa Inland Mission International" width={457} height={380} className="h-28 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-ink-2">{aim.summary}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">By division</p>
            <h2 className="mt-3 text-3xl font-semibold">What each team is working on</h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {teams.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 0.05} className="card flex gap-5 p-6">
                <Image src={t.logo} alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" unoptimized />
                <div>
                  <h3 className="font-semibold">
                    {t.name} <span className="ml-2 font-mono text-xs font-normal text-ink-3">{t.short}</span>
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{aim.byTeam[t.id]}</p>
                  <Link href={`/teams#${t.id}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
                    About the team <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">On the table</p>
            <h2 className="mt-3 text-3xl font-semibold">Problems being scoped</h2>
            <p className="mt-3 max-w-prose text-ink-2">
              These come from AIM&apos;s field staff and support hub. They are candidates, not commitments; the
              first ones get picked with AIM this semester.
            </p>
            <ul className="mt-8 space-y-6">
              {aim.areas.map((a) => (
                <li key={a.title} className="border-l-2 border-brand pl-5">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-2">{a.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">How it runs</p>
            <h2 className="mt-3 text-3xl font-semibold">Ground rules</h2>
            <ul className="mt-8 space-y-3">
              {aim.principles.map((p) => (
                <li key={p} className="flex gap-3 rounded-xl border border-line bg-paper/60 px-4 py-3 text-ink-2">
                  <i className="bi bi-check2 mt-0.5 text-brand" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-12">Being explored</p>
            <h2 className="mt-3 text-2xl font-semibold">Trips and exchanges</h2>
            <ul className="mt-5 space-y-3 text-ink-2">
              {aim.travel.map((t) => (
                <li key={t} className="flex gap-3">
                  <i className="bi bi-airplane mt-1 text-ink-3" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-3">None of these are booked yet. Ask an officer if you want in on the planning.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x flex flex-col items-start gap-6 rounded-2xl bg-brand-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold">Want to work on this?</h2>
            <p className="mt-2 text-white/75">Join a division and tell the lead you want to be on the AIM work.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/join" className="btn-inverse">Join ACM</Link>
            <Link href="/contact" className="btn-outline-inverse">Ask a question</Link>
          </div>
        </div>
      </section>
    </>
  );
}
