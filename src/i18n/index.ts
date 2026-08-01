import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import zhTW from './locales/zh-TW.json'

export const SUPPORTED_LOCALES = ['en', 'zh-TW'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

/** English is the primary language: first-time visitors always land on it. */
export const DEFAULT_LOCALE: AppLocale = 'en'

const STORAGE_KEY = 'portfolio-locale'

/** English is the master schema — every other locale must match its shape. */
export type MessageSchema = typeof en

/*
  Typing the map as Record<AppLocale, MessageSchema> is what makes translation
  drift a build error: if zh-TW.json is missing a key that en.json has,
  `npm run type-check` fails instead of the site silently rendering English.
*/
const messages: Record<AppLocale, MessageSchema> = {
  en,
  'zh-TW': zhTW,
}

function isSupportedLocale(value: unknown): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale)
}

/*
  Deliberately no navigator.language detection. The brief is that the site is
  English-first for international recruiters; a Taiwanese browser landing on
  Chinese would undercut that. Chinese is opt-in and then remembered.
*/
function resolveInitialLocale(): AppLocale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isSupportedLocale(stored) ? stored : DEFAULT_LOCALE
  } catch {
    return DEFAULT_LOCALE
  }
}

export const i18n = createI18n({
  legacy: false, // required for useI18n() in <script setup>
  locale: resolveInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
})

export function setLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale

  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Storage unavailable (private mode) — the switch still works for this visit.
  }

  // Screen readers and search engines both key off this attribute.
  document.documentElement.lang = locale
}

export function getLocale(): AppLocale {
  return i18n.global.locale.value as AppLocale
}

/** Keeps <html lang> correct on the very first paint, not just after a switch. */
export function syncDocumentLocale(): void {
  document.documentElement.lang = getLocale()
}
