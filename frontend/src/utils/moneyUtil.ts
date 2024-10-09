const units: string[] = ['', '만', '억', '조', '경'];
const digits: string[] = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];

export function convertMoneyNumberToKorean(price: number): string {
  if (price === 0) {
    return digits[0]; // "영"
  }

  let result: string[] = [];
  let unitIndex = 0;

  while (price > 0) {
    let chunk = price % 10000; // 1만 단위로 나눔
    if (chunk > 0) {
      let chunkStr: string[] = [];
      let digitIndex = 0;

      while (chunk > 0) {
        const digit = chunk % 10;
        if (digit > 0) {
          chunkStr.unshift(digits[digit] + (digitIndex > 0 ? units[digitIndex] : ''));
        }
        chunk = Math.floor(chunk / 10);
        digitIndex++;
      }

      result.unshift(chunkStr.join('') + units[unitIndex]);
    }
    price = Math.floor(price / 10000);
    unitIndex++;
  }

  return result.join('') + '원'; // "원" 추가
}
