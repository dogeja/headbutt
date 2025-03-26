"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function DesktopIcons() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // 아이콘 항목 정의
  const icons = [
    { name: "내 작업", icon: "📁", path: "/work" },
    { name: "커뮤니티", icon: "💬", path: "/posts" },
    { name: "정보", icon: "ℹ️", path: "/about" },
    { name: "FAQ", icon: "❓", path: "/faq" },
    { name: "문의하기", icon: "✉️", path: "/contact" },
  ];

  // 로그인 상태에 따라 마지막 아이콘 추가
  const userIcon = isAuthenticated
    ? { name: "마이페이지", icon: "👤", path: "/mypage" }
    : { name: "로그인", icon: "🔑", path: "/auth/login" };

  icons.push(userIcon);

  return (
    <div className='bg-[#c0c0c0] border border-[#ffffff_#808080_#808080_#ffffff] p-1 fixed bottom-0 left-0 right-0 flex justify-center'>
      {icons.map((item, index) => (
        <button
          key={index}
          onClick={() => router.push(item.path)}
          className='flex flex-col items-center p-2 mx-1 hover:bg-[#d4d0c8] focus:outline-none'
        >
          <div className='text-2xl'>{item.icon}</div>
          <span className='text-xs mt-1'>{item.name}</span>
        </button>
      ))}
    </div>
  );
}
