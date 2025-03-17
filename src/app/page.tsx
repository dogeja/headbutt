import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/ui/Clock";

export default function Home() {
  return (
    <div className='p-4'>
      {/* Windows 98 스타일 북마크 메뉴바 */}
      <div className='window mb-4'>
        <div
          style={{
            backgroundColor: "#c0c0c0",
            borderBottom: "solid 1px #808080",
            padding: "2px 4px",
            display: "flex",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            파일
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            편집
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            보기
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            북마크
          </div>
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#c0c0c0",
              marginRight: "4px",
              borderTop: "solid 1px #ffffff",
              borderLeft: "solid 1px #ffffff",
              borderRight: "solid 1px #808080",
              borderBottom: "solid 1px #808080",
            }}
          >
            도움말
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#c0c0c0",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "solid 1px #808080",
          }}
        >
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ◀
          </button>
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ▶
          </button>
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ↻
          </button>
          <div
            style={{
              height: "24px",
              width: "1px",
              backgroundColor: "#808080",
              margin: "0 4px",
            }}
          ></div>
          <div
            style={{
              flexGrow: 1,
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              backgroundColor: "#ffffff",
              height: "24px",
              padding: "2px 8px",
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            https://www.waterbearer.io/
          </div>
          <button
            style={{
              width: "24px",
              height: "24px",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              backgroundColor: "#c0c0c0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* 바탕화면 아이콘 섹션 */}
      <div className='window mb-4'>
        <div className='window-header'>
          <span>바탕화면</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-4'>
          <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
            <Link href='/work'>
              <div className='text-center'>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto",
                    border: "solid 1px #808080",
                    backgroundColor: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  📁
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    color: "#000000",
                  }}
                >
                  내 작업
                </p>
              </div>
            </Link>

            <Link href='/posts'>
              <div className='text-center'>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto",
                    border: "solid 1px #808080",
                    backgroundColor: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  💬
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    color: "#000000",
                  }}
                >
                  커뮤니티
                </p>
              </div>
            </Link>

            <Link href='/about'>
              <div className='text-center'>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto",
                    border: "solid 1px #808080",
                    backgroundColor: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  ℹ️
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    color: "#000000",
                  }}
                >
                  정보
                </p>
              </div>
            </Link>

            <Link href='/faq'>
              <div className='text-center'>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto",
                    border: "solid 1px #808080",
                    backgroundColor: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  ❓
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    color: "#000000",
                  }}
                >
                  FAQ
                </p>
              </div>
            </Link>

            <Link href='/contact'>
              <div className='text-center'>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto",
                    border: "solid 1px #808080",
                    backgroundColor: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  ✉️
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    color: "#000000",
                  }}
                >
                  문의하기
                </p>
              </div>
            </Link>

            <Link href='/auth/login'>
              <div className='text-center'>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    margin: "0 auto",
                    border: "solid 1px #808080",
                    backgroundColor: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  🔑
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    color: "#000000",
                  }}
                >
                  로그인
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 시작 윈도우 */}
      <div className='window mb-4'>
        <div className='window-header'>
          <span>워터베어러</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>

        <div className='window-content'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
              <div
                style={{
                  border: "solid 2px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
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
                <Link href='/work'>
                  <button
                    className='button'
                    style={{
                      border: "solid 2px",
                      borderColor: "#ffffff #808080 #808080 #ffffff",
                      backgroundColor: "#c0c0c0",
                      fontFamily:
                        '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                      outline: "1px solid black",
                      outlineOffset: "-1px",
                      fontSize: "12px",
                      padding: "4px 10px",
                    }}
                  >
                    서비스 살펴보기
                  </button>
                </Link>
                <Link href='/about'>
                  <button
                    className='button'
                    style={{
                      border: "solid 2px",
                      borderColor: "#ffffff #808080 #808080 #ffffff",
                      backgroundColor: "#c0c0c0",
                      fontFamily:
                        '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                      outline: "1px solid black",
                      outlineOffset: "-1px",
                      fontSize: "12px",
                      padding: "4px 10px",
                    }}
                  >
                    더 알아보기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 서비스 소개 */}
      <div className='window mb-4'>
        <div className='window-header'>
          <span>Our Services</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* 좌측 메뉴 */}
            <div
              className='service-menu'
              style={{
                border: "solid 2px",
                borderColor: "#808080 #ffffff #ffffff #808080",
                padding: "8px",
              }}
            >
              <div className='mb-2 font-bold'>서비스 목록:</div>
              <Link href='/work'>
                <div
                  className='menu-item p-2 hover:bg-gray-200'
                  style={{
                    backgroundColor: "#d4d0c8",
                    marginBottom: "4px",
                    border: "solid 1px",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                  }}
                >
                  <span className='text-lg font-bold'>💡 영감 기록</span>
                  <p className='text-sm text-secondary'>
                    순간의 아이디어를 놓치지 않다
                  </p>
                </div>
              </Link>
              <Link href='/about'>
                <div
                  className='menu-item p-2 hover:bg-gray-200'
                  style={{
                    backgroundColor: "#d4d0c8",
                    marginBottom: "4px",
                    border: "solid 1px",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                  }}
                >
                  <span className='text-lg font-bold'>🏃‍♂️ 건강 관리</span>
                  <p className='text-sm text-secondary'>
                    작은 변화가 쌓여 큰 힘이 되다
                  </p>
                </div>
              </Link>
              <Link href='/contact'>
                <div
                  className='menu-item p-2 hover:bg-gray-200'
                  style={{
                    backgroundColor: "#d4d0c8",
                    marginBottom: "4px",
                    border: "solid 1px",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                  }}
                >
                  <span className='text-lg font-bold'>✨ 함께하기</span>
                  <p className='text-sm text-secondary'>
                    더 나은 변화를 함께 만들다
                  </p>
                </div>
              </Link>
            </div>

            {/* 우측 정보 패널 */}
            <div
              className='info-panel'
              style={{
                border: "solid 2px",
                borderColor: "#808080 #ffffff #ffffff #808080",
                padding: "8px",
              }}
            >
              <h2
                className='text-xl font-bold mb-4'
                style={{ color: "#000080" }}
              >
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
                    단기적인 생산성 폭발이 아닌, 평생 유지할 수 있는 건강한
                    생산성 습관을 형성합니다.
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
        </div>
      </div>

      {/* 공지사항 섹션 */}
      <div className='window mb-4'>
        <div className='window-header'>
          <span>공지사항</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content'>
          <div
            style={{
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              padding: "8px",
              backgroundColor: "#ffffff",
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
                <tr>
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    2023.12.15
                  </td>
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    <a href='#' style={{ color: "#0000ff" }}>
                      워터베어러 서비스 업데이트 안내
                    </a>
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    2023.11.20
                  </td>
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    <a href='#' style={{ color: "#0000ff" }}>
                      신규 회원 이벤트 안내
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    2023.10.05
                  </td>
                  <td style={{ padding: "4px", border: "solid 1px #808080" }}>
                    <a href='#' style={{ color: "#0000ff" }}>
                      워터베어러 커뮤니티 오픈 안내
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='text-right mt-2'>
              <Link href='/posts'>
                <button
                  style={{
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    backgroundColor: "#c0c0c0",
                    fontFamily:
                      '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                    outline: "1px solid black",
                    outlineOffset: "-1px",
                    fontSize: "12px",
                    padding: "2px 8px",
                  }}
                >
                  더 보기...
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 환영 메시지 */}
      <div className='window'>
        <div className='window-header'>
          <span>환영합니다</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div className='window-content p-6 text-center'>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#ffffcc",
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              marginBottom: "16px",
            }}
          >
            <p className='mb-4'>워터베어러에 오신 것을 환영합니다!</p>
            <p>
              지금{" "}
              <Link
                href='/auth/register'
                style={{ color: "#0000ff", fontWeight: "bold" }}
              >
                회원가입
              </Link>
              을 하시고 다양한 서비스를 이용해보세요.
            </p>
          </div>

          <div className='flex justify-center gap-6 mt-4'>
            <Link href='/posts'>
              <button
                style={{
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                  fontSize: "12px",
                  padding: "4px 10px",
                }}
              >
                커뮤니티 방문하기
              </button>
            </Link>
            <Link href='/faq'>
              <button
                style={{
                  border: "solid 2px",
                  borderColor: "#ffffff #808080 #808080 #ffffff",
                  backgroundColor: "#c0c0c0",
                  fontFamily:
                    '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
                  outline: "1px solid black",
                  outlineOffset: "-1px",
                  fontSize: "12px",
                  padding: "4px 10px",
                }}
              >
                자주 묻는 질문
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Windows 98 스타일 상태 표시줄 */}
      <div
        className='mt-4'
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#c0c0c0",
          border: "solid 2px",
          borderColor: "#808080 #ffffff #ffffff #808080",
          padding: "2px 4px",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              backgroundColor: "#c0c0c0",
              border: "solid 2px",
              borderColor: "#ffffff #808080 #808080 #ffffff",
              padding: "2px 8px",
              marginRight: "8px",
              fontSize: "12px",
              height: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "4px" }}>🪟</span> 시작
          </button>

          <div
            style={{
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              backgroundColor: "#ececec",
              padding: "2px 8px",
              marginRight: "4px",
              height: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "4px" }}>📄</span> 홈페이지
          </div>

          <div
            style={{
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              backgroundColor: "#ececec",
              padding: "2px 8px",
              marginRight: "4px",
              height: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "4px" }}>🌐</span> 인터넷
          </div>

          <div
            style={{
              border: "solid 2px",
              borderColor: "#808080 #ffffff #ffffff #808080",
              backgroundColor: "#ececec",
              padding: "2px 8px",
              height: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "4px" }}>📧</span> 이메일
          </div>
        </div>

        <Clock />
      </div>
    </div>
  );
}
