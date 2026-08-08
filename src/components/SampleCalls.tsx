"use client";

import { useRef, useState } from "react";

// duration은 파일에서 측정한 실제 길이(초). iOS Safari는 preload="metadata"를
// 무시하는 경우가 많아, 메타데이터가 오기 전까지 쓸 초기값으로 둔다.
const samples = [
  { src: "/audio/sample-call-01.mp3", title: "1차콜 샘플 ①", customer: "선*경 고객", duration: 64.8 },
  { src: "/audio/sample-call-02.mp3", title: "1차콜 샘플 ②", customer: "신*정 고객", duration: 58.5 },
  { src: "/audio/sample-call-03.mp3", title: "1차콜 샘플 ③", customer: "왕*경 고객", duration: 60.7 },
  { src: "/audio/sample-call-04.mp3", title: "1차콜 샘플 ④", customer: "전*숙 고객", duration: 84.9 },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SampleCalls() {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [times, setTimes] = useState<number[]>(() => samples.map(() => 0));
  const [durations, setDurations] = useState<number[]>(() =>
    samples.map((sample) => sample.duration)
  );

  const updateAt = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    value: number
  ) => {
    setter((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const togglePlay = (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }

    // 한 번에 하나만 재생되도록 나머지는 정지
    audioRefs.current.forEach((other, i) => {
      if (other && i !== index) other.pause();
    });

    audio.play();
    setPlayingIndex(index);
  };

  const handleSeek = (index: number, value: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;
    audio.currentTime = value;
    updateAt(setTimes, index, value);
  };

  return (
    <section id="samples" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
            Real Call
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            녹취콜 <span className="text-primary-600">들어보기</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            로켓콜이 고객과 어떻게 통화하는지 실제 녹취를 직접 확인해보세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {samples.map((sample, index) => {
            const isPlaying = playingIndex === index;
            return (
              <div
                key={sample.src}
                className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 ${
                  isPlaying
                    ? "ring-2 ring-primary-500 shadow-xl"
                    : "hover:shadow-xl"
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => togglePlay(index)}
                    aria-label={`${sample.title} ${isPlaying ? "일시정지" : "재생"}`}
                    className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 shadow-lg ${
                      isPlaying
                        ? "bg-primary-600 hover:bg-primary-700"
                        : "bg-accent-500 hover:bg-accent-600"
                    }`}
                  >
                    {isPlaying ? (
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
                      </svg>
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900 truncate">
                        {sample.title}
                      </p>
                      {isPlaying && (
                        <span className="shrink-0 text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                          재생 중
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{sample.customer}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <input
                    type="range"
                    min={0}
                    max={durations[index] || 0}
                    step={0.1}
                    value={times[index]}
                    onChange={(e) => handleSeek(index, Number(e.target.value))}
                    aria-label={`${sample.title} 재생 위치`}
                    className="w-full h-1.5 rounded-full appearance-none bg-gray-200 accent-primary-600 cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500 tabular-nums">
                    <span>{formatTime(times[index])}</span>
                    <span>{formatTime(durations[index])}</span>
                  </div>
                </div>

                <audio
                  ref={(el) => {
                    audioRefs.current[index] = el;
                  }}
                  src={sample.src}
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    // 실제 메타데이터가 오면 초기값을 덮어쓴다 (NaN/Infinity는 무시)
                    const actual = e.currentTarget.duration;
                    if (Number.isFinite(actual) && actual > 0) {
                      updateAt(setDurations, index, actual);
                    }
                  }}
                  onTimeUpdate={(e) =>
                    updateAt(setTimes, index, e.currentTarget.currentTime)
                  }
                  onEnded={() => {
                    updateAt(setTimes, index, 0);
                    setPlayingIndex(null);
                  }}
                  onPause={() => setPlayingIndex((cur) => (cur === index ? null : cur))}
                />
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
          * 고객 동의를 받아 공개된 실제 상담 녹취이며, 개인정보는 일부 편집되었습니다.
        </p>
      </div>
    </section>
  );
}
