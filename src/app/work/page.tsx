export default function Work() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>Our Services</span>
          <div className='window-controls'>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl mb-4'>작은 실천이 만드는 의미 있는 변화</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* 서비스 1 */}
            <div className='p-4' style={{ border: "var(--inset-border)" }}>
              <h2 className='bold mb-2'>영감 기록 서비스</h2>
              <p className='text-sm mb-4'>
                순간의 영감을 놓치지 않고 기록하여 의미 있는 아이디어로
                발전시키는 공간
              </p>
              <ul className='text-sm space-y-2'>
                <li>• 직관적인 메모 도구</li>
                <li>• 아이디어 발전 트래커</li>
                <li>• 영감 공유 커뮤니티</li>
              </ul>
            </div>

            {/* 서비스 2 */}
            <div className='p-4' style={{ border: "var(--inset-border)" }}>
              <h2 className='bold mb-2'>건강 관리 도구</h2>
              <p className='text-sm mb-4'>
                일상의 작은 움직임이 건강한 습관으로 이어지는 여정을 함께합니다
              </p>
              <ul className='text-sm space-y-2'>
                <li>• 개인화된 운동 계획</li>
                <li>• 성장 기록 다이어리</li>
                <li>• 동기부여 시스템</li>
              </ul>
            </div>
          </div>

          {/* 기술 스택 */}
          <div className='mt-6'>
            <div className='window'>
              <div className='window-header'>
                <span>Development Approach</span>
              </div>
              <div className='window-content'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div
                    className='p-3'
                    style={{ border: "var(--inset-border)" }}
                  >
                    <h3 className='bold mb-2'>사용자 중심</h3>
                    <ul className='text-sm space-y-1'>
                      <li>• 직관적 인터페이스</li>
                      <li>• 개인화된 경험</li>
                      <li>• 피드백 반영</li>
                    </ul>
                  </div>
                  <div
                    className='p-3'
                    style={{ border: "var(--inset-border)" }}
                  >
                    <h3 className='bold mb-2'>지속가능성</h3>
                    <ul className='text-sm space-y-1'>
                      <li>• 안정적 시스템</li>
                      <li>• 꾸준한 업데이트</li>
                      <li>• 성장하는 기능</li>
                    </ul>
                  </div>
                  <div
                    className='p-3'
                    style={{ border: "var(--inset-border)" }}
                  >
                    <h3 className='bold mb-2'>가치 창출</h3>
                    <ul className='text-sm space-y-1'>
                      <li>• 의미있는 데이터</li>
                      <li>• 실천의 동기부여</li>
                      <li>• 함께하는 성장</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
