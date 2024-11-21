import {create} from 'zustand';

type ContractPaperStoreState = {
    contractData : any;
    contractUrl: string;
    approveContractUrl: string;
    pinNumber:string;
    actions : {
        setContractUrl: (url: string) => void;
        setApproveContractUrl: (url: string) => void;
        setContractData : (state : any) => void;
        setPinNumber:(pinNumber:string)=>void
    }
}

const useContractStore = create<ContractPaperStoreState>((set) => ({
    contractData: null,
    contractUrl: "",
    approveContractUrl: "",
    pinNumber:'',
    actions: {
        setPinNumber: (pinNumber: string) => set({ pinNumber:pinNumber }),
        setContractUrl: (url: string) => set({ contractUrl: url }),
        setApproveContractUrl: (url: string) => set({ approveContractUrl: url }),
        setContractData : (state : any) => set({contractData : state})
    }
}))

export const useContractUrl = () => useContractStore((store) => store.contractUrl);
export const useContractData = () => useContractStore((store) => store.contractData);
export const useContractActions = () => useContractStore((store) => store.actions);
export const useApproveContractUrl = () => useContractStore((store) => store.approveContractUrl);
export const useSetApproveContractUrl = () => useContractStore((store) => store.actions.setApproveContractUrl);


export const usePinNumber = () => useContractStore((store) => store.pinNumber);
export const useSetPinNumber = () => useContractStore((store) => store.actions.setPinNumber);
