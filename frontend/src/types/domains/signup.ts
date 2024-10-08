import { Dong } from '@/types/apis/location';
import { Location } from '@/types/domains/location';

export type SignUpProcess = 'MyInfoStep' | 'MyTownStep';

export type MyInfo = {
  nickname: string;
  profile: File|string;
};

export type MyTown = {
  town: Dong[];
};

export type MyInfoStep = Partial<MyInfo> & Partial<MyTown>;
export type MyTownStep = MyInfo & Partial<MyTown>;
