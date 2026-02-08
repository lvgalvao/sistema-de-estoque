import { renderHook, waitFor, act } from '@testing-library/react';
import { useFetch } from '../useFetch';

describe('useFetch', () => {
  it('estado inicial: loading=true, data=null', () => {
    const fetchFn = vi.fn(() => new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useFetch(fetchFn, []));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('após resolve: data preenchida, loading=false', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ items: [1, 2, 3] });
    const { result } = renderHook(() => useFetch(fetchFn, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({ items: [1, 2, 3] });
    expect(result.current.error).toBeNull();
  });

  it('após reject: error preenchido, loading=false', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('Falha'));
    const { result } = renderHook(() => useFetch(fetchFn, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Falha');
    expect(result.current.data).toBeNull();
  });

  it('refetch re-executa a função', async () => {
    const fetchFn = vi.fn()
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 2 });

    const { result } = renderHook(() => useFetch(fetchFn, []));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual({ count: 1 });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual({ count: 2 });
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });
});
