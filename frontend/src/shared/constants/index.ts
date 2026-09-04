export const STORAGE_KEYS = {
  TOKEN: 'token'
} as const

export const FILE_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  ACCEPTED_TYPES: ['.csv'],
  PAGE_SIZE: 10
} as const

export const UI_CONSTANTS = {
  SEARCH_DEBOUNCE_MS: 1700
} as const
