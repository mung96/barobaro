export const calculateDaysBetween = (from: Date, to: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // 하루를 밀리초로 변환
  const diffInTime = to?.getTime() - from?.getTime(); // 두 날짜의 차이를 밀리초로 계산
  return Math.round(diffInTime / oneDay) + 1; // 밀리초를 일수로 변환
};

//연월일만 표기
export const formatDate = (date: Date) => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
