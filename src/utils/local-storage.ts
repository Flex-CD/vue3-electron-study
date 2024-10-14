export default {
  set(key: string, val: unknown): void {
    return localStorage.setItem(key, JSON.stringify(val))
  },

  get<T>(key: string): T | null {
    const val = localStorage.getItem(key)

    if (val !== null) {
      try {
        return JSON.parse(val)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        localStorage.removeItem(key)
        return null
      }
    }

    return null
  },

  remove(key: string): void {
    return localStorage.removeItem(key)
  },

  clear(): void {
    return localStorage.clear()
  }
}
