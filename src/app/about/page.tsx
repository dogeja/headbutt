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
          <h1 className='text-xl bold mb-4'>카이로스 - 결정적 순간의 가치</h1>
          <div className='p-4' style={{ border: "var(--inset-border)" }}>
            <p className='mb-4'>
              카이로스(Καιρός)는 그리스어로 '결정적 순간' 또는 '적절한 기회'를
              의미합니다. 그리스 신화에서 카이로스는 앞머리만 길고 뒷머리는 없는
              모습으로 묘사되는데, 이는 "기회는 다가올 때 앞에서 잡아야 하며,
              지나가면 다시 붙잡을 수 없다"는 의미를 담고 있습니다.
            </p>
            <p className='mb-4'>
              우리 카이로스는 이러한 철학을 바탕으로 삶의 결정적 순간들을
              포착하고 의미를 더하는 도구를 만듭니다. 시간에는
              '크로노스(χρόνος)'와 '카이로스(καιρός)' 두 가지가 있습니다.
              크로노스가 기계적으로 흐르는 시간이라면, 카이로스는 인간에게
              중요한 의미를 지닌 특별한 순간을 뜻합니다.
            </p>
            <h2 className='bold mb-2'>핵심 가치</h2>
            <div className='listview mb-4'>
              <div className='listview-item'>
                <span className='bold'>🎯 순간의 가치</span>
                <p className='text-sm'>
                  일상에서 지나치기 쉬운 소중한 순간들을 포착하고 의미를
                  부여합니다.
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>💻 작은 실천</span>
                <p className='text-sm'>
                  의미 있는 변화는 작은 실천에서 시작됩니다. 카이로스는 그
                  첫걸음을 돕는 도구입니다.
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>📊 함께 성장</span>
                <p className='text-sm'>
                  사용자의 소중한 순간들이 모여 더 큰 가치를 만들어갑니다.
                </p>
              </div>
            </div>

            <h2 className='bold mb-2'>우리의 약속</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-3' style={{ border: "var(--inset-border)" }}>
                <h3 className='bold mb-2'>Mission</h3>
                <p className='text-sm'>
                  삶의 결정적 순간들을 놓치지 않고 기록하며, 그 가치를 높이는
                  도구를 제공합니다.
                </p>
              </div>
              <div className='p-3' style={{ border: "var(--inset-border)" }}>
                <h3 className='bold mb-2'>Vision</h3>
                <p className='text-sm'>
                  모든 이가 자신만의 '카이로스 순간'을 발견하고 의미를 더할 수
                  있도록 영감을 주는 동반자가 되겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
