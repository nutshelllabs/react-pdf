import memoize from '../src/memoize';

describe('memoize', () => {
  test('should memoize results based on the first argument provided', () => {
    const fn = jest.fn((a, b) => a + b);
    const memoized = memoize(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(2, 3)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  test('should allow a custom resolver to be provided', () => {
    const fn = jest.fn((a, b, c) => a + b + c);
    const memoized = memoize(fn, (...args) => args.sort().join(','));

    expect(memoized(1, 2, 3)).toBe(6);
    expect(memoized(3, 2, 1)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(2, 3, 0)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
