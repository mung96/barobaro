import {create} from 'zustand';

type BottomSheetStoreState = {
  isOpen: boolean;
  selectedAccount: number;
  actions: {
    setIsOpen: () => void;
    setIsClose: () => void;
    setSelectedAccount: (accountId: number) => void;
  }
}

const useBottomSheetStore = create<BottomSheetStoreState>((set) => ({
  isOpen: false,
  selectedAccount: 0,
  actions: {
    setIsOpen: () => {set({ isOpen: true })},
    setIsClose: () => {
      set({ isOpen: false })
      set({ selectedAccount: 0 });
    },
    setSelectedAccount: (accountId: number) => {
      set({selectedAccount: accountId});
    },
  }
}))

export const useBottomSheetAction = () => useBottomSheetStore((store) => store.actions);
export const useBottomSheetState = () => useBottomSheetStore((store) => store.isOpen);
export const useSelectedAccount = () => useBottomSheetStore((store) => store.selectedAccount)
export const useSetSelectedAccount = () => useBottomSheetStore((store) => store.actions.setSelectedAccount);