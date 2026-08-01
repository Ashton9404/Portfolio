<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { setLocale, type AppLocale } from '@/i18n'

const { t, locale } = useI18n()

const OPTIONS: { value: AppLocale; labelKey: 'locale.en' | 'locale.zhTW' }[] = [
  { value: 'en', labelKey: 'locale.en' },
  { value: 'zh-TW', labelKey: 'locale.zhTW' },
]
</script>

<template>
  <div
    class="flex items-center rounded-lg border border-edge p-0.5"
    role="group"
    :aria-label="t('locale.label')"
  >
    <button
      v-for="option in OPTIONS"
      :key="option.value"
      type="button"
      :aria-pressed="locale === option.value"
      class="rounded-md px-2 py-1 font-mono text-xs transition-colors"
      :class="
        locale === option.value
          ? 'bg-surface-subtle font-medium text-fg'
          : 'text-fg-faint hover:text-fg'
      "
      @click="setLocale(option.value)"
    >
      {{ t(option.labelKey) }}
    </button>
  </div>
</template>
