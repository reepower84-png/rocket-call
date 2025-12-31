"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span
            className={`font-bold text-xl ${
              isScrolled ? "text-primary-700" : "text-white"
            }`}
          >
            로켓콜
          </span>
        </div>
        <button
          onClick={scrollToContact}
          className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-full font-medium transition-all hover:scale-105 shadow-lg"
        >
          무료 상담 신청
        </button>
      </div>
    </header>
  );
}
