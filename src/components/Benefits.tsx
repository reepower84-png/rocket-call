"use client";

const benefits = [
  {
    icon: "🎯",
    title: "확정 고객만 연결",
    description:
      "약속이 확정된 고객만 연결해드립니다. 노쇼 걱정 없이 영업에만 집중하세요.",
  },
  {
    icon: "⏰",
    title: "시간 절약",
    description:
      "TM에 소비하는 시간을 줄이고, 실제 상담과 계약에 더 많은 시간을 투자하세요.",
  },
  {
    icon: "📈",
    title: "매출 증대",
    description:
      "안정적인 고객 공급으로 월 수입이 평균 40% 이상 증가한 설계사님들의 후기가 이어지고 있습니다.",
  },
  {
    icon: "💼",
    title: "전문 TM 팀",
    description:
      "보험 업계 경력 5년 이상의 전문 TM 팀이 고품질 약속콜을 제공합니다.",
  },
  {
    icon: "🔒",
    title: "독점 고객",
    description:
      "한 명의 고객을 여러 설계사에게 중복 제공하지 않습니다. 오직 당신만을 위한 고객입니다.",
  },
  {
    icon: "📊",
    title: "투명한 소통",
    description:
      "콜 진행 및 현재 진행 상황을 실시간으로 확인하실 수 있습니다.",
  },
];

export default function Benefits() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
            Why Rocket Call?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            로켓콜이 <span className="text-primary-600">특별한 이유</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            수많은 보험설계사님들이 로켓콜과 함께 성공적인 영업 활동을 이어가고
            있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToContact}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            로켓콜 시작하기
          </button>
        </div>
      </div>
    </section>
  );
}
