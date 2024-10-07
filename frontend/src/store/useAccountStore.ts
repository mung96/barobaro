import { create } from 'zustand';
import { UserAccount } from '@/types/user/userData';
import accountSort from '@/services/account/accountsort';

type AccountStoreState = {
  accountsList: UserAccount[];
  mainAccount: UserAccount | null;
  actions: {
    initializeAccounts: (accounts: UserAccount[]) => void;
    addAccount: (account: UserAccount) => void;
    removeAccount: (accountId: number) => void;
    setMainAccount: (accountId: number) => void;
  };
};

const useAccountStore = create<AccountStoreState>((set) => ({
  accountsList: [],
  mainAccount: null,
  actions: {
    initializeAccounts: (accounts) => {
      const sortedAccounts = accountSort(accounts);
      set({
        accountsList: sortedAccounts,
        mainAccount: sortedAccounts.find((acc) => acc.main) || null,
      });
    },
    addAccount: (account) =>
      set((state) => {
        const newList = accountSort([...state.accountsList, account]);
        return {
          accountsList: newList,
          mainAccount: newList.find((acc) => acc.main) || state.mainAccount,
        };
      }),
    removeAccount: (accountId) =>
      set((state) => {
        const newList = state.accountsList.filter(
          (acc) => acc.accountId !== accountId,
        );
        return {
          accountsList: newList,
          mainAccount: newList.find((acc) => acc.main) || null,
        };
      }),
    setMainAccount: (accountId) =>
      set((state) => {
        const updatedAccounts = state.accountsList.map((acc) => ({
          ...acc,
          main: acc.accountId === accountId,
        }));

        const newMainAccount = updatedAccounts.find(
          (acc) => acc.accountId === accountId,
        );

        if (!newMainAccount) {
          return state;
        }

        const sortedAccounts = [
          newMainAccount,
          ...updatedAccounts.filter((acc) => acc.accountId !== accountId),
        ];

        return {
          accountsList: sortedAccounts,
          mainAccount: newMainAccount,
        };
      }),
  },
}));

export const useAddAccount = () =>
  useAccountStore((store) => store.actions.addAccount);
export const useRemoveAccount = () =>
  useAccountStore((store) => store.actions.removeAccount);
export const useSetMainAccount = () =>
  useAccountStore((store) => store.actions.setMainAccount);
export const useAccountList = () =>
  useAccountStore((store) => store.accountsList);
export const useMainAccount = () =>
  useAccountStore((store) => store.mainAccount);
export const useInitAccounts = () =>
  useAccountStore((store) => store.actions.initializeAccounts);
