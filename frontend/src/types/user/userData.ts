export type UserDataPassword = {
  needNewPassword: boolean;
  password: string;
};

export type UserProfile = {
  profileImage: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  name: string;
};

export type UserAccount = {
  bank: string;
  accountNumber: string;
  accountId: number;
  main: boolean;
};
