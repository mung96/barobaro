package baro.baro.domain.account.service;

import baro.baro.domain.account.dto.response.AccountListRes;

public interface AccountService {
    AccountListRes findAccounts(Long memberId);
}
