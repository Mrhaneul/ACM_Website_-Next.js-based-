import Image from "next/image";
import Link from "next/link";
import Reveal from "@/src/components/ui/Reveal";
import type { Team } from "@/src/data/teams";
import { site } from "@/src/config/site";

export default function TeamSection({ team, index }: { team: Team; index: number }) {
  return (
    <section id={team.id} className="scroll-mt-28 border-t border-line py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgba(11,31,68,0.3)]">
            <Image src={team.logo} alt="" width={64} height={64} className="h-14 w-14 object-contain" unoptimized />
          </div>
          <div>
            <p className="eyebrow">
              0{index + 1} · {team.short}
            </p>
            <h2 className="mt-1 text-3xl font-semibold sm:text-4xl">{team.name}</h2>
            <p className="mt-1 text-ink-3">{team.tagline}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <Reveal>
            <div className="space-y-4 text-lg leading-relaxed text-ink-2">
              {team.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-ink-3">What you&apos;ll learn</h3>
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {team.skills.map((s) => (
                <li key={s} className="flex gap-3 text-ink-2">
                  <i className="bi bi-check2 mt-0.5 text-brand" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="space-y-5">
            <dl className="card divide-y divide-line">
              {team.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 px-5 py-4">
                  <dt className="text-sm text-ink-3">{f.label}</dt>
                  <dd className="text-right text-sm font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            {team.highlight && (
              <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5">
                <p className="eyebrow">{team.highlight.label}</p>
                <p className="mt-2 leading-relaxed text-ink-2">{team.highlight.text}</p>
              </div>
            )}
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-3">Leads</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {team.leads.map((l) => (
              <li key={l.email} className="card flex items-center gap-4 px-4 py-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/8 font-semibold text-brand">
                  {l.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="leading-tight">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-sm text-ink-3">
                    {l.role}
                    {l.classOf ? ` · Class of ${l.classOf}` : ""}
                  </p>
                </div>
                <a
                  href={`mailto:${l.email}`}
                  aria-label={`Email ${l.name}`}
                  className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-ink-3 transition hover:bg-brand/8 hover:text-brand"
                >
                  <i className="bi bi-envelope" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 flex flex-col gap-5 rounded-2xl bg-brand-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <p className="font-semibold">How to join {team.short}</p>
            <p className="mt-1 text-white/75">{team.joinNote}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href={`/join?team=${team.id}`} className="btn-inverse">
              Join through the form
            </Link>
            <a href={site.teamsJoinUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-inverse">
              <i className="bi bi-microsoft-teams" /> Open in Teams
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
