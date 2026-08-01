<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseButton from '@/components/ui/BaseButton.vue'
import { mailtoLink, profile } from '@/data/profile'

const { t } = useI18n()
</script>

<template>
  <section class="border-edge/60 bg-surface border-b">
    <div class="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <p
        class="border-edge bg-surface-subtle text-fg-muted inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
      >
        <span class="relative flex size-1.5">
          <span
            class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60"
          />
          <span class="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
        {{ t('hero.availability') }}
      </p>

      <h1 class="text-fg mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
        {{ profile.name }}
      </h1>

      <p class="text-accent-600 dark:text-accent-400 mt-3 font-mono text-sm sm:text-base">
        {{ t('hero.role') }}
      </p>

      <!--
        The single sentence a recruiter reads in the first three seconds.
        Everything below it is supporting detail.
      -->
      <p class="text-fg mt-8 max-w-3xl text-xl leading-snug font-medium sm:text-2xl">
        {{ t('hero.headline') }}
      </p>

      <p class="text-fg-muted mt-5 max-w-2xl leading-relaxed">
        {{ t('hero.summary') }}
      </p>

      <div class="mt-10 flex flex-wrap gap-3">
        <BaseButton href="#projects">{{ t('hero.viewProjects') }}</BaseButton>
        <BaseButton variant="secondary" :href="profile.resumePath">
          {{ t('hero.downloadResume') }}
        </BaseButton>
        <BaseButton variant="ghost" :href="mailtoLink">{{ t('hero.contactMe') }}</BaseButton>
      </div>
    </div>
  </section>
</template>
