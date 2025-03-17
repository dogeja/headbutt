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
          <h1 className='text-xl bold mb-4'>
            워터베어러 - 지속의 지혜, 흐름의 철학
          </h1>
          <div className='p-4' style={{ border: "var(--inset-border)" }}>
            <p className='mb-4'>
              워터베어러(WaterBearer)는 고대 그리스의 철학자 클레안테스에게서
              영감을 받았습니다. 그는 낮에는 철학을 배우고 밤에는 물을 길어
              나르는 일을 하며 '물 긷는 자'라는 별명을 얻었습니다. 19년 동안의
              꾸준한 노력 끝에 스토아학파의 두 번째 지도자가 되었습니다.
            </p>
            <p className='mb-4'>
              현대사회에서 우리는 끊임없는 알림과 마감에 시달리고 있습니다.
              워터베어러는 이러한 혼란 속에서도 지속가능한 리듬을 찾고, 내면의
              동기에 집중하며, 본질적인 것에 에너지를 쏟는 방법을 제시합니다.
            </p>
            <h2 className='bold mb-2'>핵심 가치</h2>
            <div className='listview mb-4'>
              <div className='listview-item'>
                <span className='bold'>🎯 의미 있는 노력</span>
                <p className='text-sm'>
                  모든 일이 동등하게 중요하지 않습니다. 정말 중요한 일에
                  에너지를 집중하세요.
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>💻 지속가능한 리듬</span>
                <p className='text-sm'>
                  번아웃 없이 평생 유지할 수 있는 건강한 생산성 습관을
                  형성하세요.
                </p>
              </div>
              <div className='listview-item'>
                <span className='bold'>📊 내적 통제</span>
                <p className='text-sm'>
                  통제할 수 있는 것과 없는 것을 구분하고, 자신의 태도와 노력에
                  집중하세요.
                </p>
              </div>
            </div>

            <h2 className='bold mb-2'>물방울의 철학</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-3' style={{ border: "var(--inset-border)" }}>
                <h3 className='bold mb-2'>작은 물방울의 힘</h3>
                <p className='text-sm'>
                  물 한 방울은 작지만, 그것이 모여 강을 이루듯 우리의 작은
                  일상적 노력도 시간이 지나면 놀라운 결과를 만들어 냅니다.
                </p>
              </div>
              <div className='p-3' style={{ border: "var(--inset-border)" }}>
                <h3 className='bold mb-2'>지속의 가치</h3>
                <p className='text-sm'>
                  화려한 폭포수가 아닌, 지속적으로 흐르는 맑은 시냇물을
                  추구합니다. 매일의 작은 진전이 모여 깊은 강줄기를 이룹니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
