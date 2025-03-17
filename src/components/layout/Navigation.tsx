"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  // 간소화된 네비게이션 메뉴
  const mainMenuItems = [
    { label: "소개", href: "/about" },
    { label: "서비스", href: "/work" },
    { label: "커뮤니티", href: "/posts" },
    { label: "문의하기", href: "/contact" },
  ];

  return (
    <nav className='main-navigation'>
      <div className='brand-section'>
        <Link href='/' className='brand-logo'>
          워터베어러
        </Link>
      </div>

      <ul className='nav-menu'>
        {mainMenuItems.map((item) => (
          <li
            key={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
