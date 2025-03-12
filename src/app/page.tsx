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
                카이로스 - 당신의 모든 순간을 위해
              </h1>
              <p className='mb-6 text-secondary'>
                카이로스(Καιρός)는 그리스어로 ‘결정적 순간’ 또는 ‘적절한 기회’를
                의미합니다.
                <br />
                <br />
                우리는 짧은 삶 속 소중한 순간을 포착하고, 그 가치를 더하는
                도구를 만듭니다. 시간에는 ‘크로노스(χρόνος)’와
                ‘카이로스(καιρός)’ 두 가지 개념이 있습니다. 크로노스가 일정하게
                흐르는 시간이라면, 카이로스는 우리에게 특별한 의미를 지닌 순간을
                뜻합니다.
                <br />
                <br />
                소중한 순간이 스쳐 지나가지 않도록. 그것이 바로 카이로스가
                존재하는 이유입니다.
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
                    순간의 아이디어를 놓치지 않다
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
                    작은 변화가 쌓여 큰 힘이 되다
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
                    더 나은 변화를 함께 만들다
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
                  <p>소중한 순간을 기록하고 의미를 더하다</p>
                </div>
                <div className='value-item' style={{ paddingBottom: "4px" }}>
                  <span className='font-bold'>▶ 지향점</span>
                  <p>짧은 삶 속, 빛나는 순간을 위해.</p>
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
                  "카이로스 - 당신의 모든 순간을 위해"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
