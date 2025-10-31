"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/teams", label: "Teams" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav className="bg-white text-black p-4 border-b-[6px] border-[#004AAD] relative z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/acm.png"
              alt="ACM Logo"
              width={80}
              height={80}
              className="w-[60px] h-[60px] min-[1025px]:w-[80px] min-[1025px]:h-[80px]"
              unoptimized={true}
            />
            <span className="font-black text-base min-[1025px]:text-xl">
              Association for <br /> Computing Machinery
            </span>
          </Link>

          {/* Desktop Menu (only shows at 1025px and above) */}
          <ul className="hidden min-[1025px]:flex items-center space-x-6">
            {menuItems.map(({ href, label }) => (
              <li
                key={href}
                className="relative pr-3 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-2.5 after:h-2.5 after:bg-[#004AAD] after:rotate-45 after:rounded-sm"
              >
                <Link href={href} className="hover:text-[#58cbf7] px-1">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="bg-[#58cbf7] hover:bg-[#004AAD] text-white font-semibold py-2 px-4 rounded-[8px] transition mr-3"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="bg-[#004AAD] hover:bg-[#58cbf7] text-white font-semibold py-2 px-4 rounded-[8px] transition"
              >
                Let's Connect!
              </Link>
            </li>
          </ul>

          {/* Mobile & Tablet Hamburger Button (shows below 1025px) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex min-[1025px]:hidden flex-col gap-1.5 p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#004AAD] transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#004AAD] transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#004AAD] transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Menu Dropdown */}
      <div
        className={`fixed top-[88px] left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-40 min-[1025px]:hidden ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col py-4">
          {menuItems.map(({ href, label }) => (
            <li key={href} className="border-b border-gray-100">
              <Link
                href={href}
                className="block px-6 py-4 hover:bg-gray-50 hover:text-[#58cbf7] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="px-6 py-4">
            <Link
              href="/login"
              className="block text-center bg-[#58cbf7] hover:bg-[#004AAD] text-white font-semibold py-3 px-4 rounded-[8px] transition mb-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </li>
          <li className="px-6 pb-4">
            <Link
              href="/contact"
              className="block text-center bg-[#004AAD] hover:bg-[#58cbf7] text-white font-semibold py-3 px-4 rounded-[8px] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Let's Connect!
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile & tablet menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 min-[1025px]:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
