import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/src/components/Contact/ContactForm";
import { site } from "@/src/config/site";
import { teams } from "@/src/data/teams";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about ACM at CBU? Send a message or email a team lead.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Ask us anything.</h1>
          <p className="mt-5 max-w-prose text-lg text-ink-2">
            Not sure which team fits, can&apos;t make the meeting time, or want to run a workshop? Send it here. It
            goes to the chapter president.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-ink-3">Chapter president</dt>
              <dd>
                {site.officers[0].name} ·{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-brand hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-3">General meeting</dt>
              <dd>
                {site.meeting.when}, {site.meeting.where}
              </dd>
            </div>
            <div>
              <dt className="text-ink-3">Microsoft Teams</dt>
              <dd>
                <a href={site.teamsJoinUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand hover:underline">
                  Join the ACM team
                </a>{" "}
                <span className="text-ink-3">(the fastest way to reach everyone)</span>
              </dd>
            </div>
            <div>
              <dt className="text-ink-3">Instagram</dt>
              <dd>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-brand hover:underline">
                  @acm_cbu
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-3">Team leads</dt>
              <dd className="mt-1 space-y-1">
                {teams.map((t) => (
                  <div key={t.id}>
                    <span className="font-mono text-xs text-ink-3">{t.short}</span>{" "}
                    {t.leads.length === 0 && <span className="text-ink-3">looking for a lead</span>}
                    {t.leads.map((l, i) => (
                      <span key={l.email}>
                        {i > 0 && ", "}
                        <a href={`mailto:${l.email}`} className="text-ink-2 hover:text-brand">
                          {l.name}
                        </a>
                      </span>
                    ))}
                  </div>
                ))}
              </dd>
            </div>
          </dl>

          <p className="mt-10 text-sm text-ink-3">
            Want to join instead?{" "}
            <Link href="/join" className="font-medium text-brand underline underline-offset-2">
              Use the join form
            </Link>
            .
          </p>
        </div>

        <div className="card p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
