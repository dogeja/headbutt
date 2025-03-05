import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-6 md:gap-10'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='font-bold text-xl'>HeadButt</span>
          </Link>

          <nav className='hidden md:flex gap-6'>
            <Link
              href='/about'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              소개
            </Link>
            <Link
              href='/features'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              기능
            </Link>
            <Link
              href='/pricing'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              가격
            </Link>
            <Link
              href='/contact'
              className='text-sm font-medium transition-colors hover:text-primary'
            >
              문의
            </Link>
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <Button variant='outline' size='sm' asChild>
            <Link href='/login'>로그인</Link>
          </Button>
          <Button size='sm' asChild className='hidden md:flex'>
            <Link href='/signup'>회원가입</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
