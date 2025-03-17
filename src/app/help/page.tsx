export default function Help() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>도움말</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>워터베어러 이용 가이드</h1>
          <div className='p-4' style={{ border: "var(--inset-border)" }}>
            <p className='mb-4 text-sm'>
              워터베어러를 시작하는 데 도움이 필요하신가요? 아래 가이드를 참고해
              주세요.
            </p>

            <h2 className='bold mb-2'>시작하기</h2>
            <div className='listview mb-4'>
              <div className='listview-item'>
                <span className='bold'>🔸 계정 만들기</span>
                <p className='text-sm'>
                  워터베어러를 시작하려면 먼저 계정을 만들어야 합니다. 이메일
                  주소와 비밀번호를 입력하여 간단하게 가입할 수 있습니다.
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>🔸 프로필 설정</span>
                <p className='text-sm'>
                  계정을 만든 후 프로필 설정에서 닉네임과 프로필 이미지를 설정할
                  수 있습니다. 이는 선택사항이지만, 더 개인화된 경험을 위해
                  추천합니다.
                </p>
              </div>
            </div>

            <h2 className='bold mb-2'>주요 기능 사용법</h2>
            <div className='listview mb-4'>
              <div className='listview-item'>
                <span className='bold'>🔸 순간 기록하기</span>
                <p className='text-sm'>
                  메인 화면에서 "기록하기" 버튼을 클릭하여 새로운 순간을 기록할
                  수 있습니다. 제목, 내용, 태그를 입력하고 필요한 경우 이미지를
                  첨부하세요.
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>🔸 의미 부여하기</span>
                <p className='text-sm'>
                  기록된 순간에 의미를 부여하려면 해당 기록을 열고 "의미 부여"
                  탭을 선택하세요. 이 순간이 당신에게 어떤 의미가 있는지
                  작성하면 됩니다.
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>🔸 순간 검색하기</span>
                <p className='text-sm'>
                  상단의 검색창을 이용해 기록한 순간들을 검색할 수 있습니다.
                  키워드, 태그, 날짜 등 다양한 조건으로 검색이 가능합니다.
                </p>
              </div>
            </div>

            <h2 className='bold mb-2'>자주 묻는 질문</h2>
            <div className='p-3 mb-2' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 워터베어러의 모든 기능은 무료인가요?
              </h3>
              <p className='text-sm'>
                A: 워터베어러의 기본 기능은 무료로 제공됩니다. 다만, 추가 저장
                공간이나 고급 기능은 유료 구독을 통해 이용하실 수 있습니다.
              </p>
            </div>
            <div className='p-3 mb-2' style={{ border: "var(--inset-border)" }}>
              <h3 className='bold text-sm mb-1'>
                Q: 내 기록은 안전하게 보관되나요?
              </h3>
              <p className='text-sm'>
                A: 네, 모든 기록은 암호화되어 안전하게 저장됩니다. 또한 계정
                비밀번호 변경이나 2단계 인증 설정으로 보안을 강화할 수 있습니다.
              </p>
            </div>

            <p className='text-sm mt-8'>
              추가 문의사항이 있으시면{" "}
              <a href='/contact' className='text-blue-600 hover:underline'>
                문의하기
              </a>{" "}
              페이지를 통해 연락해 주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
