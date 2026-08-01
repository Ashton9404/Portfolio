<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useMessageList } from '@/composables/useMessageList'

const { t } = useI18n()
const paragraphs = useMessageList('about.paragraphs')

const FACTS = [
  { labelKey: 'about.facts.locationLabel', valueKey: 'about.facts.locationValue' },
  { labelKey: 'about.facts.focusLabel', valueKey: 'about.facts.focusValue' },
  { labelKey: 'about.facts.educationLabel', valueKey: 'about.facts.educationValue' },
  { labelKey: 'about.facts.languagesLabel', valueKey: 'about.facts.languagesValue' },
  { labelKey: 'about.facts.availabilityLabel', valueKey: 'about.facts.availabilityValue' },
] as const
</script>

<template>
  <div>
    <SectionHeading :eyebrow="t('about.eyebrow')" :title="t('about.title')" />

    <div class="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14">
      <div class="space-y-5">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
          class="text-fg-muted leading-relaxed"
        >
          {{ paragraph }}
        </p>
      </div>

      <aside class="border-edge bg-surface-raised rounded-xl border p-6">
        <h3 class="text-fg-faint font-mono text-xs tracking-widest uppercase">
          {{ t('about.factsTitle') }}
        </h3>
        <dl class="mt-5 space-y-4 text-sm">
          <div v-for="fact in FACTS" :key="fact.labelKey">
            <dt class="text-fg-faint">{{ t(fact.labelKey) }}</dt>
            <dd class="text-fg mt-0.5 font-medium">{{ t(fact.valueKey) }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </div>
</template>
