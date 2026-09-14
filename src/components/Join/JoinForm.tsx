"use client";

import { useState } from "react";
import Image from "next/image";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { teams } from "@/src/data/teams";
import { experienceLevels, majors, years } from "@/src/data/skills";
import SkillPicker from "./SkillPicker";

export type Application = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  year: string;
  major: string;
  majorOther: string;
  teams: string[];
  experience: string;
  skills: string[];
  wantToLearn: string[];
  notes: string;
};

const empty = (initialTeam?: string): Application => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  year: "Freshman",
  major: "",
  majorOther: "",
  teams: initialTeam && teams.some((t) => t.id === initialTeam) ? [initialTeam] : [],
  experience: "",
  skills: [],
  wantToLearn: [],
  notes: "",
});

type Errors = Partial<Record<keyof Application, string>>;

const validate = (a: Application): Errors => {
  const e: Errors = {};
  if (!a.firstName.trim()) e.firstName = "First name is required.";
  if (!a.lastName.trim()) e.lastName = "Last name is required.";
  if (!a.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim())) e.email = "That doesn't look like an email address.";
  if (a.phone && !/^[\d\s()+.-]{7,}$/.test(a.phone)) e.phone = "Digits, spaces, and dashes only.";
  if (!a.major) e.major = "Pick a major (or Other).";
  if (a.major === "Other / Undecided" && !a.majorOther.trim()) e.majorOther = "Tell us what you're studying, or type Undecided.";
  if (!a.experience) e.experience = "Pick whichever fits best. There is no wrong answer.";
  return e;
};

