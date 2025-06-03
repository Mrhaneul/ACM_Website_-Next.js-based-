// src/components/Layout/ConditionalLayout.tsx
"use client";

import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Routes where we don't want navbar and footer
  const hideNavAndFooter = pathname === '/dashboard' || pathname?.startsWith('/dashboard/');
  
  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}