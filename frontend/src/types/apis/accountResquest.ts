export type AccountListRequest = {
  bank: string;
  accountNumber: string;
  accountId: number;
  main: boolean;
}[];

export type Account = {
  bank: string;
  accountNumber: string;
  accountId: number;
  main: boolean;
};
