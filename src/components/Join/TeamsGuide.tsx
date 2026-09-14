"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/src/config/site";

type Device = "ios" | "android" | "desktop";

const devices: { id: Device; label: string; icon: string }[] = [
  { id: "ios", label: "iPhone", icon: "bi-apple" },
  { id: "android", label: "Android", icon: "bi-android2" },
  { id: "desktop", label: "Computer", icon: "bi-laptop" },
];

type Step = {
  title: string;
  body: Record<Device, React.ReactNode>;
  action?: Partial<Record<Device, { label: string; href: string }>>;
};

const Code = () => (
  <code className="rounded-md bg-brand/8 px-1.5 py-0.5 font-mono text-[0.95em] font-semibold text-brand">{site.teamsJoinCode}</code>
);

const steps: Step[] = [
  {
    title: "Install Microsoft Teams",
    body: {
      ios: <>Get the app from the App Store. It&apos;s just called <strong>Microsoft Teams</strong>. Open it once so it can ask about notifications; tap <strong>Allow</strong>.</>,
      android: <>Get <strong>Microsoft Teams</strong> from Google Play. Open it once so it can ask about notifications; tap <strong>Allow</strong>.</>,
      desktop: <>Download the desktop app, or skip the install and use Teams in your browser. The desktop app is better at notifications.</>,
    },
    action: {
      ios: { label: "App Store", href: site.teamsIos },
      android: { label: "Google Play", href: site.teamsAndroid },
      desktop: { label: "Download Teams", href: site.teamsDesktop },
    },
  },
  {
    title: "Sign in with your CBU account",
    body: {
      ios: <>Use your <strong>@calbaptist.edu</strong> email and the same password as your CBU email. If it asks which kind of account, pick <strong>Work or school</strong>.</>,
      android: <>Use your <strong>@calbaptist.edu</strong> email and the same password as your CBU email. If it asks which kind of account, pick <strong>Work or school</strong>.</>,
      desktop: <>Use your <strong>@calbaptist.edu</strong> email and the same password as your CBU email. If it asks which kind of account, pick <strong>Work or school</strong>.</>,
    },
  },
  {
    title: "Join the ACM team",
    body: {
      ios: (
        <>
          Tap <strong>Teams</strong> at the bottom, then the <strong>⋯</strong> or <strong>+</strong> in the top corner →{" "}
          <strong>Join a team with a code</strong>. Enter <Code /> and tap <strong>Join</strong>. Or tap the button below and it opens straight in the app.
        </>
      ),
      android: (
        <>
          Tap <strong>Teams</strong> at the bottom, then the <strong>⋯</strong> or <strong>+</strong> in the top corner →{" "}
          <strong>Join a team with a code</strong>. Enter <Code /> and tap <strong>Join</strong>. Or tap the button below and it opens straight in the app.
        </>
      ),
      desktop: (
        <>
          Click <strong>Teams</strong> in the left sidebar → <strong>Join or create a team</strong> (bottom left) →{" "}
          <strong>Join a team with a code</strong>. Enter <Code /> and click <strong>Join</strong>. The team then shows up in the sidebar.
        </>
      ),
    },
    action: {
      ios: { label: "Open ACM in Teams", href: site.teamsJoinUrl },
      android: { label: "Open ACM in Teams", href: site.teamsJoinUrl },
      desktop: { label: "Open ACM in Teams", href: site.teamsJoinUrl },
    },
  },
  {
    title: "Turn notifications on",
    body: {
      ios: (
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>In Teams, tap your <strong>profile picture</strong> (top left) → <strong>Notifications</strong>.</li>
          <li>Set <strong>Send notifications</strong> to <strong>Always</strong>, not &quot;only when inactive on desktop.&quot;</li>
          <li>Make sure <strong>Chats</strong>, <strong>Mentions</strong>, and <strong>Channels</strong> are on.</li>
          <li>Check <strong>Quiet hours</strong> isn&apos;t blocking evenings; most meetings are after class.</li>
          <li>If nothing comes through, go to iPhone <strong>Settings → Notifications → Teams</strong> and turn on Allow Notifications.</li>
        </ol>
      ),
      android: (
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>In Teams, tap your <strong>profile picture</strong> (top left) → <strong>Notifications</strong>.</li>
          <li>Set <strong>Send notifications</strong> to <strong>Always</strong>, not &quot;only when inactive on desktop.&quot;</li>
          <li>Make sure <strong>Chats</strong>, <strong>Mentions</strong>, and <strong>Channels</strong> are on.</li>
          <li>Check <strong>Quiet hours</strong> isn&apos;t blocking evenings.</li>
          <li>If nothing comes through, go to Android <strong>Settings → Apps → Teams → Notifications</strong> and turn them on. Also check battery optimization isn&apos;t killing Teams in the background.</li>
        </ol>
      ),
      desktop: (
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>Click the <strong>⋯</strong> next to your profile picture → <strong>Settings</strong> → <strong>Notifications and activity</strong>.</li>
          <li>Under Chats and channels, make sure channel posts and mentions are set to show a banner, not &quot;off.&quot;</li>
          <li>Let your operating system show Teams notifications if it asks.</li>
        </ol>
      ),
    },
  },
  {
    title: "Follow the channels you care about",
    body: {
      ios: (
        <>
          The ACM team has a <strong>General</strong> channel for announcements, <strong>Introductions</strong> for saying hi, and one channel per team: <strong>ICPC</strong>, <strong>Cybersecurity</strong>, <strong>SET</strong>, and <strong>Game Dev</strong>. Open General and each team channel you care about, tap the channel name → <strong>Notifications</strong> → <strong>All new posts</strong>. If a channel is missing, tap <strong>See all channels</strong> and turn on <strong>Show</strong> for it.
        </>
      ),
      android: (
        <>
          The ACM team has a <strong>General</strong> channel for announcements, <strong>Introductions</strong> for saying hi, and one channel per team: <strong>ICPC</strong>, <strong>Cybersecurity</strong>, <strong>SET</strong>, and <strong>Game Dev</strong>. Open General and each team channel you care about, tap the channel name → <strong>Notifications</strong> → <strong>All new posts</strong>. If a channel is missing, tap <strong>See all channels</strong> and turn on <strong>Show</strong> for it.
        </>
      ),
      desktop: (
        <>
          The ACM team has a <strong>General</strong> channel for announcements, <strong>Introductions</strong> for saying hi, and one channel per team: <strong>ICPC</strong>, <strong>Cybersecurity</strong>, <strong>SET</strong>, and <strong>Game Dev</strong>. Hover General and each team channel you care about → <strong>⋯</strong> → <strong>Channel notifications</strong> → <strong>All activity</strong>. Hidden channels are under <strong>See all channels</strong>.
        </>
      ),
    },
  },
];

