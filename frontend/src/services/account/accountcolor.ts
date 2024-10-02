import { Account } from '@/types/apis/accountResquest';

const bankData: { [key: string]: string } = {
  국민은행: '#ffbc00',
  신한은행: '#0046ff',
};

// eslint-disable-next-line import/prefer-default-export
export function convertAccountColor(account: Account) {
  return bankData[account.bank];
}
