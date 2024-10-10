import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getContract = async (chatRoomId: number) => {
  return await axiosInstance.get(END_POINT.CONTRACT, { params: { chatRoomId } });
};

export const postContractApprove = async (chatRoomId: number) => {
  return await axiosInstance.post(END_POINT.CONTRACT_APPROVE, {
    chatRoomId: chatRoomId,
  });
};

export const getContractRequest = async (chatRoomId: number) => {
  return await axiosInstance.get(END_POINT.CONTRACT_REQUEST, { params: { chatRoomId } });
};

type ContractRequest = {
  chatRoomId: number;
  desiredStartDate: Date;
  desiredEndDate: Date;
  returnType: string;
};

export const postContractRequest = async (data: ContractRequest) => {
  return await axiosInstance.post(END_POINT.CONTRACT_REQUEST, data);
};

type SignRequest = {
  chatRoomId: number;
  pinNumber: number;
  signatureData: string;
  s3FileUrl: string;
};
export const postOwnerSign = async (data: SignRequest) => {
  return await axiosInstance.post(END_POINT.CONTRACT_SIGN_OWNER, data);
};
export const postRentalSign = async (data: SignRequest) => {
  return await axiosInstance.post(END_POINT.CONTRACT_SIGN_RENTAL, data);
};
