'use client';
import ContactForm from './ContactForm';
import React from 'react';

/**
 * ContactWrapper contains the rendering of the background diamond shapes, 
 * along with the ContactForm that renders the form for the contact page. 
 */

export default function ContactWrapper() {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center px-4 py-12">
        
        {/* Background Diamond Shapes - Left Side */}
        <div className="absolute w-[250px] h-[250px] bg-[#5CE1E6CC] opacity-100 rotate-45 z-0 left-[7rem] top-1/2 -translate-y-1/2 rounded-xl" />
        <div className="absolute w-[250px] h-[250px] bg-[#38B6FFBD] opacity-90 rotate-45 z-10 left-[11rem] top-1/2 -translate-y-1/2 rounded-xl"/>

        {/* Background Diamond Shapes - Right Side */}
        <div className="absolute w-[250px] h-[250px] bg-[#5CE1E6CC] opacity-100 rotate-45 z-0 right-[7rem] top-1/2 -translate-y-1/2 rounded-xl"/>
        <div className="absolute w-[250px] h-[250px] bg-[#38B6FFBD] opacity-90 rotate-45 z-10 right-[11rem] top-1/2 -translate-y-1/2 rounded-xl" />
        
        {/* Form Container */}
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl z-10 border border-gray-200">
            <h2 className="text-5xl font-bold text-center text-black mb-8">Contact Us</h2>
            <ContactForm />
        </div>
    </section>
  );
}
