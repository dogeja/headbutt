export default function About() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>About Us</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>순간의 가치를 담는 도구</h1>
          <div className='p-4' style={{ border: "var(--inset-border)" }}>
            <p className='mb-4'>
              카이로스는 삶의 결정적 순간을 포착하고 의미를 더하는 도구를
              만듭니다.
            </p>
            <h2 className='bold mb-2'>우리의 철학</h2>
            <div className='listview mb-4'>
              <div className='listview-item'>
                <span className='bold'>🎯 순간의 가치</span>
                <p className='text-sm'>
                  매 순간이 가진 고유한 의미를 발견하고 기록합니다
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>💻 작은 실천</span>
                <p className='text-sm'>
                  일상의 작은 실천이 모여 의미있는 변화를 만듭니다
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>📊 함께 성장</span>
                <p className='text-sm'>
                  사용자와 함께 성장하는 서비스를 지향합니다
                </p>
              </div>
            </div>

            <h2 className='bold mb-2'>우리의 약속</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-3' style={{ border: "var(--inset-border)" }}>
                <h3 className='bold mb-2'>Mission</h3>
                <p className='text-sm'>
                  일상의 순간을 의미있게 만드는 도구 제공
                </p>
              </div>
              <div className='p-3' style={{ border: "var(--inset-border)" }}>
                <h3 className='bold mb-2'>Vision</h3>
                <p className='text-sm'>모두의 삶에 영감을 주는 동반자</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
