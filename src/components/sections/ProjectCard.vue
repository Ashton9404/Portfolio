<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import TechTag from '@/components/ui/TechTag.vue'
import type { Project } from '@/data/projects'

const props = defineProps<{ project: Project }>()

const { t } = useI18n()

const base = computed(() => `projects.items.${props.project.i18nKey}`)
</script>

<template>
  <article class="border-edge bg-surface-raised rounded-xl border p-6 sm:p-8">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <p class="text-accent-600 dark:text-accent-400 font-mono text-xs tracking-wide">
        {{ t(`projects.categories.${project.category}`) }}
      </p>

      <div class="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
        <a
          v-if="project.links.live"
          :href="project.links.live"
          target="_blank"
          rel="noopener noreferrer"
          class="text-fg-muted decoration-edge-strong hover:text-fg underline underline-offset-4 transition-colors"
        >
          {{ t('projects.labels.viewLive') }} ↗
        </a>
        <a
          v-if="project.links.github"
          :href="project.links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-fg-muted decoration-edge-strong hover:text-fg underline underline-offset-4 transition-colors"
        >
          {{ t('projects.labels.viewCode') }} ↗
        </a>
      </div>
    </div>

    <h3 class="text-fg mt-4 text-xl font-semibold tracking-tight">
      {{ t(`${base}.name`) }}
    </h3>
    <p class="text-fg-muted mt-1.5">{{ t(`${base}.tagline`) }}</p>

    <!--
      Problem before solution, deliberately. A feature list says what was
      built; this says why it needed to exist, which is the part an interviewer
      actually probes.
    -->
    <div class="mt-7 grid gap-6 md:grid-cols-2">
      <div>
        <h4 class="text-fg-faint font-mono text-xs tracking-widest uppercase">
          {{ t('projects.labels.problem') }}
        </h4>
        <p class="text-fg-muted mt-2 text-sm leading-relaxed">{{ t(`${base}.problem`) }}</p>
      </div>
      <div>
        <h4 class="text-fg-faint font-mono text-xs tracking-widest uppercase">
          {{ t('projects.labels.solution') }}
        </h4>
        <p class="text-fg-muted mt-2 text-sm leading-relaxed">{{ t(`${base}.solution`) }}</p>
      </div>
    </div>

    <ul class="mt-7 flex flex-wrap gap-1.5">
      <li v-for="tech in project.tech" :key="tech">
        <TechTag>{{ tech }}</TechTag>
      </li>
    </ul>

    <RouterLink
      :to="`/projects/${project.slug}`"
      class="text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 mt-7 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
    >
      {{ t('projects.labels.readCaseStudy') }}
      <span aria-hidden="true">→</span>
    </RouterLink>
  </article>
</template>
