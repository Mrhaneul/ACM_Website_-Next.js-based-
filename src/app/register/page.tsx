"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { registrationDb, REGISTRATIONS_COLLECTION } from "@/src/lib/firebase-registration";
import { isValidCbuEmail, isValidCbuId } from "@/src/lib/registrationValidators";

const TEAM_OPTIONS = ["SET", "NCCDC", "ICPC", "Game Design", "Undecided"];
const CLASS_YEARS = ["Freshman", "Sophomore", "Junior", "Senior", "Grad Student", "Other"];
const YES_NO_MAYBE = ["Yes", "No", "Maybe"];
const TECH_LEVELS = ["None", "Beginner", "Intermediate", "Advanced"];

interface RegistrationForm {
  fullName: string;
  cbuEmail: string;
  cbuId: string;
  major: string;
  classYear: string;
  teams: string[];
  otherInterest: string;
  missionInterest: string;
  aiCoding: string;
  techExperience: string;
  techExperienceDetail: string;
}

const initialState: RegistrationForm = {
  fullName: "",
  cbuEmail: "",
  cbuId: "",
  major: "",
  classYear: "",
  teams: [],
  otherInterest: "",
  missionInterest: "",
  aiCoding: "",
  techExperience: "",
  techExperienceDetail: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState<RegistrationForm>(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleTeam(team: string) {
    setForm((prev) => ({
      ...prev,
      teams: prev.teams.includes(team)
        ? prev.teams.filter((t) => t !== team)
        : [...prev.teams, team],
    }));
  }

  function validate(): string {
    if (!form.fullName.trim()) return "Please enter your full name.";
    if (!isValidCbuEmail(form.cbuEmail)) return "Please enter a valid @calbaptist.edu email address.";
    if (!isValidCbuId(form.cbuId)) return "CBU ID must contain digits only.";
    if (!form.major.trim()) return "Please enter your major.";
    if (!form.classYear) return "Please select your class year.";
    if (!form.missionInterest) return "Please answer the mission work question.";
    if (!form.aiCoding) return "Please answer the AI coding question.";
    if (!form.techExperience) return "Please select your technical experience level.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await addDoc(collection(registrationDb, REGISTRATIONS_COLLECTION), {
        fullName: form.fullName.trim(),
        cbuEmail: form.cbuEmail.trim(),
        cbuId: form.cbuId.trim(),
        major: form.major.trim(),
        classYear: form.classYear,
        teams: form.teams,
        otherInterest: form.otherInterest.trim(),
        missionInterest: form.missionInterest,
        aiCoding: form.aiCoding,
        techExperience: form.techExperience,
        techExperienceDetail: form.techExperienceDetail.trim(),
        submittedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong submitting your registration. Please try again.");
    } finally {
      setLoading(false);
    }
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
          California Baptist University
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
          ACM Registration
        </h1>
        <p className="text-white/80 text-sm mt-2">
          Association for Computing Machinery — Student Chapter
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {submitted ? (
          <div className="text-center border border-[#58cbf7]/60 bg-white rounded-2xl p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#004AAD] mb-2">Thanks for registering!</h2>
            <p className="text-gray-600">We&apos;re excited to connect with you at the club fair.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
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
              <label className={labelClass} htmlFor="cbuId">CBU ID Number</label>
              <input
                id="cbuId"
                className={inputClass}
                value={form.cbuId}
                onChange={(e) => update("cbuId", e.target.value)}
                placeholder="123456789"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="major">Major</label>
              <input
                id="major"
                className={inputClass}
                value={form.major}
                onChange={(e) => update("major", e.target.value)}
                placeholder="Computer Science"
              />
            </div>

            <div>
              <label className={labelClass}>Class Year</label>
              <div className="flex flex-wrap gap-2">
                {CLASS_YEARS.map((year) => (
                  <label key={year} className={pillClass(form.classYear === year)}>
                    <input
                      type="radio"
                      name="classYear"
                      value={year}
                      checked={form.classYear === year}
                      onChange={(e) => update("classYear", e.target.value)}
                      className="sr-only"
                    />
                    {year}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Team Interest (select any)</label>
              <div className="flex flex-wrap gap-2">
                {TEAM_OPTIONS.map((team) => (
                  <label key={team} className={pillClass(form.teams.includes(team))}>
                    <input
                      type="checkbox"
                      checked={form.teams.includes(team)}
                      onChange={() => toggleTeam(team)}
                      className="sr-only"
                    />
                    {team}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="otherInterest">Other Interest (optional)</label>
              <input
                id="otherInterest"
                className={inputClass}
                value={form.otherInterest}
                onChange={(e) => update("otherInterest", e.target.value)}
                placeholder="Anything else you're interested in?"
              />
            </div>

            <div>
              <label className={labelClass}>Open to mission work?</label>
              <div className="flex gap-2">
                {YES_NO_MAYBE.map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 text-center py-2 rounded-md border text-sm cursor-pointer transition-colors ${
                      form.missionInterest === opt
                        ? "bg-[#004AAD] text-white border-[#004AAD]"
                        : "bg-white text-[#004AAD] border-gray-300 hover:border-[#004AAD]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="missionInterest"
                      value={opt}
                      checked={form.missionInterest === opt}
                      onChange={(e) => update("missionInterest", e.target.value)}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Have you used AI to code?</label>
              <div className="flex gap-2">
                {YES_NO_MAYBE.map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 text-center py-2 rounded-md border text-sm cursor-pointer transition-colors ${
                      form.aiCoding === opt
                        ? "bg-[#004AAD] text-white border-[#004AAD]"
                        : "bg-white text-[#004AAD] border-gray-300 hover:border-[#004AAD]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="aiCoding"
                      value={opt}
                      checked={form.aiCoding === opt}
                      onChange={(e) => update("aiCoding", e.target.value)}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Technical Experience Level</label>
              <div className="flex flex-wrap gap-2">
                {TECH_LEVELS.map((level) => (
                  <label key={level} className={pillClass(form.techExperience === level)}>
                    <input
                      type="radio"
                      name="techExperience"
                      value={level}
                      checked={form.techExperience === level}
                      onChange={(e) => update("techExperience", e.target.value)}
                      className="sr-only"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="techExperienceDetail">
                Technical Experience Details (optional)
              </label>
              <textarea
                id="techExperienceDetail"
                className={inputClass}
                rows={3}
                value={form.techExperienceDetail}
                onChange={(e) => update("techExperienceDetail", e.target.value)}
                placeholder="Languages, projects, anything you'd like to share"
              />
            </div>

            {error && (
              <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-md p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#004AAD] text-white font-semibold rounded-full hover:bg-[#58cbf7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading ? "Submitting…" : "Submit Registration"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
