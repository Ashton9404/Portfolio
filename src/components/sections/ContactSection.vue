<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { mailtoLink, profile } from '@/data/profile'

const { t } = useI18n()

/*
  Links, not a contact form. There is no backend to receive a submission, and a
  third-party form service would add a dependency plus a spam surface to solve
  a problem recruiters do not have — they email.
*/
const CHANNELS = [
  { labelKey: 'contact.emailLabel', value: profile.email, href: mailtoLink, external: false },
  {
    labelKey: 'contact.githubLabel',
    value: `@${profile.githubHandle}`,
    href: profile.github,
    external: true,
  },
  {
    labelKey: 'contact.linkedinLabel',
    value: profile.linkedinHandle,
    href: profile.linkedin,
    external: true,
  },
] as const
</script>

<template>
  <div>
    <SectionHeading
      :eyebrow="t('contact.eyebrow')"
      :title="t('contact.title')"
      :subtitle="t('contact.description')"
    />

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <li v-for="channel in CHANNELS" :key="channel.labelKey">
          <a
            :href="channel.href"
            :target="channel.external ? '_blank' : undefined"
            :rel="channel.external ? 'noopener noreferrer' : undefined"
            class="border-edge bg-surface-raised hover:border-edge-strong hover:bg-surface-subtle flex items-baseline justify-between gap-4 rounded-xl border px-5 py-4 transition-colors"
          >
            <span class="text-fg-faint font-mono text-xs tracking-widest uppercase">
              {{ t(channel.labelKey) }}
            </span>
            <span class="text-fg truncate text-sm font-medium">{{ channel.value }}</span>
          </a>
        </li>

        <li
          class="border-edge flex items-baseline justify-between gap-4 rounded-xl border border-dashed px-5 py-4"
        >
          <span class="text-fg-faint font-mono text-xs tracking-widest uppercase">
            {{ t('contact.locationLabel') }}
          </span>
          <span class="text-fg-muted text-sm">{{ profile.location }}</span>
        </li>
      </ul>

      <aside
        class="border-edge bg-surface-raised flex flex-col justify-between rounded-xl border p-6"
      >
        <div>
          <h3 class="text-fg font-semibold">{{ t('contact.resumeTitle') }}</h3>
          <p class="text-fg-muted mt-2 text-sm leading-relaxed">
            {{ t('contact.resumeDescription') }}
          </p>
        </div>
        <BaseButton :href="profile.resumePath" class="mt-6 w-full">
          {{ t('contact.resumeCta') }}
        </BaseButton>
      </aside>
    </div>
  </div>
</template>
