"use client";

export default function Terms() {
  return (
    <div className='p-4'>
      <h1 className='text-xl bold mb-4'>워터베어러 서비스 이용약관</h1>
      <div className='p-4' style={{ border: "var(--inset-border)" }}>
        <p className='mb-4 text-sm'>최종 업데이트: 2024년 3월 19일</p>

        <h2 className='bold mb-2'>제1조 (목적)</h2>
        <p className='text-sm mb-4'>
          이 약관은 워터베어러(이하 "회사")가 제공하는 서비스의 이용조건 및
          절차, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>

        <h2 className='bold mb-2'>제2조 (용어의 정의)</h2>
        <p className='text-sm mb-4'>
          이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
        </p>
        <ol className='text-sm mb-4 list-decimal pl-5 space-y-2'>
          <li>"서비스"란 회사가 제공하는 모든 서비스를 의미합니다.</li>
          <li>"이용자"란 회사의 서비스를 이용하는 모든 사용자를 의미합니다.</li>
          <li>
            "계정"이란 이용자가 서비스를 이용하기 위해 필요한 정보를 의미합니다.
          </li>
        </ol>

        <h2 className='bold mb-2'>제3조 (약관의 효력 및 변경)</h2>
        <p className='text-sm mb-4'>
          1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.
          <br />
          2. 회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수
          있습니다.
          <br />
          3. 회사가 약관을 변경할 경우, 변경된 약관의 내용과 시행일을 명시하여
          서비스 내에 공지합니다.
          <br />
          4. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수
          있으며, 계속 사용하는 경우 약관 변경에 동의한 것으로 간주합니다.
        </p>

        <h2 className='bold mb-2'>제4조 (서비스의 제공 및 변경)</h2>
        <p className='text-sm mb-4'>
          1. 회사는 다음과 같은 서비스를 제공합니다:
          <br />
          &nbsp;&nbsp;&nbsp;① 결정적 순간 기록 및 관리 서비스
          <br />
          &nbsp;&nbsp;&nbsp;② 개인화된 의미부여 도구
          <br />
          &nbsp;&nbsp;&nbsp;③ 기타 회사가 추가 개발하거나 제휴를 통해 제공하는
          서비스
          <br />
          2. 회사는 서비스를 변경하거나 중단할 수 있습니다. 이 경우 회사는
          사전에 이를 공지합니다.
        </p>

        <p className='text-sm italic mt-8'>
          * 이 페이지는 예시용으로 생성되었으며, 실제 서비스 제공 시 법률
          전문가의 검토가 필요합니다.
        </p>
      </div>
    </div>
  );
}
