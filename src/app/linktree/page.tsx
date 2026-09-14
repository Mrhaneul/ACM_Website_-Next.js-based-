import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Links",
  description: "Every ACM at CBU link in one place: Microsoft Teams, the join form, Instagram, and email.",
};

const links = [
  {
    href: "https://teams.microsoft.com/",
    external: true,
    icon: "bi-microsoft-teams",
    title: "Microsoft Teams",
    text: `Join with code ${site.teamsJoinCode}`,
  },
  { href: "/join", external: false, icon: "bi-person-plus", title: "Join form", text: "Two minutes, no experience needed" },
  { href: site.instagram, external: true, icon: "bi-instagram", title: "Instagram", text: "@acm_cbu" },
  { href: `mailto:${site.email}`, external: true, icon: "bi-envelope", title: "Email the president", text: site.email },
  { href: "/teams", external: false, icon: "bi-diagram-3", title: "The teams", text: "ICPC, Cyber Defense, SET, Game Design" },
];

export default function LinktreePage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x max-w-md">
        <div className="flex flex-col items-center text-center">
          <Image src="/acm.png" alt="" width={72} height={72} className="h-18 w-18" unoptimized />
          <h1 className="mt-4 text-2xl font-semibold">ACM at CBU</h1>
          <p className="mt-1 text-ink-3">
            General meeting {site.meeting.when}, {site.meeting.where}
          </p>
        </div>

        <ul className="mt-10 space-y-3">
          {links.map((l) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/8 text-lg text-brand">
                  <i className={`bi ${l.icon}`} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block font-medium">{l.title}</span>
                  <span className="block truncate text-sm text-ink-3">{l.text}</span>
                </span>
                <i className="bi bi-arrow-right text-ink-3" />
              </>
            );
            const cls = "card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lg";
            return (
              <li key={l.title}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={l.href} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 rounded-2xl border border-brand/20 bg-brand/5 p-5 text-center">
          <p className="text-sm text-ink-3">Teams join code</p>
          <p className="mt-1 font-mono text-3xl font-semibold tracking-widest text-brand">{site.teamsJoinCode}</p>
          <p className="mt-2 text-sm text-ink-2">
            In Teams: Teams → Join a team with a code.{" "}
            <Link href="/join?step=teams" className="font-medium text-brand underline underline-offset-2">
              Step-by-step guide
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
