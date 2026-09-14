"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { site } from "@/src/config/site";

type Form = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Form>;

const validate = (f: Form): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Your name is required.";
  if (!f.email.trim()) e.email = "Email is required so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That doesn't look like an email address.";
  if (f.message.trim().length < 10) e.message = "Give us at least a sentence.";
  return e;
};

export default function ContactForm() {
  const [f, setF] = useState<Form>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (k: keyof Form, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setSubmitError("");
    try {
      await addDoc(collection(db, "messages"), {
        name: f.name.trim(),
        email: f.email.trim().toLowerCase(),
        subject: f.subject.trim(),
        message: f.message.trim(),
        createdAt: serverTimestamp(),
      });
      setDone(true);
    } catch (err) {
      console.error("Contact submit failed", err);
      setSubmitError(`We couldn't send that. Try again, or email ${site.email} directly.`);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900" role="status">
        <p className="font-semibold">Sent.</p>
        <p className="mt-1 text-sm">Someone will reply to {f.email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Name</label>
          <input id="name" className={`field ${errors.name ? "field-error" : ""}`} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input id="email" type="email" className={`field ${errors.email ? "field-error" : ""}`} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="label">
          Subject <span className="font-normal text-ink-3">(optional)</span>
        </label>
        <input id="subject" className="field" value={f.subject} onChange={(e) => set("subject", e.target.value)} />
      </div>
      <div>
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" rows={6} className={`field ${errors.message ? "field-error" : ""}`} value={f.message} onChange={(e) => set("message", e.target.value)} />
        {errors.message && <p className="error-text">{errors.message}</p>}
      </div>
      {submitError && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}
      <button type="submit" className="btn-primary" disabled={busy}>
        {busy ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
