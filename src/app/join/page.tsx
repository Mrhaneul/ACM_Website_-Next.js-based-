import type { Metadata } from "next";
import { Suspense } from "react";
import JoinFlow from "@/src/components/Join/JoinFlow";

export const metadata: Metadata = {
  title: "Join",
  description: "Join ACM at CBU: a short form, then Microsoft Teams set up on your phone.",
};

export default function JoinPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-x py-14 sm:py-20">
          <p className="eyebrow">Join ACM</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold sm:text-5xl">There are no dues and you don&apos;t need experience.</h1>
          <p className="mt-5 max-w-prose text-lg text-ink-2">
            Tell us a little about yourself so the leads know who is coming, then get Microsoft Teams on your phone so
            you hear about meetings. That is all there is to it.
          </p>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="container-x max-w-3xl">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-white" />}>
            <JoinFlow />
          </Suspense>
        </div>
      </section>
    </>
  );
}
