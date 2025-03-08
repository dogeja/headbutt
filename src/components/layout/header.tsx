import Link from "next/link";

export function Header() {
  return (
    <header className='top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 h-16 flex items-center'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-6 md:gap-10'>
            <Link href='/' className='flex items-center space-x-2'>
              <span className='font-bold text-xl'>καιρός</span>
            </Link>

            <nav className='hidden md:flex gap-6'>
              <Link
                href='/about'
                className='text-sm font-medium transition-colors hover:text-primary'
              >
                소개
              </Link>
              <Link
                href='/work'
                className='text-sm font-medium transition-colors hover:text-primary'
              >
                작업물
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
            <Link
              href='/login'
              className='text-sm font-medium px-4 py-2 border rounded-md hover:bg-gray-100'
            >
              로그인
            </Link>
            <Link
              href='/signup'
              className='text-sm font-medium px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 hidden md:inline-flex'
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
