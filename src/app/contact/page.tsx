export default function ContactPages() {
  return (
    <div className='container mx-auto py-12'>
      <h1 className='text-3xl font-bold mb-6'>기능 소개</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* 기능 카드 */}
        <div className='p-6 border rounded-lg shadow-sm'>
          <h2 className='text-xl font-semibold mb-2'>기능 1</h2>
          <p className='text-gray-500 dark:text-gray-400'>
            첫 번째 기능에 대한 설명입니다.
          </p>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h2 className='text-xl font-semibold mb-2'>기능 2</h2>
          <p className='text-gray-500 dark:text-gray-400'>
            두 번째 기능에 대한 설명입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
