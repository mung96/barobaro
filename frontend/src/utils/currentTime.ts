const currentTime: (type?: string) => string = (type) => {
  const now = new Date();

  const dateStr = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return type === 'date' ? dateStr : timeStr;
};

export default currentTime;
