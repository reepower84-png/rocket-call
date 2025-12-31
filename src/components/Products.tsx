"use client";

const products = [
  {
    number: "01",
    title: "리얼 고객 DB",
    description: "실제 보험 상담을 원하는 검증된 고객 데이터베이스",
    features: ["확정 약속 고객", "실시간 업데이트", "지역별 맞춤 제공"],
    color: "primary",
  },
  {
    number: "02",
    title: "리쿠르팅 DB",
    description: "보험 업계 진출을 희망하는 예비 설계사 데이터베이스",
    features: ["검증된 지원자", "상세 프로필 제공", "즉시 연락 가능"],
    color: "accent",
    recommended: true,
  },
];

export default function Products() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            로켓콜의 <span className="text-primary-600">대표상품</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                product.recommended
                  ? "border-accent-500"
                  : "border-transparent"
              }`}
            >
              {product.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    관리자 추천 상품
                  </span>
                </div>
              )}
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    product.color === "accent"
                      ? "bg-accent-500"
                      : "bg-primary-600"
                  } text-white font-bold text-xl`}
                >
                  {product.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-2 text-gray-700"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={scrollToContact}
            className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl"
          >
            상품 문의하기
          </button>
        </div>
      </div>
    </section>
  );
}
