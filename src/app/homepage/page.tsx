"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./homepage.module.css";
import { useAuth } from "@/lib/contexts/AuthContext";

// 윈도우 컴포넌트를 재사용 가능한 형태로 추출
const WindowComponent = ({
  title,
  children,
  maxWidth = "max-w-4xl",
}: {
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) => (
  <div className={`${styles.window} ${styles.mb1} ${maxWidth} mx-auto`}>
    <div className={styles.windowHeader}>
      <span>{title}</span>
      <div className={styles.windowControls}>
        <button className={styles.windowControl}>─</button>
        <button className={styles.windowControl}>□</button>
        <button className={styles.windowControl}>×</button>
      </div>
    </div>
    <div className={styles.windowContent}>{children}</div>
  </div>
);

export default function Homepage() {
  // Next.js의 Router 사용 (SPA 내비게이션)
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // 중복해서 사용되는 스타일
  const borderStyle = {
    border: "solid 2px",
    borderColor: "#808080 #ffffff #ffffff #808080",
    padding: "8px",
  };

  // 내비게이션 단순화
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      {/* 워터베어러 섹션 */}
      <WindowComponent title='워터베어러' maxWidth='max-w-6xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
          <div className='feature-card'>
            <div
              style={{
                position: "relative",
                border: "solid 2px",
                borderColor: "#808080 #ffffff #ffffff #808080",
                padding: "8px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <div
                style={{
                  backgroundColor: "#000080",
                  color: "#ffffff",
                  padding: "2px 4px",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                }}
              >
                이미지 뷰어 - cleanthes.png
              </div>

              <div
                style={{
                  border: "solid 1px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "4px",
                  backgroundColor: "#ffffff",
                  position: "relative",
                  maxHeight: "350px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src='/images/projects/info_img01.png'
                  alt='cleanthes'
                  width={300}
                  height={400}
                  className='rounded-lg'
                  style={{
                    objectFit: "cover",
                    margin: "0 auto",
                    border: "solid 1px #000000",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                <button
                  style={{
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    backgroundColor: "#c0c0c0",
                    padding: "2px 8px",
                    fontSize: "12px",
                    fontFamily:
                      '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                    outline: "1px solid black",
                    outlineOffset: "-1px",
                  }}
                >
                  확대
                </button>
                <button
                  style={{
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    backgroundColor: "#c0c0c0",
                    padding: "2px 8px",
                    fontSize: "12px",
                    fontFamily:
                      '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                    outline: "1px solid black",
                    outlineOffset: "-1px",
                  }}
                >
                  축소
                </button>
                <button
                  style={{
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    backgroundColor: "#c0c0c0",
                    padding: "2px 8px",
                    fontSize: "12px",
                    fontFamily:
                      '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                    outline: "1px solid black",
                    outlineOffset: "-1px",
                  }}
                >
                  저장
                </button>
              </div>

              <p
                className='text-sm mt-4 text-center text-secondary'
                style={{
                  fontSize: "12px",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  padding: "4px",
                  backgroundColor: "#ffffcc",
                  border: "solid 1px #808080",
                }}
              >
                "기회는 다가올 때 앞에서 잡아야 하며, 지나가면 다시 붙잡을 수
                없다"
              </p>
            </div>
          </div>
          <div>
            <h1
              className='text-2xl font-bold mb-6'
              style={{
                fontFamily:
                  '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                color: "#000080",
              }}
            >
              워터베어러 - 지속의 지혜, 흐름의 철학
            </h1>
            <div style={borderStyle}>
              <p className='mb-6 text-secondary'>
                워터베어러(WaterBearer)는 고대 그리스 철학자 클레안테스의
                이야기에서 영감을 얻었습니다. '물 긷는 자'라는 별명으로 불리던
                그는 낮에는 철학을 배우고 밤에는 물을 길어 나르며 지속가능한
                방식으로 자기계발을 이루어냈습니다.
                <br />
                <br />
                우리는 현대인의 삶에 이러한 지속가능한 리듬과 의미 있는 노력을
                접목시키는 도구를 제공합니다. 끊임없는 알림과 압박 속에서도
                자신의 리듬을 찾고 진정한 가치에 집중할 수 있도록 돕습니다.
              </p>
            </div>
            <div className='flex gap-4 mt-4'>
              <button
                className={styles.winButton}
                onClick={() => navigateTo("/work")}
              >
                서비스 살펴보기
              </button>
              <button
                className={styles.winButton}
                onClick={() => navigateTo("/about")}
              >
                더 알아보기
              </button>
            </div>
          </div>
        </div>
      </WindowComponent>

      {/* 서비스 소개 */}
      <WindowComponent title='Our Services' maxWidth='max-w-5xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
          {/* 좌측 메뉴 */}
          <div className='service-menu' style={borderStyle}>
            <div className='mb-2 font-bold'>서비스 목록:</div>
            {[
              {
                icon: "💡",
                title: "영감 기록",
                desc: "순간의 아이디어를 놓치지 않다",
                path: "/work",
              },
              {
                icon: "🏃‍♂️",
                title: "건강 관리",
                desc: "작은 변화가 쌓여 큰 힘이 되다",
                path: "/about",
              },
              {
                icon: "✨",
                title: "함께하기",
                desc: "더 나은 변화를 함께 만들다",
                path: "/contact",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className='menu-item p-2 hover:bg-gray-200'
                onClick={() => navigateTo(item.path)}
                style={{
                  backgroundColor: "#d4d0c8",
                  marginBottom: "4px",
                  border: "solid 1px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  cursor: "pointer",
                }}
              >
                <span className='text-lg font-bold'>
                  {item.icon} {item.title}
                </span>
                <p className='text-sm text-secondary'>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 우측 정보 패널 */}
          <div className='info-panel' style={borderStyle}>
            <h2 className='text-xl font-bold mb-4' style={{ color: "#000080" }}>
              우리의 약속
            </h2>
            <div
              className='value-list'
              style={{
                backgroundColor: "#ffffff",
                padding: "8px",
                border: "solid 1px",
                borderColor: "#808080 #ffffff #ffffff #808080",
              }}
            >
              <div
                className='value-item'
                style={{
                  borderBottom: "1px dotted #999",
                  paddingBottom: "4px",
                  marginBottom: "4px",
                }}
              >
                <span className='font-bold'>▶ 핵심 가치</span>
                <p>
                  정말 중요한 일에 에너지를 집중하고, 나머지는 과감히 내려놓을
                  수 있는 지혜를 추구합니다.
                </p>
              </div>
              <div className='value-item' style={{ paddingBottom: "4px" }}>
                <span className='font-bold'>▶ 지향점</span>
                <p>
                  단기적인 생산성 폭발이 아닌, 평생 유지할 수 있는 건강한 생산성
                  습관을 형성합니다.
                </p>
              </div>
            </div>
            <div
              className='quote-box'
              style={{
                backgroundColor: "#ffffcc",
                border: "1px solid #999",
                padding: "8px",
                marginTop: "12px",
              }}
            >
              <p className='text-sm italic'>
                "워터베어러 - 지속의 지혜, 흐름의 철학"
              </p>
            </div>
          </div>
        </div>
      </WindowComponent>

      {/* 공지사항 섹션 */}
      <WindowComponent title='공지사항'>
        <div
          style={{
            ...borderStyle,
            backgroundColor: "#ffffff",
            marginBottom: "0",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#c0c0c0" }}>
                <th
                  style={{
                    padding: "4px",
                    border: "solid 1px #808080",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  날짜
                </th>
                <th
                  style={{
                    padding: "4px",
                    border: "solid 1px #808080",
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  제목
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2023.12.15",
                  title: "워터베어러 서비스 업데이트 안내",
                },
                { date: "2023.11.20", title: "신규 회원 이벤트 안내" },
                { date: "2023.10.05", title: "워터베어러 커뮤니티 오픈 안내" },
              ].map((notice, idx) => (
                <tr
                  key={idx}
                  style={{ backgroundColor: idx % 2 === 1 ? "#f0f0f0" : "" }}
                >
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    {notice.date}
                  </td>
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    <span
                      className='cursor-pointer text-blue-700 hover:underline'
                      onClick={() => navigateTo("/posts")}
                    >
                      {notice.title}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='text-right mt-2'>
            <button
              onClick={() => navigateTo("/posts")}
              className={styles.winButton}
            >
              더 보기...
            </button>
          </div>
        </div>
      </WindowComponent>
    </div>
  );
}
