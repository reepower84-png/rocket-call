"use client";

const steps = [
  {
    number: "01",
    title: "상담 신청",
    description: "간단한 정보 입력으로 무료 상담을 신청하세요.",
  },
  {
    number: "02",
    title: "맞춤 상담",
    description: "전문 상담사가 연락드려 니즈에 맞는 플랜을 제안합니다.",
  },
  {
    number: "03",
    title: "약속콜 시작",
    description: "TM 팀이 타겟 고객에게 연락하여 약속을 잡아드립니다.",
  },
  {
    number: "04",
    title: "고객 연결",
    description: "확정된 약속 정보를 전달받고 미팅을 진행하세요.",
  },
];

export default function Process() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            <span className="text-primary-600">4단계</span>로 시작하는 성공적인
            영업
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            복잡한 절차 없이 간단하게 시작할 수 있습니다
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-primary-100 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 text-center relative z-10 border-2 border-primary-100 hover:border-primary-300 transition-colors">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
