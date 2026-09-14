import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ConditionalLayout from "../components/Layout/ConditionalLayout";
import "../lib/fontAwesome";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "ACM @ CBU",
    template: "%s · ACM @ CBU",
  },
  description:
    "The Association for Computing Machinery student chapter at California Baptist University. Competitive programming, cyber defense, software engineering, and game design teams.",
  keywords: ["ACM", "Computer Science", "California Baptist University", "Programming", "ICPC", "CCDC"],
  authors: [{ name: "ACM @ CBU" }],
  metadataBase: new URL("https://acm-website-459ef.web.app"),
  openGraph: {
    title: "ACM @ CBU",
    description: "Association for Computing Machinery at California Baptist University",
    type: "website",
    images: ["/home.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-brand focus:shadow-lg"
        >
          Skip to content
        </a>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
