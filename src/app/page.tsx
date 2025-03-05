import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>테스트 페이지</CardTitle>
          <CardDescription>Next.js + Tailwind CSS + shadcn/ui</CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-gray-500 dark:text-gray-400'>
            성공적으로 설치가 완료되었습니다! 이제 이 템플릿을 기반으로
            웹사이트를 구축해보세요.
          </p>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>취소</Button>
          <Button>확인</Button>
        </CardFooter>
      </Card>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl'>
        <Card>
          <CardHeader>
            <CardTitle>기능 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p>첫 번째 기능에 대한 설명입니다.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>기능 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p>두 번째 기능에 대한 설명입니다.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
