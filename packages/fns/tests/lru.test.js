import LRUCache from '../src/lruCache';

describe('LRUCache', () => {
  test('should set and get and evict', () => {
    const cache = new LRUCache(2);

    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    expect(cache.get('a')).toBe(undefined);
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });
  test('should evict least recently accessed', () => {
    const cache = new LRUCache(2);

    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a'); // b is now the least recently accessed
    cache.set('c', 3);

    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(undefined);
    expect(cache.get('c')).toBe(3);
  });
});
