export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key: string) {
    const cached = this.#cache.get(key);
    if (!cached) return;
    return cached.val;
  }

  #reap() {
    this.#cache.forEach((value, key, map) => {
      if (Date.now() - value.createdAt >= this.#interval) {
        map.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
