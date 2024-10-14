/// <reference types="vite/client" />

declare interface Window {
  electron: {
    setkey(value): Promise<boolean>
  }
}
