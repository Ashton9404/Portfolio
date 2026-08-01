<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { isDark, toggleTheme } = useTheme()

const label = computed(() => (isDark.value ? t('theme.toLight') : t('theme.toDark')))
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="inline-flex size-9 items-center justify-center rounded-lg border border-edge text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg"
    @click="toggleTheme"
  >
    <!-- Inline SVGs: two icons do not justify an icon-library dependency. -->
    <svg
      v-if="isDark"
      class="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
    <svg
      v-else
      class="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  </button>
</template>
