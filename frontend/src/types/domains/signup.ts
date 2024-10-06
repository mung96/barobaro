import { Location } from '@/types/domains/location';

export type SignUpProcess = 'MyInfoStep' | 'MyTownStep';

export type MyInfo = {
  nickname: string;
  profile: string;
};

export type MyTown = {
  town: Location[];
};

export type MyInfoStep = Partial<MyInfo> & Partial<MyTown>;
export type MyTownStep = MyInfo & Partial<MyTown>;
