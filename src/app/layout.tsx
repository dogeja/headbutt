import "./globals.css";
import "@/styles/index.css";
import Header from "@/components/layout/header";
import { Toolbar } from "@/components/layout/Toolbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";
import { Inter, VT323 } from "next/font/google";
import Taskbar from "@/components/layout/Taskbar";
import { cn } from "@/lib/utils";

// 기본 글꼴 및 복고풍 글꼴 불러오기
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const vt323 = VT323({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "워터베어러 - 지속의 지혜, 흐름의 철학",
  description: "워터베어러를 통해 지속 가능한 삶의 철학을 만나보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        {/* 90-00년대 웹 폰트 추가 */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap'
        />
      </head>
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background font-sans antialiased",
          inter.variable,
          vt323.variable
        )}
        style={{ backgroundColor: "#008080" }}
      >
        <main className='container mx-auto p-4 pb-16'>
          <div className='window'>{children}</div>
        </main>
        <Taskbar />
      </body>
    </html>
  );
}
