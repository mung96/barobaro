import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export type ContractRequest = {
  chatRoomId: number;
  desiredStartDate: string;
  desiredEndDate: string;
  returnType: string;
};

export type SignRequest = {
  chatRoomId: number;
  pinNumber: number;
  signatureData: string;
  s3FileUrl: string;
};

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

export const postContractRequest = async (data: ContractRequest) => {
  console.log(data);
  return await axiosInstance.post(END_POINT.CONTRACT_REQUEST, data);
};

export const postOwnerSign = async (data: SignRequest) => {
  return await axiosInstance.post(END_POINT.CONTRACT_SIGN_OWNER, data);
};
export const postRentalSign = async (data: SignRequest) => {
  return await axiosInstance.post(END_POINT.CONTRACT_SIGN_RENTAL, data);
};
