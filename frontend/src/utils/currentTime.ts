const currentTime: (type?: string) => string = (type) => {
  // 파라메터로 'date' 들어오면 YYYY년 MM월 DD일 리턴
  // 'back' 들어오면 LocalDateTime format에 맞춘 yyyy-mm-ddThh:mm:ss 리턴
  // 파라메터 없으면 현재시각 HH:MM 리턴
  // 기타 문자열(BE에서 온 LocalDateTime format) 들어오면 HH:MM 형태로 바꿔서 리턴

  const now = new Date();

  const dateStr = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const fileStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`; // YYMMDD
  const backStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${seconds}`;

  if (type === 'file') return fileStr;
  if (type && type !== 'date' && type !== 'back') {
    return type?.split('T')[1].slice(0, 5);
  }
  return type === 'date' ? dateStr : type === 'back' ? backStr : timeStr;
};

export default currentTime;
