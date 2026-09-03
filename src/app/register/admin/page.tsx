"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { registrationDb, REGISTRATIONS_COLLECTION } from "@/src/lib/firebase-registration";
import { buildCsv, downloadCsv } from "@/src/lib/csv";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_REG_ADMIN_PASSWORD;
const TEAM_OPTIONS = ["SET", "NCCDC", "ICPC", "Game Design", "Undecided"];

interface Registration {
  id: string;
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
  submittedAt: Timestamp | null;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password.");
    }
  }

  useEffect(() => {
    if (!authenticated) return;

    async function fetchRegistrations() {
      setLoading(true);
      try {
        const q = query(
          collection(registrationDb, REGISTRATIONS_COLLECTION),
          orderBy("submittedAt", "desc")
        );
        const snapshot = await getDocs(q);
        setRegistrations(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Registration))
        );
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRegistrations();
  }, [authenticated]);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this registration?")) return;
    try {
      await deleteDoc(doc(registrationDb, REGISTRATIONS_COLLECTION, id));
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }

  function handleExportCsv() {
    const rows = registrations.map((r) => ({
      fullName: r.fullName,
      cbuEmail: r.cbuEmail,
      cbuId: r.cbuId,
      major: r.major,
      classYear: r.classYear,
      teams: r.teams,
      otherInterest: r.otherInterest,
      missionInterest: r.missionInterest,
      aiCoding: r.aiCoding,
      techExperience: r.techExperience,
      techExperienceDetail: r.techExperienceDetail,
      submittedAt: r.submittedAt ? r.submittedAt.toDate().toISOString() : "",
    }));
    const csv = buildCsv(rows);
    downloadCsv(`registrations-${Date.now()}.csv`, csv);
  }

  const teamCounts = TEAM_OPTIONS.reduce<Record<string, number>>((acc, team) => {
    acc[team] = registrations.filter((r) => r.teams?.includes(team)).length;
    return acc;
  }, {});

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#004AAD] py-10 px-6 text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
            ACM Registration — Admin
          </h1>
        </div>
        <div className="max-w-sm mx-auto px-6 py-16">
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-4">
            <h2 className="text-xl font-bold text-[#004AAD] text-center">Admin Access</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#58cbf7]"
            />
            {passwordError && <p className="text-red-700 text-sm">{passwordError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#004AAD] text-white font-semibold rounded-full hover:bg-[#58cbf7] transition-colors cursor-pointer"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#004AAD] py-10 px-6 text-center">
        <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
          ACM Registration — Admin
        </h1>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#004AAD]">
            Registrations ({registrations.length})
          </h2>
          <button
            onClick={handleExportCsv}
            disabled={registrations.length === 0}
            className="px-4 py-2 bg-[#58cbf7] text-[#004AAD] font-semibold rounded-full hover:bg-[#004AAD] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {TEAM_OPTIONS.map((team) => (
            <div key={team} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-[#004AAD]">{teamCounts[team]}</p>
              <p className="text-xs text-gray-500 mt-1">{team}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading…</p>
        ) : registrations.length === 0 ? (
          <p className="text-center text-gray-500">No registrations yet.</p>
        ) : (
          <div className="space-y-3">
            {registrations.map((r) => (
              <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#004AAD]">{r.fullName}</p>
                  <p className="text-sm text-gray-600">{r.cbuEmail} • {r.cbuId}</p>
                  <p className="text-sm text-gray-600">{r.major} — {r.classYear}</p>
                  {r.teams?.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">Teams: {r.teams.join(", ")}</p>
                  )}
                  {r.otherInterest && (
                    <p className="text-sm text-gray-600">Other: {r.otherInterest}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    Mission: {r.missionInterest} • AI coding: {r.aiCoding} • Tech: {r.techExperience}
                  </p>
                  {r.techExperienceDetail && (
                    <p className="text-sm text-gray-500 italic mt-1">{r.techExperienceDetail}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-gray-400 hover:text-red-600 text-sm transition-colors self-start cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
