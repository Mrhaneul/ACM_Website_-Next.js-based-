"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The dashboard has its own chrome; the linktree is a bare bio-link page.
  const bare =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/") || pathname === "/linktree";

  return (
    <>
      {!bare && <Navbar />}
      <main id="main">{children}</main>
      {!bare && <Footer />}
    </>
  );
}
