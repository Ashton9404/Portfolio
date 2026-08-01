<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ExperienceItem from '@/components/sections/ExperienceItem.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { educationEntries, experienceEntries, formatMonthRange } from '@/data/experience'

const { t, locale } = useI18n()

function period(start: string, end: string) {
  return formatMonthRange(start, end, locale.value, t('common.present'))
}
</script>

<template>
  <div>
    <SectionHeading :eyebrow="t('experience.eyebrow')" :title="t('experience.title')" />

    <ol class="max-w-3xl">
      <ExperienceItem v-for="entry in experienceEntries" :key="entry.id" :entry="entry" />
    </ol>

    <section class="mt-14 max-w-3xl">
      <h3 class="text-fg-faint font-mono text-xs tracking-widest uppercase">
        {{ t('experience.educationTitle') }}
      </h3>

      <ul class="mt-5 space-y-4">
        <li
          v-for="degree in educationEntries"
          :key="degree.id"
          class="border-edge bg-surface-raised flex flex-col gap-1 rounded-xl border p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <div>
            <p class="text-fg font-medium">{{ t(`experience.degrees.${degree.id}.degree`) }}</p>
            <p class="text-fg-muted mt-0.5 text-sm">
              {{ t(`experience.degrees.${degree.id}.school`) }}
            </p>
          </div>
          <p class="text-fg-faint shrink-0 font-mono text-xs">
            {{ period(degree.start, degree.end) }}
            <span v-if="degree.expected"> ({{ t('common.expected') }})</span>
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
