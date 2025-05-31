'use client';

import { useRef } from 'react';


export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="font-sans bg-zinc-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-60"
      />


      <main>
        {/* Hero Section */}
        <section id="home" className="h-screen bg-white flex flex-col justify-center items-center text-center px-8 relative">
          
        </section>

      </main>
    </div>
  );
}