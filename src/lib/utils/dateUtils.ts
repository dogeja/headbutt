export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  const now = new Date();

  // 오늘 작성된 글이면 시간만 표시
  if (date.toDateString() === now.toDateString()) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  // 올해 작성된 글이면 월/일 표시
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  }

  // 그 외에는 연/월/일 표시
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}
