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
  {
    name: "최*진 설계사",
    company: "K손보",
    content:
      "입사 초반에는 지인 영업만으로 버티다 보니 금방 한계가 왔습니다. 로켓콜로 신규 고객을 꾸준히 만나면서 이제야 제대로 자리를 잡은 느낌이에요.",
    rating: 5,
  },
  {
    name: "정*미 설계사",
    company: "D생명",
    content:
      "고객 정보를 미리 정리해서 넘겨주시니 상담 준비를 충분히 하고 나갈 수 있습니다. 준비된 상태로 만나니 첫 미팅부터 대화의 깊이가 다릅니다.",
    rating: 5,
  },
  {
    name: "강*호 설계사",
    company: "N화재",
    content:
      "예전에 쓰던 DB는 연결조차 안 되는 번호가 태반이었습니다. 로켓콜은 통화가 끝난 고객만 넘어오니 헛걸음하는 일이 없어요.",
    rating: 5,
  },
  {
    name: "윤*경 설계사",
    company: "A생명",
    content:
      "아이 키우면서 일하다 보니 하루에 쓸 수 있는 시간이 정해져 있어요. 약속이 잡힌 고객만 만나니 짧은 시간에도 성과가 납니다.",
    rating: 5,
  },
  {
    name: "임*재 설계사",
    company: "L생명",
    content:
      "반신반의하며 한 달만 써보자는 마음으로 시작했는데, 첫 달 결과를 보고 바로 연장했습니다. 지금은 팀원들에게도 권하고 있어요.",
    rating: 5,
  },
  {
    name: "한*솔 설계사",
    company: "C손보",
    content:
      "고객이 이미 상담 의사를 밝힌 상태라 첫 마디부터 분위기가 편합니다. 거절부터 듣고 시작하던 예전과는 스트레스 자체가 다릅니다.",
    rating: 5,
  },
];

export default function Testimonials() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="py-20 bg-primary-700">
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
