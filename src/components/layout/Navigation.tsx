"use client";

import { useRouter } from "next/navigation";

export function Navigation() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className='navigation'>
      <button className='nav-button' onClick={goBack} title='뒤로 가기'>
        ⬅️
      </button>
      <button className='nav-button' onClick={goHome} title='홈으로'>
        🏠
      </button>
    </div>
  );
}
