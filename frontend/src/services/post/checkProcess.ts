export default function checkStatus(data: string) {
  if (data === 'needLogin') return 1;
  if (data === 'isComplete') return 2;
  if (data === 'onlyWriter') return 3;
  return 0;
}
