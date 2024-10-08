import { renderHook, act } from '@testing-library/react';
import useOpenModalModel from '@/hooks/overlay/useModalModel';
import useSearchModel from '@/hooks/products/useSearchModel';
import { useRouter } from 'next/navigation';
import { getSuggest } from "../apis/searchSuggestApi"

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../apis/searchSuggestApi', () => ({
  getSuggest: jest.fn(),
}))

describe('useOpenModalModel', () => {
  it('초기 상태는 close', () => {
    const { result } = renderHook(() => useOpenModalModel());
    expect(result.current.openModal).toBe(false);
  });

  it('Modal의 열고 닫힘이 정상적으로 작동한다', () => {
    const { result } = renderHook(() => useOpenModalModel());
    act(() => {
      result.current.clickModal();
    });
    // console.log(result);
    expect(result.current.openModal).toBe(true);
    act(() => {
      result.current.closeModal();
    });
    // console.log(result);
    expect(result.current.openModal).toBe(false);
  });
});

describe('useSearchModel', () => {
  let mockPush: jest.Mock;
  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (getSuggest as jest.Mock).mockReset();
    (getSuggest as jest.Mock).mockResolvedValue({data:[]})
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('초기 상태는 빈칸', () => {
    const { result } = renderHook(() => useSearchModel());
    expect(result.current.search).toBe('');
  });

  it('영어와 숫자, 한글 모두 혼합해서 입력이 가능하다.', () => {
    const { result } = renderHook(() => useSearchModel());
    act(() => {
      result.current.handleSearch('1테스 트test');
    });
    expect(result.current.search).toBe('1테스 트test');
  });

  it('빈칸인 경우 goSearch 실행 => router X', async () => {
    const { result } = renderHook(() => useSearchModel());
    await act(() => {
      result.current.handleSearch('');
    });
    await act(() => {
      result.current.goSearch();
    });
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('검색어가 있을 때, goSearch 실행 => router.push', async () => {
    const { result } = renderHook(() => useSearchModel());
    await act(async () => {
      result.current.handleSearch('t');
    });
    await act(async () => {
      result.current.goSearch();
    });
    expect(mockPush).toHaveBeenCalled();
  });
});
