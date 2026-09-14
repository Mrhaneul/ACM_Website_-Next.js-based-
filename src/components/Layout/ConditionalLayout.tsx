"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The dashboard has its own chrome.
  const bare = pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  return (
    <>
      {!bare && <Navbar />}
      <main id="main">{children}</main>
      {!bare && <Footer />}
    </>
  );
}
