export default function FAQ() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>자주 묻는 질문</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>워터베어러 FAQ</h1>
          <div className='p-4' style={{ border: "var(--inset-border)" }}>
            <p className='mb-4 text-sm'>
              워터베어러를 이용하시면서 자주 물어보시는 질문들에 대한 답변을
              모았습니다.
            </p>

            <h2 className='bold mb-2'>서비스 이용</h2>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 워터베어러는 어떤 서비스인가요?
              </h3>
              <p className='text-sm'>
                A: 워터베어러는 지속가능한 생산성과 의미 있는 성취를 돕는
                서비스입니다. 일상의 작은 노력이 모여 큰 변화를 만들 수 있도록
                도와드립니다.
              </p>
            </div>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 워터베어러를 무료로 이용할 수 있나요?
              </h3>
              <p className='text-sm'>
                A: 네, 워터베어러의 기본 기능은 무료로 이용하실 수 있습니다.
                다만 추가 저장 공간이나 고급 기능은 유료 구독을 통해 이용
                가능합니다.
              </p>
            </div>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>Q: 모바일 앱도 있나요?</h3>
              <p className='text-sm'>
                A: 현재 iOS와 Android용 모바일 앱을 개발 중입니다. 출시 소식은
                홈페이지와 뉴스레터를 통해 알려드릴 예정입니다.
              </p>
            </div>

            <h2 className='bold mb-2'>계정</h2>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 비밀번호를 잊어버렸어요. 어떻게 해야 하나요?
              </h3>
              <p className='text-sm'>
                A: 로그인 페이지에서 '비밀번호 찾기' 링크를 클릭하면, 가입 시
                등록한 이메일로 비밀번호 재설정 링크를 보내드립니다.
              </p>
            </div>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 계정 삭제는 어떻게 하나요?
              </h3>
              <p className='text-sm'>
                A: 프로필 설정 페이지에서 '계정 관리' 메뉴를 통해 계정 삭제가
                가능합니다. 단, 계정 삭제 시 모든 데이터가 영구적으로 삭제되니
                신중하게 선택해 주세요.
              </p>
            </div>

            <h2 className='bold mb-2'>데이터 및 보안</h2>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 내 기록은 어떻게 보호되나요?
              </h3>
              <p className='text-sm'>
                A: 모든 데이터는 암호화되어 저장되며, 엄격한 보안 정책에 따라
                관리됩니다. 또한 2단계 인증 설정을 통해 계정 보안을 강화하실 수
                있습니다.
              </p>
            </div>
            <div className='p-3 mb-4' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 데이터 백업은 어떻게 하나요?
              </h3>
              <p className='text-sm'>
                A: 설정 메뉴의 '데이터 관리'에서 모든 기록을 CSV 또는 JSON
                형식으로 내보내기할 수 있습니다. 정기적인 백업을 권장드립니다.
              </p>
            </div>

            <p className='text-sm mt-8'>
              여기에서 답변을 찾지 못하셨나요?{" "}
              <a href='/contact' className='text-blue-600 hover:underline'>
                문의하기
              </a>{" "}
              페이지를 통해 추가 질문을 보내주시면 24시간 이내에 답변
              드리겠습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
