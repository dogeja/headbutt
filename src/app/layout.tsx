import "./globals.css";
import "@/styles/index.css";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/Navigation";
import { Toolbar } from "@/components/layout/Toolbar";
import { Footer } from "@/components/layout/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "카이로스",
  description: "순간을 놓치지 않게",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <div className='container'>
          {/* 메인 윈도우 */}
          <div className='window'>
            <div className='window-header'>
              <span>Explorer</span>
              <div className='window-controls'>
                <button className='window-control'>─</button>
                <button className='window-control'>□</button>
                <button className='window-control'>×</button>
              </div>
            </div>
            <div className='window-content'>
              <Header />
              <Navigation />
              <main className='flex-1'>{children}</main>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
        <Toolbar />
      </body>
    </html>
  );
}
