"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/teams", label: "Teams" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-md">
      <nav className="container-x flex h-[68px] items-center justify-between" aria-label="Primary">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/acm.png" alt="" width={40} height={40} className="h-10 w-10" unoptimized />
          <span className="leading-tight">
            <span className="block text-[0.95rem] font-semibold text-ink">ACM at CBU</span>
            <span className="hidden text-xs text-ink-3 sm:block">Association for Computing Machinery</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive(href) ? "bg-brand/8 text-brand" : "text-ink-2 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link href="/join" className="btn-primary !py-2.5">
              Join ACM
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"} text-xl`} />
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`grid overflow-hidden border-t border-line bg-white transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="min-h-0">
          <ul className="container-x flex flex-col py-3">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`block rounded-md px-3 py-3 text-base font-medium ${
                    isActive(href) ? "bg-brand/8 text-brand" : "text-ink-2"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="px-3 pb-2 pt-2">
              <Link href="/join" className="btn-primary w-full">
                Join ACM
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
