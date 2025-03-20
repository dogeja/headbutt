export default function Contact() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>Contact Us</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>순간의 가치를 함께</h1>

          <div className='p-4 mb-4' style={{ border: "var(--inset-border)" }}>
            <h2 className='bold mb-2'>문의하기</h2>
            <p className='text-sm mb-4'>
              카이로스와 함께 당신만의 소중한 순간을 기록하고 의미를 더하고
              싶으신가요? 당신의 이야기를 듣고 함께 성장하고 싶습니다.
            </p>
            <div className='input mb-2' style={{ width: "100%" }}>
              contact@kairos.com
            </div>
            <button className='button'>메시지 보내기</button>
          </div>

          <div className='window'>
            <div className='window-header'>
              <span>Our Location</span>
            </div>
            <div className='window-content'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-3' style={{ border: "var(--inset-border)" }}>
                  <h3 className='bold mb-2'>카이로스 스튜디오</h3>
                  <p className='text-sm'>서울특별시 강남구</p>
                  <p className='text-sm'>운영 시간: 10:00 - 19:00</p>
                </div>
                <div className='p-3' style={{ border: "var(--inset-border)" }}>
                  <h3 className='bold mb-2'>Contact</h3>
                  <p className='text-sm'>Tel: 02-XXX-XXXX</p>
                  <p className='text-sm'>Email: hello@kairos.com</p>
                </div>
              </div>

              <div className='listview mt-4'>
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='listview-item'>
                    <span className='bold'>📸 Instagram</span>
                    <p className='text-sm'>@kairos_moments</p>
                  </div>
                </a>
                <a
                  href='https://blog.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='listview-item'>
                    <span className='bold'>📝 Blog</span>
                    <p className='text-sm'>카이로스의 순간들</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className='statusbar mt-4'>
            <span>✉️ 기회는 다가올 때 잡아야 합니다. 지금 연락하세요!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
