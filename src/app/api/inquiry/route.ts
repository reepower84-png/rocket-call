import { NextRequest, NextResponse } from "next/server";

// Discord 웹훅으로 알림 전송
async function sendDiscordNotification(name: string, phone: string, inquiry: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Discord webhook URL이 설정되지 않았습니다.");
  }

  const currentTime = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const embed = {
    title: "📞 새로운 상담 문의가 접수되었습니다!",
    color: 0x3b82f6,
    fields: [
      {
        name: "👤 이름",
        value: name,
        inline: true,
      },
      {
        name: "📱 전화번호",
        value: phone,
        inline: true,
      },
      {
        name: "💬 문의 내용",
        value: inquiry || "내용 없음",
        inline: false,
      },
      {
        name: "⏰ 접수 시간",
        value: currentTime,
        inline: false,
      },
    ],
    footer: {
      text: "🚀 로켓콜 | rocket-call.vercel.app",
    },
    timestamp: new Date().toISOString(),
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [embed],
    }),
  });

  if (!response.ok) {
    throw new Error(`Discord 웹훅 전송 실패: ${response.status} ${response.statusText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, inquiry } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 전화번호는 필수입니다" },
        { status: 400 }
      );
    }

    // Discord로 직접 알림 전송
    await sendDiscordNotification(name, phone, inquiry || "");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Discord 알림 전송 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
