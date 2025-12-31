"use client";

const badExperiences = [
  { icon: "📵", text: "연락이 안되는 고객" },
  { icon: "📞", text: "전화하면 바로 끊는 고객" },
  { icon: "👥", text: "이미 다른 설계사가 점검한 고객" },
  { icon: "❌", text: "결번" },
];

export default function Difference() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="difference" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* 문제 제기 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            이런 DB, <span className="text-red-500">한 번쯤 써보셨죠?</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {badExperiences.map((item, index) => (
              <div
                key={index}
                className="bg-red-50 border border-red-100 rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-gray-700 text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 로켓콜의 차별점 */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-12 mt-12">
          <div className="text-center mb-10">
            <span className="text-5xl mb-4 block">🚀</span>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-700">
              로켓콜은 다릅니다
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-primary-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">1차 컨텍</h4>
                  <p className="text-gray-600">관심 있는 고객 당사에서 먼저 확인</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-accent-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">2차 컨텍</h4>
                  <p className="text-gray-600">방문 약속까지 확정 후 전달</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-xl md:text-2xl font-medium text-gray-800">
              설계사님은 <span className="text-primary-600 font-bold">실제 상담만</span> 진행하시면 됩니다.
            </p>
            <div className="inline-block bg-accent-500 text-white px-6 py-3 rounded-full font-bold text-lg">
              🏆 국내 최초 100% AS 보장제도 도입
            </div>
            <p className="text-2xl md:text-3xl font-bold text-primary-700 pt-4">
              로켓콜과 함께면 영업이 쉬워집니다!
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={scrollToContact}
            className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl"
          >
            무료 상담 신청하기
          </button>
        </div>
      </div>
    </section>
  );
}
