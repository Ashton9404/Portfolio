import { computed, ref, watch } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'portfolio-theme'

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    // Storage unavailable — fall through to the system default.
  }
  return 'system'
}

/*
  Module-level refs, created once on import. Every useTheme() caller shares the
  same state, which is all the "global store" this site needs — adding Pinia for
  two booleans would be more machinery than the problem deserves.
*/
const preference = ref<ThemePreference>(readStoredPreference())

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
const systemPrefersDark = ref(darkQuery.matches)
darkQuery.addEventListener('change', (event) => {
  systemPrefersDark.value = event.matches
})

const isDark = computed(
  () => preference.value === 'dark' || (preference.value === 'system' && systemPrefersDark.value),
)

/*
  The inline script in index.html sets the initial class before first paint;
  this watcher only handles changes after the app boots, so there is exactly one
  writer of the `dark` class at any time.
*/
watch(isDark, (dark) => {
  document.documentElement.classList.toggle('dark', dark)
})

function setTheme(next: ThemePreference): void {
  preference.value = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Preference simply won't survive this session.
  }
}

/**
 * Binary toggle over a tri-state model: the site starts on 'system', and the
 * first click commits to an explicit choice. A three-way cycle in a single
 * icon button is guesswork for the user.
 */
function toggleTheme(): void {
  setTheme(isDark.value ? 'light' : 'dark')
}

export function useTheme() {
  return { preference, isDark, setTheme, toggleTheme }
}
