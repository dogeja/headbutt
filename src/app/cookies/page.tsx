export default function Cookies() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>쿠키 정책</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>카이로스 쿠키 정책</h1>
          <div className='p-4' style={{ border: "var(--inset-border)" }}>
            <p className='mb-4 text-sm'>최종 업데이트: 2024년 3월 19일</p>

            <p className='text-sm mb-4'>
              카이로스(이하 "회사")는 이용자에게 더 나은 서비스를 제공하기 위해
              쿠키를 사용합니다. 이 쿠키 정책은 회사가 쿠키를 어떻게 사용하는지,
              어떤 종류의 쿠키를 사용하는지, 그리고 이용자가 쿠키를 어떻게
              관리할 수 있는지에 대한 정보를 제공합니다.
            </p>

            <h2 className='bold mb-2'>1. 쿠키란 무엇인가요?</h2>
            <p className='text-sm mb-4'>
              쿠키는 이용자가 웹사이트를 방문할 때 이용자의 컴퓨터나 모바일
              기기에 저장되는 작은 텍스트 파일입니다. 쿠키는 웹사이트가 이용자의
              기기를 인식하고, 이용자의 선호도를 기억하며, 웹사이트 사용 경험을
              개선하는 데 도움을 줍니다.
            </p>

            <h2 className='bold mb-2'>2. 카이로스가 사용하는 쿠키의 종류</h2>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>필수 쿠키</h3>
              <p className='text-sm'>
                웹사이트의 기본적인 기능을 활성화하는 데 필요한 쿠키입니다. 이
                쿠키 없이는 웹사이트가 제대로 작동하지 않을 수 있습니다.
              </p>
            </div>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>기능 쿠키</h3>
              <p className='text-sm'>
                이용자의 웹사이트 사용 경험을 향상시키기 위해 사용되는
                쿠키입니다. 예를 들어, 이용자의 언어 선호도나 로그인 상태를
                기억합니다.
              </p>
            </div>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>분석 쿠키</h3>
              <p className='text-sm'>
                이용자가 웹사이트를 어떻게 사용하는지 정보를 수집하여 서비스를
                개선하는 데 사용되는 쿠키입니다. 이용자의 방문 횟수, 체류 시간,
                이용 패턴 등을 분석합니다.
              </p>
            </div>

            <h2 className='bold mb-2'>3. 쿠키 관리 방법</h2>
            <p className='text-sm mb-4'>
              대부분의 웹 브라우저는 쿠키를 관리할 수 있는 기능을 제공합니다.
              이용자는 브라우저 설정을 통해 쿠키를 허용하거나 차단할 수 있으며,
              기존에 저장된 쿠키를 삭제할 수도 있습니다. 브라우저별 쿠키 관리
              방법은 다음과 같습니다:
            </p>
            <ul className='text-sm mb-4 list-disc pl-5 space-y-2'>
              <li>
                Chrome: 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터
              </li>
              <li>Firefox: 설정 → 개인 정보 및 보안 → 쿠키 및 사이트 데이터</li>
              <li>
                Safari: 환경설정 → 개인정보 보호 → 쿠키 및 웹사이트 데이터
              </li>
              <li>
                Edge: 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리
              </li>
            </ul>

            <p className='text-sm italic mt-8'>
              * 이 페이지는 예시용으로 생성되었으며, 실제 서비스 제공 시 법률
              전문가의 검토가 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
