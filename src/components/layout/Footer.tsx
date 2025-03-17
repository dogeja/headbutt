"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  const win98Style = {
    border: "solid 2px",
    borderColor: "#ffffff #808080 #808080 #ffffff",
    backgroundColor: "#c0c0c0",
    fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
  };

  const windowHeaderStyle = {
    backgroundColor: "#000080",
    color: "#ffffff",
    padding: "2px 4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
    fontWeight: "bold",
    fontSize: "12px",
  };

  const windowControlStyle = {
    width: "16px",
    height: "14px",
    border: "solid 2px",
    borderColor: "#ffffff #808080 #808080 #ffffff",
    backgroundColor: "#c0c0c0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    margin: "0 2px",
    outline: "1px solid black",
    outlineOffset: "-1px",
  };

  const linkStyle = {
    color: "#0000ff",
    fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
    fontSize: "12px",
  };

  return (
    <div className='footer'>
      <div className='window' style={win98Style}>
        <div className='window-header' style={windowHeaderStyle}>
          <span>정보</span>
          <div className='window-controls' style={{ display: "flex" }}>
            <button className='window-control' style={windowControlStyle}>
              ─
            </button>
            <button className='window-control' style={windowControlStyle}>
              □
            </button>
            <button className='window-control' style={windowControlStyle}>
              ×
            </button>
          </div>
        </div>
        <div className='window-content p-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h3
                className='text-lg font-bold mb-2'
                style={{
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "14px",
                }}
              >
                워터베어러
              </h3>
              <p
                className='mb-4'
                style={{
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "12px",
                }}
              >
                삶의 결정적 순간을 포착하고
                <br />
                의미를 더하는 도구
              </p>
              <p
                style={{
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "12px",
                }}
              >
                © {year} 워터베어러. All rights reserved.
              </p>
            </div>

            <div>
              <h3
                className='text-lg font-bold mb-2'
                style={{
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "14px",
                }}
              >
                이용안내
              </h3>
              <ul className='space-y-2'>
                {/* <li>
                  <Link href='/help' className='hover:underline'>
                    ▶ 도움말
                  </Link>
                </li>
                <li>
                  <Link href='/faq' className='hover:underline'>
                    ▶ 자주 묻는 질문
                  </Link>
                </li> */}
                <li>
                  <Link
                    href='/contact'
                    className='hover:underline'
                    style={linkStyle}
                  >
                    ▶ 문의하기
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3
                className='text-lg font-bold mb-2'
                style={{
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "14px",
                }}
              >
                법적 고지
              </h3>
              <ul className='space-y-2'>
                {/* <li>
                  <Link href='/terms' className='hover:underline'>
                    ▶ 이용약관
                  </Link>
                </li>
                <li>
                  <Link href='/privacy' className='hover:underline'>
                    ▶ 개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href='/cookies' className='hover:underline'>
                    ▶ 쿠키 정책
                  </Link>
                </li> */}
                <li>
                  <Link
                    href='/terms'
                    className='hover:underline'
                    style={linkStyle}
                  >
                    ▶ 이용약관
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-content'>
        <div className='copyright'>
          <p>© 2024 워터베어러. All rights reserved.</p>
          <p className='text-sm text-gray-500'>지속의 지혜, 흐름의 철학</p>
        </div>
      </div>
    </div>
  );
}
