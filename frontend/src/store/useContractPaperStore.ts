import {create} from 'zustand';

type ContractPaperStoreState = {
    contractData : any;
    contractUrl: string;
    actions : {
        setContractUrl: (url: string) => void;
        setContractData : (state : any) => void;
    }
}

const useContractStore = create<ContractPaperStoreState>((set) => ({
    contractData: null,
    contractUrl: "",
    actions: {
        setContractUrl: (url: string) => set({ contractUrl: url }),
        setContractData : (state : any) => set({contractData : state})
    }
}))

export const useContractUrl = () => useContractStore((store) => store.contractUrl);
export const useContractData = () => useContractStore((store) => store.contractData);
export const useContractActions = () => useContractStore((store) => store.actions);

