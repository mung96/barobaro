// import { useRouter } from 'next/navigation';
import { renderHook, act } from '@testing-library/react';
import usePasswordChange from '@/hooks/user/usePasswordModel';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('usePasswordModel', () => {
  it('needNewPassword의 값에 따른 초기상태 확인', () => {
    // 기존 유저인 경우 (새로 비밀번호 등록하는 과정이 아님)
    const { result: resultFalse } = renderHook(() =>
      usePasswordChange(false, '112233'),
    );
    expect(resultFalse.current.passwordMessage).toBe(
      '현재 비밀번호를 입력해주세요',
    );
    expect(resultFalse.current.step).toBe(0);
    // 신규 유저인 경우, 새로운 비밀번호가 필요함.
    const { result: resultTrue } = renderHook(() => usePasswordChange(true));
    expect(resultTrue.current.passwordMessage).toBe(
      '사용하실 비밀번호를 입력해주세요',
    );
    expect(resultTrue.current.step).toBe(1);
  });

  it('신규 유저의 비밀번호 등록 로직', async () => {
    const { result } = renderHook(() => usePasswordChange(true));
    await act(async () => {
      result.current.setInputPassword('123456');
    });
    expect(result.current.passwordMessage).toBe(
      '사용하실 비밀번호를 다시 한 번 입력해주세요',
    );
    await act(async () => {
      result.current.setInputPassword('123455');
    });
    expect(result.current.passwordMessage).toBe(
      '일치하지 않습니다. 비밀번호를 다시 입력해주세요',
    );
    await act(async () => {
      result.current.setInputPassword('123456');
    });
    expect(result.current.isFinished).toBe(true);
    expect(result.current.passwordMessage).toBe(
      '비밀번호가 성공적으로 등록되었습니다.',
    );
  });

  it('기존 유저의 비밀번호 수정 로직', async () => {
    const { result } = renderHook(() => usePasswordChange(false, '112233'));
    // 우선 틀린다. (112233이 맞는 비밀번호로 가정)
    await act(async () => {
      result.current.setInputPassword('123456');
    });
    expect(result.current.passwordMessage).toBe(
      '비밀번호가 일치하지 않습니다. 다시 입력해주세요',
    );
    // 맞는 비밀번호 작성
    await act(async () => {
      result.current.setInputPassword('112233');
    });
    expect(result.current.passwordMessage).toBe(
      '새로운 비밀번호를 입력해주세요',
    );
    // 현재 비밀번호가 인증된 이후 새로운 비밀번호 과정
    await act(async () => {
      result.current.setInputPassword('111111');
    });
    expect(result.current.passwordMessage).toBe(
      '사용하실 비밀번호를 다시 한 번 입력해주세요',
    );
    // 근데 이게 또 틀렸어
    await act(async () => {
      result.current.setInputPassword('111112');
    });
    expect(result.current.passwordMessage).toBe(
      '일치하지 않습니다. 비밀번호를 다시 입력해주세요',
    );
    await act(async () => {
      result.current.setInputPassword('111111');
    });
    expect(result.current.isFinished).toBe(true);
    expect(result.current.passwordMessage).toBe(
      '비밀번호가 성공적으로 변경되었습니다.',
    );
  });
});
