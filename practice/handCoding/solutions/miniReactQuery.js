export function createQueryClient({ staleTime = 5000 } = {}) {
  const cache = new Map();

  async function getQuery(key, fetcher) {
    const cached = cache.get(key);
    const now = Date.now();
    if (cached && now - cached.timestamp < staleTime) return cached.data;
    const data = await fetcher();
    cache.set(key, { data, timestamp: now });
    return data;
  }

  function invalidate(key) {
    cache.delete(key);
  }

  return { getQuery, invalidate };
}
