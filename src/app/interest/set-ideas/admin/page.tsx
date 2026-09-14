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
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/src/lib/firebase";
import { SET_IDEAS_COLLECTION, CATEGORY_OPTIONS } from "@/src/lib/setIdeasValidators";
import { buildCsv, downloadCsv } from "@/src/lib/csv";

/** The one shared admin login. Password is set in Firebase Auth, not in code. */
const ADMIN_EMAIL = "admin@acm-website-459ef.web.app";

interface IdeaSubmission {
  id: string;
  fullName: string;
  cbuEmail: string;
  ideaTitle: string;
  description: string;
  category: string;
  techInterest: string;
  involvement: string;
  submittedAt: Timestamp | null;
}

export default function SetIdeasAdminPage() {
  const [user, authLoading] = useAuthState(auth);
  const authenticated = !!user && user.email === ADMIN_EMAIL;
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ideas, setIdeas] = useState<IdeaSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  async function loadIdeas() {
    setLoading(true);
    setLoadError("");
    try {
      const q = query(collection(db, SET_IDEAS_COLLECTION), orderBy("submittedAt", "desc"));
      const snapshot = await getDocs(q);
      setIdeas(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as IdeaSubmission)
      );
    } catch (err) {
      console.error(err);
      setLoadError(
        "Could not load submissions. Make sure you are signed in with the admin account."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authenticated) loadIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    try {
      if (user && user.email !== ADMIN_EMAIL) await signOut(auth);
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
    } catch {
      setPasswordError("Incorrect password.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, SET_IDEAS_COLLECTION, id));
      setIdeas((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error(err);
      setLoadError("Could not delete that submission. Firestore rules may not allow deletes.");
    }
  }

  function handleExport() {
    const rows = filtered.map((i) => ({
      Name: i.fullName,
      Email: i.cbuEmail,
      Title: i.ideaTitle,
      Description: i.description,
      Category: i.category,
      Tech: i.techInterest,
      Involvement: i.involvement,
      Submitted: i.submittedAt ? i.submittedAt.toDate().toLocaleString() : "",
    }));
    downloadCsv("set-ideas.csv", buildCsv(rows));
  }

  const filtered =
    categoryFilter === "All" ? ideas : ideas.filter((i) => i.category === categoryFilter);

  if (authLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">Loading…</div>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h1 className="text-xl font-bold text-[#004AAD] mb-6">SET Ideas — Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#58cbf7] mb-4"
          />
          {passwordError && <p className="text-sm text-red-600 mb-4">{passwordError}</p>}
          <button
            type="submit"
            className="w-full bg-[#004AAD] text-white font-semibold py-2.5 rounded-md hover:bg-[#003a87] transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#004AAD]">
            SET Project Ideas{" "}
            <span className="text-gray-400 font-normal text-lg">({filtered.length})</span>
          </h1>
          <div className="flex flex-wrap gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-800 text-sm"
            >
              <option value="All">All categories</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={loadIdeas}
              className="px-4 py-2 border border-[#004AAD] text-[#004AAD] rounded-md text-sm font-semibold hover:bg-[#004AAD] hover:text-white transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleExport}
              disabled={filtered.length === 0}
              className="px-4 py-2 bg-[#004AAD] text-white rounded-md text-sm font-semibold hover:bg-[#003a87] disabled:opacity-50 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {loadError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3 mb-6">
            {loadError}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-[#004AAD]">{idea.ideaTitle}</h2>
                    <p className="text-sm text-gray-500">
                      {idea.fullName} — {idea.cbuEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#58cbf7]/20 text-[#004AAD] text-xs font-semibold">
                      {idea.category}
                    </span>
                    <button
                      onClick={() => handleDelete(idea.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap mb-3">{idea.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span><strong>Involvement:</strong> {idea.involvement}</span>
                  {idea.techInterest && <span><strong>Tech:</strong> {idea.techInterest}</span>}
                  {idea.submittedAt && (
                    <span><strong>Submitted:</strong> {idea.submittedAt.toDate().toLocaleString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
