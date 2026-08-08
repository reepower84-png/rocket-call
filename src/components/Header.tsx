"use client";

import { useState, useEffect } from "react";

const navItems = [
  { id: "difference", label: "로켓콜 소개" },
  { id: "benefits", label: "특별한 이유" },
  { id: "process", label: "진행 과정" },
  { id: "samples", label: "녹취콜" },
  { id: "testimonials", label: "고객 후기" },
  { id: "products", label: "대표 상품" },
];

// 스크롤 위치 판별에는 CTA 대상인 contact 섹션까지 포함한다.
const spyIds = [...navItems.map((item) => item.id), "contact"];

const HEADER_OFFSET = 70;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + HEADER_OFFSET + 40;

      // 페이지 최하단에서는 마지막 섹션을 활성화
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        setActiveId(spyIds[spyIds.length - 1]);
        return;
      }

      let current = "";
      for (const id of spyIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= scrollPos) {
          current = id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToTop = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const solid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-sm shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
          onClick={scrollToTop}
        >
          <span className="text-2xl">🚀</span>
          <span
            className={`font-bold text-xl ${
              solid ? "text-primary-700" : "text-white"
            }`}
          >
            로켓콜
          </span>
        </div>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? solid
                      ? "text-primary-600"
                      : "text-white"
                    : solid
                      ? "text-gray-600 hover:text-primary-600"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? solid
                        ? "bg-primary-600 opacity-100"
                        : "bg-accent-500 opacity-100"
                      : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-5 py-2 rounded-full font-medium transition-all hover:scale-105 shadow-lg text-sm sm:text-base whitespace-nowrap"
          >
            제안서
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-accent-500 hover:bg-accent-600 text-white px-3 sm:px-5 py-2 rounded-full font-medium transition-all hover:scale-105 shadow-lg text-sm sm:text-base whitespace-nowrap"
          >
            무료 상담
          </button>

          {/* 모바일 햄버거 버튼 */}
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                solid ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                solid ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                solid ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 pt-4 pb-2 flex flex-col">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-colors border-l-4 ${
                  isActive
                    ? "bg-primary-50 text-primary-700 border-primary-600"
                    : "text-gray-700 border-transparent hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <a
            href="https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="sm:hidden text-left px-4 py-3 rounded-lg font-medium text-gray-700 border-l-4 border-transparent hover:bg-gray-50"
          >
            제안서 보기
          </a>
        </nav>
      </div>
    </header>
  );
}
