export type UserDataPassword = {
  needNewPassword: boolean;
  password: string;
};

export type UserProfile = {
  id: string;
  profileImage: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
};

export type UserAccount = {
  bank: string;
  accountNumber: string;
  accountId: number;
  main: boolean;
};
