import type { Metadata } from "next";
import Image from "next/image";
import TeamSection from "@/src/components/Teams/TeamSection";
import { teams } from "@/src/data/teams";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "ACM at CBU's four teams: competitive programming (ICPC), cyber defense (CCDC), software engineering (SET), and game design.",
};

export default function TeamsPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-x py-16 sm:py-24">
          <p className="eyebrow">Teams</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold sm:text-5xl">
            Four teams, each with its own practices, projects, and leads.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-ink-2">
            You don&apos;t have to pick right away. Most people sit in on two or three before
            committing. Jump to one below or scroll through.
          </p>
        </div>

        <nav aria-label="Teams" className="sticky top-[68px] z-30 border-y border-line bg-white/90 backdrop-blur">
          <ul className="container-x flex gap-1 overflow-x-auto py-2">
            {teams.map((t) => (
              <li key={t.id} className="shrink-0">
                <a
                  href={`#${t.id}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-ink-2 transition hover:bg-brand/8 hover:text-brand"
                >
                  <Image src={t.logo} alt="" width={20} height={20} className="h-5 w-5 object-contain" unoptimized />
                  {t.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {teams.map((t, i) => (
        <TeamSection key={t.id} team={t} index={i} />
      ))}
    </>
  );
}
