import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Links",
  description: "Every ACM | TEC link in one place: Microsoft Teams setup, registration, Instagram, and the website.",
};

const links = [
  { href: "/join?step=teams", external: false, icon: "bi-microsoft-teams", title: "Join our Teams", text: "Install, sign in, join, turn on notifications" },
  { href: "/join", external: false, icon: "bi-clipboard-check", title: "Register", text: "Two minutes, then Teams setup" },
  { href: site.instagram, external: true, icon: "bi-instagram", title: "Instagram", text: "@acm_cbu" },
  { href: "/", external: false, icon: "bi-globe2", title: "ACM website", text: "Teams, the AIM partnership, contact" },
  { href: `mailto:${site.email}`, external: true, icon: "bi-envelope", title: "Email the president", text: site.email },
];

export default function LinktreePage() {
  return (
    <section className="relative isolate min-h-dvh overflow-hidden bg-brand-ink px-5 py-14 text-white sm:py-20">
      <div className="grain absolute inset-0" />
      <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-brand/60 blur-3xl" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Image src="/acm.png" alt="" width={80} height={80} className="h-20 w-20 rounded-2xl bg-white p-2 shadow-lg" unoptimized />
          <h1 className="mt-5 text-2xl font-semibold">ACM | TEC</h1>
          <p className="mt-1 text-sm text-white/70">CBU&apos;s student chapter of the ACM</p>
          <p className="mt-3 text-sm text-white/80">
            General meeting {site.meeting.when}
            <br />
            {site.meeting.where}
          </p>
        </div>

        <ul className="mt-10 space-y-3">
          {links.map((l) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-lg text-brand">
                  <i className={`bi ${l.icon}`} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block font-semibold">{l.title}</span>
                  <span className="block truncate text-sm text-ink-3">{l.text}</span>
                </span>
                <i className="bi bi-arrow-right text-ink-3" />
              </>
            );
            const cls =
              "flex items-center gap-4 rounded-2xl bg-white p-4 text-ink shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 active:translate-y-0";
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
      </div>
    </section>
  );
}
