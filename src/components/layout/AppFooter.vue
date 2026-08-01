<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { profile } from '@/data/profile'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-edge bg-surface-subtle">
    <div
      class="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p class="font-medium text-fg">{{ profile.name }}</p>
        <p class="mt-1 text-fg-muted">{{ t('footer.tagline') }}</p>
      </div>

      <div class="text-fg-faint sm:text-right">
        <p>{{ t('footer.builtWith') }}</p>
        <p class="mt-1">
          <span>{{ t('footer.copyright', { year }) }}</span>
          <span aria-hidden="true" class="mx-2">·</span>
          <a
            :href="profile.repositoryUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-edge-strong underline-offset-4 transition-colors hover:text-fg"
          >
            {{ t('footer.viewSource') }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
