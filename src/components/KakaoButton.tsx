'use client';

export default function KakaoButton() {
  return (
    <a
      href="http://pf.kakao.com/_zxfugn/chat"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 transition-transform hover:scale-110"
      aria-label="카카오톡 상담"
    >
      <img
        src="/카톡_원형_로고.png"
        alt="카카오톡 상담하기"
        className="w-14 h-14 rounded-full shadow-lg"
      />
    </a>
  );
}
