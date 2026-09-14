import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/src/components/ui/Reveal";
import { teams } from "@/src/data/teams";
import { site } from "@/src/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "What ACM at California Baptist University is, what it does, and who runs it.",
};

export default function AboutPage() {
  const leads = teams.flatMap((t) => t.leads.map((l) => ({ ...l, team: t.short })));
  // The same person can lead two teams; show them once.
  const uniqueLeads = leads.filter((l, i) => leads.findIndex((m) => m.name === l.name) === i);

  return (
    <>
      <section className="bg-white">
        <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[3fr_2fr] lg:items-end">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
              A student chapter of the oldest computing society in the world.
            </h1>
          </div>
          <p className="max-w-prose text-lg text-ink-2">
            The Association for Computing Machinery was founded in 1947. Our chapter at {site.university} is
            much younger and much smaller. It exists so computing students here have a place to build things
            together outside of class.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20">
          <Reveal className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold">Who we are</h2>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">
                Students who like computers, at every level. Some of us came in with years of programming and
                some had never opened a terminal. The chapter is organized around four teams because people
                learn best working on one specific thing with one specific group toward a deadline.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">What we do</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Compete", "ICPC programming contests and the Collegiate Cyber Defense Competition."],
                  ["Build", "Real software, including this site and campus AI tools, with code review and deadlines."],
                  ["Make games", "Game jams and longer projects across code, art, music, and writing."],
                  ["Meet people", "Tech talks, study sessions, and the group project partners you will keep for four years."],
                ].map(([t, d]) => (
                  <li key={t} className="rounded-xl border border-line bg-white p-4">
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1 text-sm text-ink-2">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">When we meet</h2>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">
                The general meeting is {site.meeting.when} in {site.meeting.where}. Each team also runs its own
                practices; those times are posted in the team&apos;s channel on Microsoft Teams.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Our mission</h2>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">
                To foster a community of learners and innovators who advance computing while integrating
                Christian values in their professional and academic pursuits.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <Image
              src="/about_img1.png"
              alt="The atrium of the engineering building at CBU"
              width={479}
              height={715}
              className="w-full rounded-2xl object-cover shadow-[0_30px_60px_-30px_rgba(11,31,68,0.45)]"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 text-3xl font-semibold">Who to talk to</h2>
            <p className="mt-3 max-w-prose text-ink-2">
              Officers and team leads are students. Email any of them or use the contact form and a person will answer.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {site.officers.map((o, i) => (
              <Reveal as="li" key={o.email} delay={i * 0.04} className="card flex items-center gap-4 border border-brand/20 p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand font-semibold text-white">
                  {o.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="font-medium">{o.name}</p>
                  <p className="text-sm text-ink-3">{o.role}</p>
                </div>
                <a
                  href={`mailto:${o.email}`}
                  aria-label={`Email ${o.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-3 transition hover:bg-brand/8 hover:text-brand"
                >
                  <i className="bi bi-envelope" />
                </a>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.08} className="card flex items-center gap-4 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-semibold text-ink-2">
                {site.advisor.name
                  .replace("Prof. ", "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="font-medium">{site.advisor.name}</p>
                <p className="text-sm text-ink-3">{site.advisor.role}</p>
              </div>
            </Reveal>
            {uniqueLeads.map((l, i) => (
              <Reveal as="li" key={l.email} delay={i * 0.04} className="card flex items-center gap-4 p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/8 font-semibold text-brand">
                  {l.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-sm text-ink-3">
                    {leads
                      .filter((m) => m.name === l.name)
                      .map((m) => m.team)
                      .join(" · ")}{" "}
                    · {l.role}
                  </p>
                </div>
                <a
                  href={`mailto:${l.email}`}
                  aria-label={`Email ${l.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-3 transition hover:bg-brand/8 hover:text-brand"
                >
                  <i className="bi bi-envelope" />
                </a>
              </Reveal>
            ))}
            {teams
              .filter((t) => t.leads.length === 0)
              .map((t) => (
                <Reveal as="li" key={t.id} className="flex items-center gap-4 rounded-2xl border border-dashed border-line p-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-ink-3">
                    <i className="bi bi-person-plus" />
                  </span>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="font-medium">{t.short} lead: open</p>
                    <p className="text-sm text-ink-3">Interested? Email the president.</p>
                  </div>
                </Reveal>
              ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x flex flex-col items-start gap-6 rounded-2xl bg-brand-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-semibold">There is room for you whether or not you have experience.</h2>
            <p className="mt-2 text-white/75">Fill out the form and we will take it from there.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/join" className="btn-inverse">Join ACM</Link>
            <Link href="/teams" className="btn-outline-inverse">The teams</Link>
          </div>
        </div>
      </section>
    </>
  );
}
