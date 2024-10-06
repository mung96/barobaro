import { UserAccount } from '@/types/user/userData';

export default function accountSort(userAccountList: UserAccount[]) {
  return userAccountList.sort((a, b) => {
    if (a.main === b.main) {
      return 0;
    }
    return a.main ? -1 : 1;
  });
}
