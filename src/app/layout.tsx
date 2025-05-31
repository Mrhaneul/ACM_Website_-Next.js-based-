import type { Metadata } from "next";
import "./globals.css";
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import '../lib/fontAwesome';

export const metadata: Metadata = {
  title: "ACM @ CBU",
  description: "ACM Website for Cal Baptist Univeristy",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}