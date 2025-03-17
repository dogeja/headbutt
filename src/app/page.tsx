"use client";

import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/ui/Clock";

export default function Home() {
  return (
    <div className='min-h-screen bg-teal-600 flex flex-col'>
      {/* 전체 페이지에 적용될 전역 스타일 */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #008080;
        }
        .window {
          height: auto !important;
          overflow: visible !important;
          max-height: none !important;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
        .window-content {
          height: auto !important;
          min-height: 0 !important;
          display: flex;
          flex-direction: column;
          overflow: visible !important;
          padding-bottom: 0 !important;
        }
        .window-content > div {
          margin-bottom: 0 !important;
        }
        .browser-window {
          width: 100%;
          height: calc(100vh - 28px);
          margin: 0;
          border: 2px solid #c0c0c0;
          border-radius: 0;
          background-color: #c0c0c0;
          display: flex;
          flex-direction: column;
          box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf,
            inset -2px -2px grey, inset 2px 2px #fff;
        }
        .browser-content {
          flex: 1;
          background-color: #fff;
          border: 2px inset #808080;
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100%;
          min-height: 600px;
          border: none;
        }
      `}</style>

      {/* Windows 98 스타일 브라우저 창 */}
      <div className='browser-window mx-auto flex-1'>
        <div
          style={{
            backgroundColor: "#c0c0c0",
            borderBottom: "solid 1px #808080",
            padding: "2px 4px",
            display: "flex",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            파일
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            편집
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            보기
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            북마크
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            도움말
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#c0c0c0",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "solid 1px #808080",
          }}
        >
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ◀
          </button>
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ▶
          </button>
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ↻
          </button>
          <div
            style={{
              height: "24px",
              width: "1px",
              backgroundColor: "#808080",
              margin: "0 4px",
            }}
          ></div>
          <div
            style={{
              flexGrow: 1,
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              backgroundColor: "#ffffff",
              height: "24px",
              padding: "2px 8px",
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            https://www.waterbearer.io/
          </div>
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            🔍
          </button>
        </div>
        <div className='browser-content'>
          {/* 브라우저 콘텐츠가 여기에 들어갑니다 */}
          <iframe
            src='/homepage'
            style={{
              width: "100%",
              height: "100%",
              minHeight: "600px",
              border: "none",
            }}
            title='워터베어러 홈페이지'
          />
        </div>
      </div>

      {/* Windows 98 스타일 상태 표시줄 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#c0c0c0",
          borderTop: "solid 2px #808080",
          padding: "2px 4px",
          fontSize: "12px",
          height: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              backgroundColor: "#c0c0c0",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "2px 8px",
              marginRight: "8px",
              fontSize: "12px",
              height: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "4px" }}>🪟</span> 시작
          </button>
        </div>
        <Clock />
      </div>
    </div>
  );
}
