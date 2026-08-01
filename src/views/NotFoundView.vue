<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col items-start justify-center px-6 py-28 sm:py-36">
    <p class="text-accent-600 dark:text-accent-400 font-mono text-sm">{{ t('notFound.code') }}</p>
    <h1 class="text-fg mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
      {{ t('notFound.title') }}
    </h1>
    <p class="text-fg-muted mt-4 max-w-lg">{{ t('notFound.description') }}</p>
    <BaseButton to="/" class="mt-8">{{ t('notFound.backHome') }}</BaseButton>
  </div>
</template>
