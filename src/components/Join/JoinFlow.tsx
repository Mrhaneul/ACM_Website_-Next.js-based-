"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import JoinForm, { type Application } from "./JoinForm";
import TeamsGuide from "./TeamsGuide";
import { teamById } from "@/src/data/teams";
import { site } from "@/src/config/site";

type Step = 1 | 2 | 3;

const stepMeta = [
  { n: 1, label: "About you" },
  { n: 2, label: "Set up Teams" },
  { n: 3, label: "What's next" },
];

export default function JoinFlow() {
  const params = useSearchParams();
  const initialTeam = params.get("team") ?? undefined;
  const [step, setStep] = useState<Step>(params.get("step") === "teams" ? 2 : 1);
  const [submitted, setSubmitted] = useState<Application | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <div>
      {/* Stepper */}
      <ol className="flex items-center gap-2 text-sm" aria-label="Progress">
        {stepMeta.map((s, i) => {
          const state = s.n < step ? "done" : s.n === step ? "current" : "todo";
          return (
            <li key={s.n} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => (s.n < step || (s.n === 2 && step === 1)) && setStep(s.n as Step)}
                aria-current={state === "current" ? "step" : undefined}
                className={`flex items-center gap-2 rounded-md px-2 py-1 transition ${
                  state === "current" ? "font-semibold text-ink" : state === "done" ? "text-brand hover:bg-brand/8" : "text-ink-3"
                } ${s.n === 2 && step === 1 ? "hover:bg-brand/8" : ""}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs ${
                    state === "done" ? "bg-brand text-white" : state === "current" ? "bg-ink text-white" : "border border-line text-ink-3"
                  }`}
                >
                  {state === "done" ? <i className="bi bi-check2" /> : s.n}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < stepMeta.length - 1 && <span className="h-px w-6 bg-line sm:w-10" aria-hidden />}
            </li>
          );
        })}
      </ol>

      <div className="mt-10">
        {step === 1 && (
          <section aria-labelledby="s1">
            <h2 id="s1" className="text-2xl font-semibold sm:text-3xl">Tell us about you</h2>
            <p className="mt-2 max-w-prose text-ink-2">
              This takes about two minutes. The team leads read it so they know who is coming and can pair you with a project.
              {initialTeam && teamById(initialTeam) && (
                <>
                  {" "}
                  We&apos;ve pre-checked <strong>{teamById(initialTeam)!.name}</strong> for you.
                </>
              )}
            </p>
            <p className="mt-2 text-sm text-ink-3">
              Already filled this out?{" "}
              <button type="button" onClick={() => setStep(2)} className="font-medium text-brand underline underline-offset-2">
                Skip to the Teams setup
              </button>
              .
            </p>
            <div className="mt-10">
              <JoinForm
                initialTeam={initialTeam}
                onSubmitted={(a) => {
                  setSubmitted(a);
                  setStep(2);
                }}
              />
            </div>
          </section>
        )}

        {step === 2 && (
          <section aria-labelledby="s2">
            {submitted && (
              <div className="mb-8 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
                <i className="bi bi-check-circle-fill mt-0.5 text-emerald-600" />
                <p className="text-sm">
                  Saved. Thanks, {submitted.firstName}. The next part is what gets you to a meeting.
                </p>
              </div>
            )}
            <h2 id="s2" className="text-2xl font-semibold sm:text-3xl">Get Microsoft Teams on your phone</h2>
            <p className="mt-2 max-w-prose text-ink-2">
              Meeting times, room changes, and practices are all posted in Teams. If your notifications are off you
              will miss them. This is five steps and takes about five minutes.
            </p>
            <div className="mt-10">
              <TeamsGuide />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
              <button type="button" onClick={() => setStep(3)} className="btn-primary">
                I&apos;m in Teams <i className="bi bi-arrow-right" />
              </button>
              <button type="button" onClick={() => setStep(1)} className="btn-ghost">
                Back to the form
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section aria-labelledby="s3">
            <h2 id="s3" className="text-2xl font-semibold sm:text-3xl">You are done. This is what happens next.</h2>
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: "bi-megaphone",
                  title: "Say hi in the Introductions channel",
                  text: `A name, a major, and what you're curious about is plenty. The General channel has the meeting announcements; the general meeting is ${site.meeting.when} in ${site.meeting.where}.`,
                },
                {
                  icon: "bi-people",
                  title: "A lead will reach out",
                  text: "The lead of each team you picked gets your form and will message you in Teams, usually within a few days.",
                },
                {
                  icon: "bi-door-open",
                  title: "Show up to one thing",
                  text: "Come to a practice, a meeting, or a project session. You don't need to prepare. Bring a laptop if you have one.",
                },
              ].map((x) => (
                <li key={x.title} className="card flex gap-4 p-5">
                  <i className={`bi ${x.icon} text-xl text-brand`} />
                  <div>
                    <p className="font-semibold">{x.title}</p>
                    <p className="mt-1 text-ink-2">{x.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={site.linktree} className="btn-primary">
                <i className="bi bi-microsoft-teams" /> Join ACM on Teams
              </Link>
              <Link href="/teams" className="btn-secondary">
                Read about the teams
              </Link>
              <Link href="/contact" className="btn-ghost">
                Ask a question
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
