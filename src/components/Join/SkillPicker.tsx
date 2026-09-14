"use client";

import { useMemo, useState } from "react";
import { skillGroups } from "@/src/data/skills";

type Props = {
  id: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

const norm = (s: string) => s.trim().toLowerCase();

/**
 * LinkedIn-style skill picker: type to filter, click chips to toggle, add a
 * custom entry when nothing matches. Selected skills float to the top.
 */
export default function SkillPicker({ id, value, onChange, placeholder }: Props) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string>("all");

  const selected = useMemo(() => new Set(value.map(norm)), [value]);

  const filtered = useMemo(() => {
    const needle = norm(q);
    return skillGroups
      .filter((g) => group === "all" || g.id === group)
      .map((g) => ({
        ...g,
        skills: g.skills.filter((s) => !needle || norm(s).includes(needle)),
      }))
      .filter((g) => g.skills.length > 0);
  }, [q, group]);

  const exactMatch = useMemo(() => {
    const needle = norm(q);
    return needle && skillGroups.some((g) => g.skills.some((s) => norm(s) === needle));
  }, [q]);

  const toggle = (skill: string) => {
    if (selected.has(norm(skill))) {
      onChange(value.filter((v) => norm(v) !== norm(skill)));
    } else {
      onChange([...value, skill]);
    }
  };

  const addCustom = () => {
    const s = q.trim();
    if (!s || selected.has(norm(s))) return;
    onChange([...value, s]);
    setQ("");
  };

  return (
    <div className="rounded-xl border border-line bg-paper/60 p-3 sm:p-4">
      {value.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-2" aria-label="Selected skills">
          {value.map((s) => (
            <li key={s}>
              <button type="button" onClick={() => toggle(s)} className="chip chip-on" aria-label={`Remove ${s}`}>
                {s}
                <i className="bi bi-x-lg text-[0.65rem]" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative">
        <i className="bi bi-search pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
        <input
          id={id}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (!exactMatch) addCustom();
            }
          }}
          placeholder={placeholder ?? "Search skills, e.g. Python, Unity, Wireshark"}
          className="field !pl-10"
          autoComplete="off"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Skill categories">
        {[{ id: "all", label: "All" }, ...skillGroups].map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={group === g.id}
            onClick={() => setGroup(g.id)}
            className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition ${
              group === g.id ? "bg-ink text-white" : "text-ink-3 hover:bg-white hover:text-ink"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="mt-3 max-h-64 space-y-4 overflow-y-auto pr-1">
        {filtered.map((g) => (
          <div key={g.id}>
            {group === "all" && <p className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-3">{g.label}</p>}
            <div className="flex flex-wrap gap-1.5">
              {g.skills.map((s) => {
                const on = selected.has(norm(s));
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(s)}
                    aria-pressed={on}
                    className={`chip ${on ? "chip-on" : ""}`}
                  >
                    {on && <i className="bi bi-check2 text-xs" />}
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && q.trim() && (
          <div className="py-2 text-sm text-ink-3">
            No match for &quot;{q.trim()}&quot;.
          </div>
        )}
        {q.trim() && !exactMatch && !selected.has(norm(q)) && (
          <button type="button" onClick={addCustom} className="chip border-dashed">
            <i className="bi bi-plus-lg text-xs" /> Add &quot;{q.trim()}&quot;
          </button>
        )}
      </div>
    </div>
  );
}
