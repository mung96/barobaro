export type Bank = {
  name: string;
  value: string;
};

// 별도의 은행 코드가 있다면 'value'를 수정해 주세요

export const banks: Bank[] = [
  {
    name: '신한은행',
    value: 'shinhan',
  },
  {
    name: '하나은행',
    value: 'hana',
  },
  {
    name: '국민은행',
    value: 'kb',
  },
  {
    name: '농협은행',
    value: 'nh',
  },
  {
    name: '새마을금고',
    value: 'mg',
  },
  {
    name: '기업은행',
    value: 'ibk',
  },
  {
    name: '우리은행',
    value: 'woori',
  },
];

export const findBankNameByBankValue = (bankValue: string | undefined) => {
  // bank value로 이름 찾는 메서드

  if (typeof bankValue === 'undefined') return null;

  const bank = banks.find((each) => bankValue === each.value);
  return bank ? bank.name : null;
};
