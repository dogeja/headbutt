import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='p-4'>
      {/* 시작 윈도우 */}
      <div className='window mb-4'>
        <div className='window-header'>
          <span>Kairos Digital</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>

        <div className='window-content'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='feature-card'>
              <Image
                src='/images/projects/info_img01.jpg'
                alt='Kairos - 순간의 가치'
                width={400}
                height={500}
                className='rounded-lg'
                style={{ objectFit: "cover" }}
              />
              <p className='text-sm mt-4 text-center text-secondary'>
                "기회는 다가올 때 앞에서 잡아야 하며, 지나가면 다시 붙잡을 수
                없다"
              </p>
            </div>
            <div>
              <h1 className='text-2xl font-bold mb-6'>
                카이로스 - 순간이 가치가 되는 곳
              </h1>
              <p className='mb-6 text-secondary'>
                카이로스(Καιρός)는 그리스어로 '결정적 순간' 또는 '적절한 기회'를
                의미합니다.
                <br />
                <br />
                우리는 삶의 결정적 순간들을 포착하고 의미를 더하는 도구를
                만듭니다. 시간에는 '크로노스(χρόνος)'와 '카이로스(καιρός)' 두
                가지가 있습니다. 크로노스가 기계적으로 흐르는 시간이라면,
                카이로스는 인간에게 중요한 의미를 지닌 특별한 순간을 뜻합니다.
                <br />
                <br />
                작은 실천이 모여 의미 있는 변화를 만든다는 믿음, 그것이
                카이로스의 시작입니다.
              </p>
              <div className='flex gap-4'>
                <Link href='/work'>
                  <button
                    className='button'
                    style={{ border: "var(--outset-border)" }}
                  >
                    서비스 살펴보기
                  </button>
                </Link>
                <Link href='/about'>
                  <button
                    className='button'
                    style={{
                      background: "#d4d0c8",
                      border: "var(--outset-border)",
                    }}
                  >
                    더 알아보기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 서비스 소개 */}
      <div className='window'>
        <div className='window-header'>
          <span>Our Services</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* 좌측 메뉴 */}
            <div
              className='service-menu'
              style={{ border: "var(--inset-border)", padding: "8px" }}
            >
              <div className='mb-2 bold'>서비스 목록:</div>
              <Link href='/work'>
                <div
                  className='menu-item'
                  style={{ background: "#d4d0c8", marginBottom: "4px" }}
                >
                  <span className='text-lg font-bold'>💡 영감 기록</span>
                  <p className='text-sm text-secondary'>
                    순간의 아이디어를 담다
                  </p>
                </div>
              </Link>
              <Link href='/about'>
                <div
                  className='menu-item'
                  style={{ background: "#d4d0c8", marginBottom: "4px" }}
                >
                  <span className='text-lg font-bold'>🏃‍♂️ 건강 관리</span>
                  <p className='text-sm text-secondary'>
                    작은 실천의 힘을 믿다
                  </p>
                </div>
              </Link>
              <Link href='/contact'>
                <div
                  className='menu-item'
                  style={{ background: "#d4d0c8", marginBottom: "4px" }}
                >
                  <span className='text-lg font-bold'>✨ 함께하기</span>
                  <p className='text-sm text-secondary'>
                    변화의 여정에 동참하다
                  </p>
                </div>
              </Link>
            </div>

            {/* 우측 정보 패널 */}
            <div
              className='info-panel'
              style={{ border: "var(--inset-border)", padding: "8px" }}
            >
              <h2 className='text-xl font-bold mb-4'>카이로스의 약속</h2>
              <div
                className='value-list'
                style={{ background: "#ffffff", padding: "8px" }}
              >
                <div
                  className='value-item'
                  style={{
                    borderBottom: "1px dotted #999",
                    paddingBottom: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <span className='font-bold'>▶ 핵심 가치</span>
                  <p>
                    일상에서 지나치기 쉬운 소중한 순간들을 포착하고 의미를
                    부여합니다
                  </p>
                </div>
                <div
                  className='value-item'
                  style={{
                    borderBottom: "1px dotted #999",
                    paddingBottom: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <span className='font-bold'>▶ 실천 방식</span>
                  <p>의미 있는 변화는 작은 실천에서 시작됩니다</p>
                </div>
                <div className='value-item' style={{ paddingBottom: "4px" }}>
                  <span className='font-bold'>▶ 지향점</span>
                  <p>사용자의 소중한 순간들이 모여 더 큰 가치를 만들어갑니다</p>
                </div>
              </div>
              <div
                className='quote-box'
                style={{
                  background: "#ffffcc",
                  border: "1px solid #999",
                  padding: "8px",
                  marginTop: "12px",
                }}
              >
                <p className='text-sm italic'>
                  "카이로스 - 순간이 가치가 되는 곳"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
