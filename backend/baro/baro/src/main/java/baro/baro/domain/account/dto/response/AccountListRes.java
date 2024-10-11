package baro.baro.domain.account.dto.response;

import baro.baro.domain.account.dto.AccountDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AccountListRes {
    private List<AccountDto> accounts;
}
