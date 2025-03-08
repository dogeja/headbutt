"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className='footer'>
      <div className='window'>
        <div className='window-header'>
          <span>정보</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h3 className='text-lg font-bold mb-2'>카이로스</h3>
              <p className='text-sm mb-4'>
                삶의 결정적 순간을 포착하고
                <br />
                의미를 더하는 도구
              </p>
              <p className='text-sm'>© {year} 카이로스. All rights reserved.</p>
            </div>

            <div>
              <h3 className='text-lg font-bold mb-2'>이용안내</h3>
              <ul className='text-sm space-y-2'>
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
                  <Link href='/contact' className='hover:underline'>
                    ▶ 문의하기
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-bold mb-2'>법적 고지</h3>
              <ul className='text-sm space-y-2'>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
