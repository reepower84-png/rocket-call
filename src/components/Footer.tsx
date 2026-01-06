"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-xl text-white">로켓콜</span>
          </div>

          <div className="text-center md:text-left">
            <p className="text-sm">
              보험설계사 전문 약속콜 서비스
            </p>
            <p className="text-sm mt-1">
              상호: 제이코리아, 대표: 이주영, 사업자등록번호: 278-30-01540
            </p>
          </div>

          <div className="text-sm">
            © 2024 로켓콜. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
