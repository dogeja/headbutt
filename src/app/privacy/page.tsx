export default function Privacy() {
  return (
    <div className='p-4'>
      <div className='window'>
        <div className='window-header'>
          <span>개인정보처리방침</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <h1 className='text-xl bold mb-4'>카이로스 개인정보처리방침</h1>
          <div className='p-4' style={{ border: "var(--inset-border)" }}>
            <p className='mb-4 text-sm'>최종 업데이트: 2024년 3월 19일</p>

            <p className='text-sm mb-4'>
              카이로스(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보
              보호법」을 준수하기 위해 노력하고 있습니다. 회사는
              개인정보처리방침을 통하여 회사가 이용자로부터 수집하는 개인정보의
              항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간,
              개인정보의 제3자 제공 등에 관한 사항을 이용자에게 알려드립니다.
            </p>

            <h2 className='bold mb-2'>1. 수집하는 개인정보 항목</h2>
            <p className='text-sm mb-4'>
              회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
            </p>
            <ul className='text-sm mb-4 list-disc pl-5 space-y-2'>
              <li>필수항목: 이메일 주소, 비밀번호, 이름(닉네임)</li>
              <li>선택항목: 프로필 이미지, 연락처, 생년월일</li>
              <li>자동수집항목: IP 주소, 쿠키, 서비스 이용 기록, 기기 정보</li>
            </ul>

            <h2 className='bold mb-2'>2. 개인정보의 수집 및 이용 목적</h2>
            <p className='text-sm mb-4'>
              회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다:
            </p>
            <ul className='text-sm mb-4 list-disc pl-5 space-y-2'>
              <li>서비스 제공 및 계정 관리</li>
              <li>서비스 개선 및 개인화</li>
              <li>고객 지원 및 문의 응대</li>
              <li>서비스 이용 통계 분석</li>
              <li>마케팅 및 광고에의 활용 (별도 동의 시)</li>
            </ul>

            <h2 className='bold mb-2'>3. 개인정보의 보유 및 이용 기간</h2>
            <p className='text-sm mb-4'>
              회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할
              필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간
              동안 회원정보를 보관합니다:
            </p>
            <ul className='text-sm mb-4 list-disc pl-5 space-y-2'>
              <li>서비스 이용 기록: 3개월 (통신비밀보호법)</li>
              <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
              <li>
                대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)
              </li>
              <li>
                소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)
              </li>
            </ul>

            <p className='text-sm italic mt-8'>
              * 이 페이지는 예시용으로 생성되었으며, 실제 서비스 제공 시 법률
              전문가의 검토가 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
