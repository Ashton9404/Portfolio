<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TechTag from '@/components/ui/TechTag.vue'
import { useMessageList } from '@/composables/useMessageList'
import { openSourceProject } from '@/data/projects'

const { t } = useI18n()

const challenges = useMessageList('openSource.challenges')
const architecture = useMessageList('openSource.architecture')
const roadmap = useMessageList('openSource.roadmap')
</script>

<template>
  <div>
    <SectionHeading
      :eyebrow="t('openSource.eyebrow')"
      :title="t('openSource.title')"
      :subtitle="t('openSource.subtitle')"
    />

    <div class="border-edge bg-surface-raised rounded-xl border p-6 sm:p-8">
      <h3 class="text-accent-600 dark:text-accent-400 font-mono text-xs tracking-widest uppercase">
        {{ t('openSource.whyTitle') }}
      </h3>
      <p class="text-fg-muted mt-3 max-w-3xl leading-relaxed">{{ t('openSource.why') }}</p>

      <ul class="mt-6 flex flex-wrap gap-1.5">
        <li v-for="tech in openSourceProject.tech" :key="tech">
          <TechTag emphasis>{{ tech }}</TechTag>
        </li>
      </ul>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <section class="border-edge bg-surface-raised rounded-xl border p-6 sm:p-8">
        <h3 class="text-fg-faint font-mono text-xs tracking-widest uppercase">
          {{ t('openSource.challengesTitle') }}
        </h3>
        <ul class="mt-5 space-y-4">
          <li
            v-for="(item, index) in challenges"
            :key="index"
            class="border-edge text-fg-muted border-l-2 pl-4 text-sm leading-relaxed"
          >
            {{ item }}
          </li>
        </ul>
      </section>

      <section class="border-edge bg-surface-raised rounded-xl border p-6 sm:p-8">
        <h3 class="text-fg-faint font-mono text-xs tracking-widest uppercase">
          {{ t('openSource.architectureTitle') }}
        </h3>
        <ul class="mt-5 space-y-4">
          <li
            v-for="(item, index) in architecture"
            :key="index"
            class="border-edge text-fg-muted border-l-2 pl-4 text-sm leading-relaxed"
          >
            {{ item }}
          </li>
        </ul>
      </section>
    </div>

    <div class="border-edge bg-surface-raised mt-6 rounded-xl border p-6 sm:p-8">
      <h3 class="text-fg-faint font-mono text-xs tracking-widest uppercase">
        {{ t('openSource.roadmapTitle') }}
      </h3>
      <ul class="mt-5 grid gap-3 sm:grid-cols-2">
        <li
          v-for="(item, index) in roadmap"
          :key="index"
          class="text-fg-muted flex items-start gap-2.5 text-sm"
        >
          <span
            class="border-edge-strong mt-1.5 size-1.5 shrink-0 rounded-full border"
            aria-hidden="true"
          />
          {{ item }}
        </li>
      </ul>

      <div class="mt-7 flex flex-wrap gap-3">
        <BaseButton v-if="openSourceProject.links.github" :href="openSourceProject.links.github">
          {{ t('openSource.viewRepository') }}
        </BaseButton>
        <BaseButton variant="secondary" :to="`/projects/${openSourceProject.slug}`">
          {{ t('projects.labels.readCaseStudy') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
