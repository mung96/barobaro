package baro.baro.domain.account.service;

import baro.baro.domain.account.dto.AccountDto;
import baro.baro.domain.account.dto.response.AccountListRes;
import baro.baro.domain.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;

    @Override
    public AccountListRes findAccounts(Long memberId) {
        List<AccountDto> accountDtos = accountRepository.findAllByMemberId(memberId)
                .stream()
                .map(AccountDto::toDto)
                .sorted((dto1, dto2) -> Boolean.compare(dto2.getMain(), dto1.getMain())) // 주계좌가 맨 앞에 오도록 정렬
                .collect(Collectors.toList());
        
        return new AccountListRes(accountDtos);
    }
}
