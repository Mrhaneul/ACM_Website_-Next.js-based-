"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-mono text-sm text-ink-3">404</p>
      <h1 className="mt-2 text-4xl font-semibold">That page doesn&apos;t exist.</h1>
      <p className="mt-3 max-w-prose text-ink-2">
        The link may be old. Everything on the site is reachable from these pages.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/teams" className="btn-secondary">Teams</Link>
        <Link href="/join" className="btn-secondary">Join</Link>
        <Link href="/contact" className="btn-secondary">Contact</Link>
      </div>
    </section>
  );
}
