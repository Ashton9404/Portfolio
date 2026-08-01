<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import PageSection from '@/components/layout/PageSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { t } = useI18n()

// Section shells only — real content lands in the next phases. The ids exist
// now so the header navigation and scroll offsets can be verified early.
const SECTIONS = [
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'experience', key: 'experience' },
  { id: 'projects', key: 'projects' },
  { id: 'open-source', key: 'openSource' },
  { id: 'contact', key: 'contact' },
] as const
</script>

<template>
  <!-- Single root element: <Transition> in App.vue cannot animate a fragment. -->
  <div>
    <PageSection
      v-for="(section, index) in SECTIONS"
      :id="section.id"
      :key="section.id"
      :tone="index % 2 === 1 ? 'subtle' : 'default'"
    >
      <SectionHeading
        :eyebrow="`${String(index + 1).padStart(2, '0')} / ${t(`nav.${section.key}`)}`"
        :title="t(`nav.${section.key}`)"
      />
      <p class="font-mono text-sm text-fg-faint">Content lands in a later phase.</p>
    </PageSection>
  </div>
</template>
