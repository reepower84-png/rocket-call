"use client";

const testimonials = [
  {
    name: "김*현 설계사",
    company: "S생명",
    content:
      "TM에 쏟던 시간을 고객 상담에 집중하니 계약 성사율이 눈에 띄게 올랐습니다. 확정 고객만 연결해주셔서 노쇼 스트레스도 없어요.",
    rating: 5,
  },
  {
    name: "박*영 설계사",
    company: "H화재",
    content:
      "처음엔 반신반의했는데, 정말 약속이 잡힌 고객만 보내주시더라고요. 덕분에 이번 달 실적이 역대 최고입니다!",
    rating: 5,
  },
  {
    name: "이*수 설계사",
    company: "M생명",
    content:
      "고객 유치가 항상 고민이었는데 로켓콜 덕분에 안정적인 영업이 가능해졌습니다. 가족들과 시간도 더 보낼 수 있게 됐어요.",
    rating: 5,
  },
];

export default function Testimonials() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-primary-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-200 font-semibold text-sm uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            설계사님들의 <span className="text-accent-500">생생한 후기</span>
          </h2>
          <p className="text-primary-200 max-w-2xl mx-auto">
            로켓콜과 함께 성공한 설계사님들의 이야기를 들어보세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToContact}
            className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            나도 성공 스토리 만들기
          </button>
        </div>
      </div>
    </section>
  );
}
