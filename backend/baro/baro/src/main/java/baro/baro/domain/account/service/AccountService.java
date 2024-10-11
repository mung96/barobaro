package baro.baro.domain.account.service;

import baro.baro.domain.account.dto.response.AccountAddMainRes;
import baro.baro.domain.account.dto.response.AccountListRes;

public interface AccountService {
    AccountListRes findAccounts(Long memberId);

    AccountAddMainRes addMainAccount(Long memberId, Long accountId);
}
