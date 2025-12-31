"use client";

export default function Guarantee() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="text-5xl mb-6">🛡️</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            로켓콜만의 확실한 약속
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              저희 로켓콜은 <span className="text-accent-500 font-bold">상담 약속이 확정된 고객만</span> 전달합니다.
            </p>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              미팅콜은 <span className="text-accent-500 font-bold">방문 실패 시 비용이 발생하지 않습니다.</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-primary-100 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>확정 고객만 전달</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>노쇼 시 무료</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>리스크 제로</span>
            </div>
          </div>
          <button
            onClick={scrollToContact}
            className="mt-8 bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl"
          >
            지금 바로 시작하기
          </button>
        </div>
      </div>
    </section>
  );
}
