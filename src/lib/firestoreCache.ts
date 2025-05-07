type Cache<T> = {
  [key: string]: {
    data: T;
    timestamp: number;
  };
};

const cache: Cache<any> = {};
const TTL = 1000 * 60 * 5; // 5 minutes

export function getCached<T>(key: string): T | null {
  const entry = cache[key];
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > TTL;
  if (isExpired) {
    delete cache[key];
    return null;
  }

  return entry.data as T;
}

export function setCached<T>(key: string, data: T) {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}
