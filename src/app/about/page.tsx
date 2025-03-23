"use client";

export default function AboutPage() {
  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div
        className='p-4'
        style={{
          border: "var(--outset-border)",
          backgroundColor: "var(--button-face)",
        }}
      >
        <h1 className='text-2xl font-bold mb-6'>정보</h1>
        <div className='prose'>
          <p>
            워터베어러(WaterBearer)는 고대 그리스 철학자 클레안테스의 이야기에서
            영감을 얻었습니다.
          </p>
          <p>
            '물 긷는 자'라는 별명으로 불리던 그는 낮에는 철학을 배우고 밤에는
            물을 길어 나르며 지속가능한 방식으로 자기계발을 이루어냈습니다.
          </p>
          <p>
            우리는 현대인의 삶에 이러한 지속가능한 리듬과 의미 있는 노력을
            접목시키는 도구를 제공합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
