"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // 초기 시간 설정
    updateTime();

    // 1분마다 시간 업데이트
    const interval = setInterval(updateTime, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // 12시간제로 변환
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시는 12시로 표시

    // 시간 문자열 포맷팅
    const timeString = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;
    setTime(timeString);
  };

  return (
    <div
      style={{
        border: "solid 2px",
        borderColor: "#808080 #ffffff #ffffff #808080",
        backgroundColor: "#ececec",
        padding: "2px 8px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80px",
        fontSize: "12px",
        fontFamily:
          '"MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif',
      }}
    >
      {time}
    </div>
  );
}
