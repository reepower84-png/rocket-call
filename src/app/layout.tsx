import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로켓콜 - 보험설계사 전문 약속콜 서비스",
  description: "확정 고객만 보내드립니다. 고객 유치의 새로운 해법, 로켓콜과 함께하세요.",
  keywords: "보험설계사, 약속콜, TM, 고객유치, 로켓콜, 보험영업",
  openGraph: {
    title: "로켓콜 - 보험설계사 전문 약속콜 서비스",
    description: "확정 고객만 보내드립니다. 고객 유치의 새로운 해법, 로켓콜과 함께하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