export default function JoinForm({
  initialTeam,
  onSubmitted,
}: {
  initialTeam?: string;
  onSubmitted: (a: Application) => void;
}) {
  const [a, setA] = useState<Application>(() => empty(initialTeam));
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = <K extends keyof Application>(k: K, v: Application[K]) => {
    setA((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const toggleTeam = (id: string) =>
    set("teams", a.teams.includes(id) ? a.teams.filter((t) => t !== id) : [...a.teams, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(a);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      const el = document.getElementById(first);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) el.focus({ preventScroll: true });
      return;
    }

    setBusy(true);
    setSubmitError("");
    try {
      await addDoc(collection(db, "applications"), {
        ...a,
        firstName: a.firstName.trim(),
        lastName: a.lastName.trim(),
        email: a.email.trim().toLowerCase(),
        phone: a.phone.trim(),
        major: a.major === "Other / Undecided" ? a.majorOther.trim() : a.major,
        notes: a.notes.trim(),
        source: "website",
        createdAt: serverTimestamp(),
      });
      onSubmitted(a);
    } catch (err) {
      console.error("Application submit failed", err);
      setSubmitError("We couldn't save your form. Check your connection and try again, or email us instead.");
    } finally {
      setBusy(false);
    }
  };

  const fieldCls = (k: keyof Application) => `field ${errors[k] ? "field-error" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12">
      {/* Basics */}
      <fieldset>
        <legend className="text-lg font-semibold">The basics</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="label">First name</label>
            <input id="firstName" className={fieldCls("firstName")} value={a.firstName} onChange={(e) => set("firstName", e.target.value)} autoComplete="given-name" />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="label">Last name</label>
            <input id="lastName" className={fieldCls("lastName")} value={a.lastName} onChange={(e) => set("lastName", e.target.value)} autoComplete="family-name" />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" type="email" className={fieldCls("email")} value={a.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@calbaptist.edu" />
            {errors.email ? <p className="error-text">{errors.email}</p> : <p className="help">Use your CBU email if you can, since that is the one Teams uses.</p>}
          </div>
          <div>
            <label htmlFor="phone" className="label">
              Phone <span className="font-normal text-ink-3">(optional)</span>
            </label>
            <input id="phone" type="tel" className={fieldCls("phone")} value={a.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="year" className="label">Year</label>
            <select id="year" className="field" value={a.year} onChange={(e) => set("year", e.target.value)}>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="major" className="label">Major</label>
            <select id="major" className={fieldCls("major")} value={a.major} onChange={(e) => set("major", e.target.value)}>
              <option value="">Choose one</option>
              {majors.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            {errors.major && <p className="error-text">{errors.major}</p>}
          </div>
          {a.major === "Other / Undecided" && (
            <div className="sm:col-span-2">
              <label htmlFor="majorOther" className="label">What are you studying?</label>
              <input id="majorOther" className={fieldCls("majorOther")} value={a.majorOther} onChange={(e) => set("majorOther", e.target.value)} placeholder="Or just: Undecided" />
              {errors.majorOther && <p className="error-text">{errors.majorOther}</p>}
            </div>
          )}
        </div>
      </fieldset>

      {/* Teams */}
      <fieldset>
        <legend className="text-lg font-semibold">Which teams sound interesting?</legend>
        <p className="mt-1 text-sm text-ink-3">Pick as many as you want. If you have no idea yet, skip it and decide after you sit in on a few.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {teams.map((t) => {
            const on = a.teams.includes(t.id);
            return (
              <label
                key={t.id}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                  on ? "border-brand bg-brand/5 ring-4 ring-brand/10" : "border-line bg-white hover:border-brand/40"
                }`}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleTeam(t.id)} />
                <Image src={t.logo} alt="" width={40} height={40} className="h-10 w-10 shrink-0 object-contain" unoptimized />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-medium">
                    {t.name}
                    <span className="font-mono text-xs text-ink-3">{t.short}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-3">{t.summary}</span>
                </span>
                <span
                  className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    on ? "border-brand bg-brand text-white" : "border-line"
                  }`}
                  aria-hidden
                >
                  {on && <i className="bi bi-check2 text-xs" />}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Experience */}
      <fieldset id="experience">
        <legend className="text-lg font-semibold">Where are you starting from?</legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {experienceLevels.map((lvl) => {
            const on = a.experience === lvl.id;
            return (
              <label
                key={lvl.id}
                className={`cursor-pointer rounded-xl border p-4 transition ${
                  on ? "border-brand bg-brand/5 ring-4 ring-brand/10" : "border-line bg-white hover:border-brand/40"
                }`}
              >
                <input type="radio" name="experience" className="sr-only" checked={on} onChange={() => set("experience", lvl.id)} />
                <span className="block font-medium">{lvl.label}</span>
                <span className="mt-1 block text-sm text-ink-3">{lvl.help}</span>
              </label>
            );
          })}
        </div>
        {errors.experience && <p className="error-text">{errors.experience}</p>}
      </fieldset>

      {/* Skills */}
      <fieldset>
        <legend className="text-lg font-semibold">Skills you already have</legend>
        <p className="mt-1 text-sm text-ink-3">
          Search or browse and click what applies. &quot;Have&quot; means you've used it at all, not that you're an expert. It's fine to leave this empty.
        </p>
        <div className="mt-4">
          <SkillPicker id="skills" value={a.skills} onChange={(v) => set("skills", v)} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold">Things you want to learn</legend>
        <p className="mt-1 text-sm text-ink-3">We use this to match you with a team and a project, so list everything you are curious about.</p>
        <div className="mt-4">
          <SkillPicker id="wantToLearn" value={a.wantToLearn} onChange={(v) => set("wantToLearn", v)} placeholder="Search, e.g. React, penetration testing, Unity" />
        </div>
      </fieldset>

      <div>
        <label htmlFor="notes" className="label">
          Anything else? <span className="font-normal text-ink-3">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={4}
          className="field"
          value={a.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="A project you've built, a question, a schedule conflict, anything that helps."
        />
      </div>

      {submitError && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? (
            <>
              <i className="bi bi-arrow-repeat animate-spin" /> Saving
            </>
          ) : (
            <>
              Submit and continue <i className="bi bi-arrow-right" />
            </>
          )}
        </button>
        <p className="text-sm text-ink-3">The next step is getting Teams on your phone.</p>
      </div>
    </form>
  );
}