export default function TeamsGuide() {
  const [device, setDevice] = useState<Device>("ios");

  return (
    <div>
      <div className="flex gap-1 rounded-xl bg-paper p-1" role="tablist" aria-label="Device">
        {devices.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={device === d.id}
            onClick={() => setDevice(d.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
              device === d.id ? "bg-white text-ink shadow-sm" : "text-ink-3 hover:text-ink"
            }`}
          >
            <i className={`bi ${d.icon}`} /> {d.label}
          </button>
        ))}
      </div>

      <ol className="mt-8 space-y-4">
        {steps.map((s, i) => {
          const action = s.action?.[device];
          return (
            <li key={s.title} className="card flex gap-4 p-5 sm:gap-6 sm:p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand font-mono text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{s.title}</h3>
                <div className="mt-2 leading-relaxed text-ink-2">{s.body[device]}</div>
                {action && action.href.startsWith("/") ? (
                  <Link href={action.href} className="btn-secondary mt-4 !py-2 text-sm">
                    <i className="bi bi-link-45deg" /> {action.label}
                  </Link>
                ) : action ? (
                  <a href={action.href} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-4 !py-2 text-sm">
                    <i className="bi bi-box-arrow-up-right" /> {action.label}
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 text-sm text-ink-3">
        Menu names change a little between Teams versions. If something doesn&apos;t match exactly, the setting is usually one tap away from where we said.
      </p>
    </div>
  );
}
