"use client";

export default function ContactPage() {
  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div
        className='p-4'
        style={{
          border: "var(--outset-border)",
          backgroundColor: "var(--button-face)",
        }}
      >
        <h1 className='text-2xl font-bold mb-6'>문의하기</h1>
        <div className='mb-4'>
          <p>워터베어러 팀에 문의사항이나 제안이 있으신가요?</p>
          <p>아래 양식을 통해 메시지를 보내주시면 빠르게 답변드리겠습니다.</p>
        </div>

        <form className='space-y-4'>
          <div>
            <label className='block mb-1'>이름</label>
            <input
              type='text'
              className='w-full p-2'
              style={{ border: "var(--inset-border)" }}
            />
          </div>

          <div>
            <label className='block mb-1'>이메일</label>
            <input
              type='email'
              className='w-full p-2'
              style={{ border: "var(--inset-border)" }}
            />
          </div>

          <div>
            <label className='block mb-1'>문의 내용</label>
            <textarea
              className='w-full p-2 h-32'
              style={{ border: "var(--inset-border)" }}
            />
          </div>

          <div>
            <button
              type='submit'
              className='px-4 py-2'
              style={{ border: "var(--outset-border)" }}
            >
              전송하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
