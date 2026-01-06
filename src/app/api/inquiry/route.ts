import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Discord 웹훅으로 알림 전송
async function sendDiscordNotification(name: string, phone: string, inquiry: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Discord webhook URL이 설정되지 않았습니다.");
    return;
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
    color: 0x3b82f6, // 파란색
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

  try {
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
      console.error("Discord 웹훅 전송 실패:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Discord 웹훅 전송 중 오류:", error);
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

    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          phone,
          inquiry: inquiry || "",
          status: "pending"
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "데이터 저장 중 오류가 발생했습니다" },
        { status: 500 }
      );
    }

    // Discord로 알림 전송 (완료될 때까지 대기)
    await sendDiscordNotification(name, phone, inquiry || "");

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "데이터 조회 중 오류가 발생했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID와 상태는 필수입니다" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "상태 업데이트 중 오류가 발생했습니다" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "문의를 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID는 필수입니다" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "삭제 중 오류가 발생했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
