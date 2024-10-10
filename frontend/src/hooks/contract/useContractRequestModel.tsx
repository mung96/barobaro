import { useCallback } from 'react';

import { useController, useForm } from 'react-hook-form';

import { postProduct } from '@/apis/productApi';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { ContractRequest, postContractRequest } from '@/apis/contractApi';
import { formatDate } from '@/utils/dayUtil';
export type ContractRequestInfo = {
    rentalDuration: DateRange;
    returnType: string;
};
const useContractRequestModel = (charRoomId: number) => {
    const { control,
        formState: { errors, isValid: isFormValid, isSubmitting },
        handleSubmit, getValues
    } = useForm<ContractRequestInfo>({
        mode: 'onChange',
    });

    // 대여정보
    const rentalDuration = useController<ContractRequestInfo>({
        control,
        name: 'rentalDuration',
    });

    const returnType = useController<ContractRequestInfo>({
        control,
        name: 'returnType',

    });

    const convertContractDataToRequest = (data: ContractRequestInfo): ContractRequest => {
        return {
            chatRoomId: charRoomId,
            desiredStartDate: formatDate(data.rentalDuration.from!),
            desiredEndDate: formatDate(data.rentalDuration.to!),
            returnType: data.returnType
        }
    };

    const requestContract = (onSuccess: () => void) => handleSubmit(async () => {
        try {
            const response = await postContractRequest(convertContractDataToRequest(getValues()));
            console.log(response);
            onSuccess();
        } catch (error) {
            if (isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    })

    return {
        rentalDuration, returnType, requestContract, isSubmitting
    };
};

export default useContractRequestModel;
