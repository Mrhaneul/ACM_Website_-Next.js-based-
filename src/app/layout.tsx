import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from '../components/Layout/ConditionalLayout';
import '../lib/fontAwesome';

export const metadata: Metadata = {
  title: "ACM @ CBU",
  description: "ACM Website for Cal Baptist University",
  keywords: ["ACM", "Computer Science", "California Baptist University", "Programming", "ICPC", "CCDC"],
  authors: [{ name: "ACM @ CBU" }],
  openGraph: {
    title: "ACM @ CBU",
    description: "Association for Computing Machinery at California Baptist University",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}