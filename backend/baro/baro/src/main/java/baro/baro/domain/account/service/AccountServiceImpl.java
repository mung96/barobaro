package baro.baro.domain.account.service;

import baro.baro.domain.account.dto.AccountDto;
import baro.baro.domain.account.dto.response.AccountAddMainRes;
import baro.baro.domain.account.dto.response.AccountListRes;
import baro.baro.domain.account.entity.Account;
import baro.baro.domain.account.repository.AccountRepository;
import baro.baro.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static baro.baro.global.statuscode.ErrorCode.ACCOUNT_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;

    @Override
    @Transactional(readOnly = true)
    public AccountListRes findAccounts(Long memberId) {
        List<AccountDto> accountDtos = accountRepository.findAllByMemberId(memberId)
                .stream()
                .map(AccountDto::toDto)
                .sorted((dto1, dto2) -> Boolean.compare(dto2.getMain(), dto1.getMain())) // 주계좌가 맨 앞에 오도록 정렬
                .collect(Collectors.toList());
        
        return new AccountListRes(accountDtos);
    }

    @Override
    public AccountAddMainRes addMainAccount(Long memberId, Long accountId) {
        // 원래 주계좌
        Optional<Account> origin = accountRepository.findByMainTrue();
        if(origin.isPresent()) {
            Account existedOrigin = origin.get();
            existedOrigin.updateMain(false);
        }

        // 바꿀 계좌
        Account target = accountRepository.findById(accountId)
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));
        target.updateMain(true);

        return AccountAddMainRes.toDto(target);
    }
}
