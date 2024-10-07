export default function convertProductStatus(data: string) {
  if (data === 'AVAILABLE') return '대여가능';
  if (data === 'IN_PROGRESS') return '대여진행중';
  return '대여완료';
}
