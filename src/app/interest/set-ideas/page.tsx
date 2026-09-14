"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import {
  CATEGORY_OPTIONS,
  INVOLVEMENT_OPTIONS,
  initialIdeaForm,
  validateIdeaForm,
  SET_IDEAS_COLLECTION,
  type IdeaForm,
} from "@/src/lib/setIdeasValidators";

export default function SetIdeasPage() {
  const [form, setForm] = useState<IdeaForm>(initialIdeaForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof IdeaForm>(field: K, value: IdeaForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateIdeaForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await addDoc(collection(db, SET_IDEAS_COLLECTION), {
        fullName: form.fullName.trim(),
        cbuEmail: form.cbuEmail.trim(),
        ideaTitle: form.ideaTitle.trim(),
        description: form.description.trim(),
        category: form.category,
        techInterest: form.techInterest.trim(),
        involvement: form.involvement,
        submittedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong submitting your idea. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function submitAnother() {
    setForm(initialIdeaForm);
    setSubmitted(false);
    setError("");
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#58cbf7] focus:border-[#58cbf7] transition-colors";
  const labelClass = "block text-sm font-semibold text-[#004AAD] mb-1.5";

  function pillClass(active: boolean) {
    return `px-3 py-1.5 rounded-full border text-sm cursor-pointer transition-colors ${
      active
        ? "bg-[#004AAD] text-white border-[#004AAD]"
        : "bg-white text-[#004AAD] border-gray-300 hover:border-[#004AAD]"
    }`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#004AAD] py-10 px-6 text-center">
        <p className="text-[#58cbf7] font-semibold text-xs uppercase tracking-[0.3em] mb-2">
          ACM at CBU — SET Team
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
          Project Idea Submission
        </h1>
        <p className="text-white/80 text-sm mt-2 max-w-xl mx-auto">
          Got a project you&apos;d want to build with us? Tell us about it.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {submitted ? (
          <div className="text-center border border-[#58cbf7]/60 bg-white rounded-2xl p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#004AAD] mb-2">Thanks for the idea!</h2>
            <p className="text-gray-600 mb-6">
              We&apos;ll review it and reach out to you at {form.cbuEmail || "your CBU email"}.
            </p>
            <button
              type="button"
              onClick={submitAnother}
              className="px-5 py-2.5 rounded-md border border-[#004AAD] text-[#004AAD] font-semibold hover:bg-[#004AAD] hover:text-white transition-colors"
            >
              Submit another idea
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div>
              <label className={labelClass} htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                className={inputClass}
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="cbuEmail">CBU Email</label>
              <input
                id="cbuEmail"
                type="email"
                className={inputClass}
                value={form.cbuEmail}
                onChange={(e) => update("cbuEmail", e.target.value)}
                placeholder="jsmith@calbaptist.edu"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="ideaTitle">Idea Title</label>
              <input
                id="ideaTitle"
                className={inputClass}
                value={form.ideaTitle}
                onChange={(e) => update("ideaTitle", e.target.value)}
                placeholder="Campus parking tracker"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="description">What&apos;s the idea?</label>
              <textarea
                id="description"
                rows={5}
                className={`${inputClass} resize-y`}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe what it does, who it's for, and why it would be useful."
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((category) => (
                  <label key={category} className={pillClass(form.category === category)}>
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={form.category === category}
                      onChange={(e) => update("category", e.target.value)}
                      className="sr-only"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="techInterest">
                Tech you&apos;d want to use <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="techInterest"
                className={inputClass}
                value={form.techInterest}
                onChange={(e) => update("techInterest", e.target.value)}
                placeholder="React, Python, Unity — whatever you have in mind"
              />
            </div>

            <div>
              <label className={labelClass}>How do you want to be involved?</label>
              <div className="flex flex-wrap gap-2">
                {INVOLVEMENT_OPTIONS.map((option) => (
                  <label key={option} className={pillClass(form.involvement === option)}>
                    <input
                      type="radio"
                      name="involvement"
                      value={option}
                      checked={form.involvement === option}
                      onChange={(e) => update("involvement", e.target.value)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#004AAD] text-white font-semibold py-3 rounded-md hover:bg-[#003a87] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Submitting…" : "Submit Idea"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
