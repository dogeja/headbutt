"use client";

import React from "react";
import Image from "next/image";

export default function MyPage() {
  return (
    <div className='p-4'>
      {/* 마이페이지 */}
      <div className='window mb-4 max-w-4xl mx-auto' style={{ height: "auto" }}>
        <div className='window-header'>
          <span>마이페이지</span>
          <div className='window-controls'>
            <button className='window-control'>─</button>
            <button className='window-control'>□</button>
            <button className='window-control'>×</button>
          </div>
        </div>
        <div
          className='window-content p-4'
          style={{ height: "auto", minHeight: "auto" }}
        >
          <div className='flex flex-col md:flex-row gap-6'>
            {/* 사용자 프로필 */}
            <div className='md:w-1/3'>
              <div
                style={{
                  border: "solid 2px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "16px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#c0c0c0",
                    border: "solid 2px",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    marginBottom: "12px",
                  }}
                >
                  👤
                </div>
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "solid 1px",
                    borderColor: "#808080 #ffffff #ffffff #808080",
                    padding: "8px",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>사용자 이름</div>
                  <div style={{ color: "#666", fontSize: "12px" }}>
                    user@example.com
                  </div>
                </div>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#c0c0c0",
                    border: "solid 2px",
                    borderColor: "#ffffff #808080 #808080 #ffffff",
                    padding: "4px 8px",
                    marginTop: "8px",
                  }}
                >
                  프로필 편집
                </button>
              </div>
            </div>

            {/* 사용자 활동 */}
            <div className='md:w-2/3'>
              <div
                style={{
                  border: "solid 2px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "12px",
                  backgroundColor: "#f0f0f0",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#000080",
                    color: "#ffffff",
                    padding: "4px 8px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  내 활동 요약
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      border: "solid 1px",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      padding: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>최근 접속일</div>
                    <div>2023년 12월 30일 14:25</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      border: "solid 1px",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      padding: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>내 글</div>
                    <div>3개의 게시글 | 5개의 댓글</div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      border: "solid 1px",
                      borderColor: "#808080 #ffffff #ffffff #808080",
                      padding: "8px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>알림</div>
                    <div>2개의 새로운 알림이 있습니다.</div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "solid 2px",
                  borderColor: "#808080 #ffffff #ffffff #808080",
                  padding: "12px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#000080",
                    color: "#ffffff",
                    padding: "4px 8px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  나의 작업
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#c0c0c0",
                      border: "solid 2px",
                      borderColor: "#ffffff #808080 #808080 #ffffff",
                      padding: "12px",
                      width: "calc(50% - 4px)",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "24px",
                        }}
                      >
                        📝
                      </div>
                      <div>새 작업 만들기</div>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#c0c0c0",
                      border: "solid 2px",
                      borderColor: "#ffffff #808080 #808080 #ffffff",
                      padding: "12px",
                      width: "calc(50% - 4px)",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "24px",
                        }}
                      >
                        📋
                      </div>
                      <div>내 작업 목록</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
