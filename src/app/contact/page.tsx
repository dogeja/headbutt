export default function Contact() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>Contact Us</span>
          <div className='window-controls'>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>프로젝트 문의</h1>

          <div className='p-4 mb-4' style={{ border: "var(--inset-border)" }}>
            <h2 className='bold mb-2'>상담 및 견적</h2>
            <p className='text-sm mb-4'>
              프로젝트에 대한 상담이 필요하신가요? 전문 컨설턴트가 최적의
              솔루션을 제안해드립니다.
            </p>
            <div className='input mb-2' style={{ width: "100%" }}>
              contact@kairos-digital.com
            </div>
            <button className='button'>상담 요청하기</button>
          </div>

          <div className='window'>
            <div className='window-header'>
              <span>Office Information</span>
            </div>
            <div className='window-content'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-3' style={{ border: "var(--inset-border)" }}>
                  <h3 className='bold mb-2'>본사</h3>
                  <p className='text-sm'>서울특별시 강남구</p>
                  <p className='text-sm'>업무 시간: 09:00 - 18:00</p>
                </div>
                <div className='p-3' style={{ border: "var(--inset-border)" }}>
                  <h3 className='bold mb-2'>Contact</h3>
                  <p className='text-sm'>Tel: 02-XXX-XXXX</p>
                  <p className='text-sm'>Fax: 02-XXX-XXXX</p>
                </div>
              </div>

              <div className='listview mt-4'>
                <a
                  href='https://linkedin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='listview-item'>
                    <span className='bold'>💼 LinkedIn</span>
                    <p className='text-sm'>기업 페이지</p>
                  </div>
                </a>
                <a
                  href='https://github.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='listview-item'>
                    <span className='bold'>📱 Blog</span>
                    <p className='text-sm'>기술 블로그</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className='statusbar mt-4'>
            <span>✉️ 24시간 이내 답변 드리겠습니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
