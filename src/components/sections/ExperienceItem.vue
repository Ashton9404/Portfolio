<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import TechTag from '@/components/ui/TechTag.vue'
import { useMessageList } from '@/composables/useMessageList'
import { formatMonthRange, type ExperienceEntry } from '@/data/experience'

const props = defineProps<{ entry: ExperienceEntry }>()

const { t, locale } = useI18n()

/*
  Extracted into its own component because each entry needs its own
  useMessageList() call, and composables cannot run inside a v-for.
*/
const responsibilities = useMessageList(
  () => `experience.entries.${props.entry.id}.responsibilities`,
)

const period = computed(() =>
  formatMonthRange(props.entry.start, props.entry.end, locale.value, t('common.present')),
)
</script>

<template>
  <li class="border-edge relative border-l pb-10 pl-6 last:pb-0">
    <span
      class="bg-accent-500 ring-surface absolute top-1.5 -left-[4.5px] size-2 rounded-full ring-4"
      aria-hidden="true"
    />

    <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <h3 class="text-fg font-semibold">
        {{ t(`experience.entries.${entry.id}.role`) }}
      </h3>
      <p class="text-fg-faint shrink-0 font-mono text-xs">{{ period }}</p>
    </div>

    <p class="text-fg-muted mt-1 text-sm">
      {{ t(`experience.entries.${entry.id}.company`) }}
      <span aria-hidden="true" class="text-fg-faint mx-1.5">·</span>
      <span class="text-fg-faint">{{ t(`experience.entries.${entry.id}.location`) }}</span>
    </p>

    <ul class="mt-5 space-y-2.5">
      <li
        v-for="(item, index) in responsibilities"
        :key="index"
        class="text-fg-muted relative pl-5 text-sm leading-relaxed"
      >
        <span class="bg-edge-strong absolute top-2 left-0 size-1 rounded-full" aria-hidden="true" />
        {{ item }}
      </li>
    </ul>

    <p
      class="border-accent-500/40 bg-accent-500/[0.04] text-fg-muted mt-5 border-l-2 py-2 pl-4 text-sm leading-relaxed"
    >
      <span class="text-fg font-medium">{{ t('experience.impactLabel') }}:</span>
      {{ t(`experience.entries.${entry.id}.impact`) }}
    </p>

    <ul class="mt-5 flex flex-wrap gap-1.5">
      <li v-for="tech in entry.tech" :key="tech">
        <TechTag>{{ tech }}</TechTag>
      </li>
    </ul>
  </li>
</template>
