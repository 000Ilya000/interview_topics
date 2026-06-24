// ✍️ HAND CODING — реализуй БЕЗ AI

//! Mini React Query: createQueryClient с fetch, cache, staleTime

export function createQueryClient({ staleTime = 5000 } = {}) {
  // TODO: getQuery(key, fetcher), invalidate(key), cache Map
  return {
    getQuery: async (key, fetcher) => {},
    invalidate: (key) => {},
  };
}
