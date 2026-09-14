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
    default: "ACM | TEC at CBU",
    template: "%s · ACM | TEC",
  },
  description:
    "ACM | TEC (Technology Engineering Club) is California Baptist University's student chapter of the Association for Computing Machinery. Software engineering, cybersecurity, game development, and competitive programming.",
  keywords: ["ACM", "Computer Science", "California Baptist University", "Programming", "ICPC", "CCDC"],
  authors: [{ name: "ACM | TEC" }],
  metadataBase: new URL("https://acm-website-459ef.web.app"),
  openGraph: {
    title: "ACM | TEC at CBU",
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
