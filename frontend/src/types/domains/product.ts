import { DateRange } from 'react-day-picker';
import { ContractConditionRequest } from '@/types/apis/productRequest';
import { Location } from '@/types/domains/location';

export type ProductStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'FINISH';
export type ProductCategory =
  | 'LIGHT_STICK'
  | 'SMART_PHONE'
  | 'TELESCOPE'
  | 'CAMERA_BODY'
  | 'CAMERA_LENS'
  | 'ETC';

export type ReturnType = 'DIRECT' | 'DELIVERY';

export type PostProcess =
  | 'PostInfoStep'
  | 'RentalInfoStep'
  | 'ContractInfoStep'
  | 'ContractPreviewStep';

export type PostInfo = {
  title: string;
  body: string;
  category: ProductCategory;
  images: (string | ArrayBuffer | null)[]|File[];
};

export type RentalInfo = {
  rentalDuration: DateRange;
  rentalFee: number;
  returnTypeList: string[];
  returnAddress: Location;
  rentalAddress: Location;
};

// 기존 타입들을 PostInfo와 RentalInfo를 조합하여 재정의
export type PostInfoStep = Partial<PostInfo> &
  Partial<RentalInfo> &
  Partial<ContractConditionRequest>;
export type RentalInfoStep = PostInfo &
  Partial<RentalInfo> &
  Partial<ContractConditionRequest>;
export type ContractInfoStep = PostInfo &
  RentalInfo &
  Partial<ContractConditionRequest>;
export type ContractPreviewStep = PostInfo &
  RentalInfo &
  ContractConditionRequest;
