"use client";

export default function Footer() {
  const affiliates = [
    { name: "로켓콜 인트로", url: "https://rk-intro.vercel.app/" },
    { name: "로켓콜_보험설계사", url: "https://rocket-call.vercel.app/" },
    { name: "로켓콜_자동차딜러", url: "https://rocket-call-auto-dealer.vercel.app/" },
    { name: "로켓콜_부동산분양", url: "https://rocket-call-realestate.vercel.app/" },
    { name: "로켓콜_병원", url: "https://rocket-call-hospital.vercel.app/" },
    { name: "로켓콜_프랜차이즈 가맹", url: "https://rocket-call-franchise.vercel.app/" },
    { name: "로켓콜_정책자금", url: "https://rk-policy.vercel.app/" },
    { name: "로켓콜_변호사", url: "https://rk-lawyer.vercel.app/" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
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

          <div className="text-center md:text-right">
            <p className="text-sm font-bold text-white mb-2">계열사</p>
            <ul className="space-y-1">
              {affiliates.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
