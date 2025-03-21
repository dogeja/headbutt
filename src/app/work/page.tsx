import Image from "next/image";
import Link from "next/link";

// 진행 상태를 표시하는 컴포넌트
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='p-2' style={{ border: "var(--inset-border)" }}>
      <div className='flex items-center justify-between mb-1'>
        <span className='text-sm font-bold'>개발 진행도</span>
        <span className='text-sm'>{progress}%</span>
      </div>
      <div style={{ border: "var(--inset-border)", padding: "2px" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "16px",
            background: "#000080",
          }}
        ></div>
      </div>
    </div>
  );
};

// 주요 기능 박스 컴포넌트
const FeatureBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='p-4 mb-4' style={{ border: "var(--inset-border)" }}>
      <h3 className='bold mb-2'>{title}</h3>
      {children}
    </div>
  );
};

export default function Work() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>App Development</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>앱 개발 중!</h1>
          <p className='text-sm mb-4'>
            여러분의 지속가능한 성장과 의미 있는 노력을 돕는 워터베어러 앱을
            개발 중입니다.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div>
              <ProgressBar progress={10} />

              <div className='mt-4'>
                <FeatureBox title='예상 출시일'>
                  <p className='text-sm'>2025년 하반기 출시 예정</p>
                </FeatureBox>

                <FeatureBox title='개발 중인 주요 기능'>
                  <ul className='text-sm space-y-2'>
                    <li>• 지속가능한 습관 형성 도구</li>
                    <li>• 내적 통제력 향상 트래커</li>
                    <li>• 의미 있는 노력 기록 시스템</li>
                  </ul>
                </FeatureBox>
              </div>
            </div>

            <div className='flex justify-center items-center'>
              <div
                className='p-2 w-full max-w-md'
                style={{ border: "var(--inset-border)" }}
              >
                <div
                  className='w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center overflow-hidden'
                  style={{ border: "1px solid #999" }}
                >
                  <p className='text-sm text-gray-500'></p>
                  {
                    <Image
                      src='/images/projects/progress.gif'
                      alt='열심히 제작중!'
                      title='열심히 제작중!'
                      width={500}
                      height={500}
                      className='object-cover w-full h-full'
                      style={{ objectPosition: "center" }}
                    />
                  }
                </div>
              </div>
            </div>
          </div>

          <div className='window'>
            <div className='window-header'>
              <span>Getting Notified</span>
            </div>
            <div className='window-content p-4'>
              <h2 className='text-lg bold mb-4'>앱 출시 소식을 받아보세요</h2>
              <p className='text-sm mb-4'>
                앱 출시 소식을 받아보고 싶다면, 회원이 되어주세요!
              </p>

              <Link href='/auth/register'>
                <div
                  className='menu-item'
                  style={{ background: "#d4d0c8", marginBottom: "4px" }}
                >
                  <span className='text-lg font-bold'>✉️ 소식 알림 신청</span>
                  <p className='text-sm text-secondary'>
                    빠른 소식을 받아보세요
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <Link href='/posts'>
            <button className='menu-item'>커뮤니티</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
