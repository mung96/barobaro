import {
  ProductCategory,
  ProductStatus,
  ReturnType,
} from '@/types/domains/product';
import { UUID } from 'crypto';

export type ProductResponse = {
  productId: number;
  writerId: UUID;
  writerProfileImage: string;
  writerNickname: string;
  imageList: string[];
  productStatus: ProductStatus;
  title: string;
  category: ProductCategory;
  dong: string;
  createdAt: string;
  wishCount: number;
  content: string;
  place: string;
  latitude: number;
  longitude: number;
  isWriteContract: boolean;
  contractCondition: {
    repairVendor: string;
    overdueCriteria: number;
    overdueFee: number;
    theftCriteria: number;
    refundDeadline: number;
  };
  returnTypes: ReturnType[];
  startDate: string;
  endDate: string;
  rentalFee: number;
  isMine: boolean;
};

export type ProductContent = {
  title: string;
  productStatus: string;
  wishCount: number;
  content: string;
  place: string;
  latitude: number;
  longitude: number;
};

export type ContractContent = {
  isWriteContract: boolean;
  contractCondition: {
    repairVendor: string;
    overdueCriteria: number;
    overdueFee: number;
    theftCriteria: number;
    refundDeadline: number;
  };
};

const contractData = {
  isWriteContract: true,
  contractCondition: {
    repairVendor: '제조사 또는 공식 수입사의 AS 센터',
    overdueCriteria: 5,
    overdueFee: 2,
    theftCriteria: 7,
    refundDeadline: 7,
  },
};
