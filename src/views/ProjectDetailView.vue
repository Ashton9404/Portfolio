<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import TechTag from '@/components/ui/TechTag.vue'
import { useMessageList } from '@/composables/useMessageList'
import { findProjectBySlug } from '@/data/projects'

const props = defineProps<{ slug: string }>()

const { t } = useI18n()

const project = computed(() => findProjectBySlug(props.slug))
const base = computed(() => `projects.items.${project.value?.i18nKey}`)
const features = useMessageList(() => `${base.value}.features`)

const NARRATIVE = ['problem', 'solution', 'outcome'] as const
</script>

<template>
  <article v-if="project" class="mx-auto max-w-3xl px-6 py-16 sm:py-20">
    <RouterLink
      to="/#projects"
      class="text-fg-muted hover:text-fg inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
    >
      <span aria-hidden="true">←</span>
      {{ t('projects.labels.backToProjects') }}
    </RouterLink>

    <p class="text-accent-600 dark:text-accent-400 mt-8 font-mono text-xs tracking-wide">
      {{ t(`projects.categories.${project.category}`) }}
    </p>

    <h1 class="text-fg mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
      {{ t(`${base}.name`) }}
    </h1>
    <p class="text-fg-muted mt-3 text-lg">{{ t(`${base}.tagline`) }}</p>

    <p v-if="project.hasRole" class="text-fg-faint mt-5 font-mono text-sm">
      {{ t('projects.labels.role') }}: {{ t(`${base}.role`) }}
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <BaseButton v-if="project.links.live" size="sm" :href="project.links.live">
        {{ t('projects.labels.viewLive') }}
      </BaseButton>
      <BaseButton
        v-if="project.links.github"
        size="sm"
        variant="secondary"
        :href="project.links.github"
      >
        {{ t('projects.labels.viewCode') }}
      </BaseButton>
    </div>

    <div class="mt-12 space-y-10">
      <section v-for="key in NARRATIVE" :key="key">
        <h2
          class="text-accent-600 dark:text-accent-400 font-mono text-xs tracking-widest uppercase"
        >
          {{ t(`projects.labels.${key}`) }}
        </h2>
        <p class="text-fg-muted mt-3 leading-relaxed">{{ t(`${base}.${key}`) }}</p>
      </section>

      <section>
        <h2
          class="text-accent-600 dark:text-accent-400 font-mono text-xs tracking-widest uppercase"
        >
          {{ t('projects.labels.features') }}
        </h2>
        <ul class="mt-3 space-y-2.5">
          <li
            v-for="(feature, index) in features"
            :key="index"
            class="text-fg-muted relative pl-5 leading-relaxed"
          >
            <span
              class="bg-edge-strong absolute top-2.5 left-0 size-1.5 rounded-full"
              aria-hidden="true"
            />
            {{ feature }}
          </li>
        </ul>
      </section>

      <section>
        <h2
          class="text-accent-600 dark:text-accent-400 font-mono text-xs tracking-widest uppercase"
        >
          {{ t('projects.labels.stack') }}
        </h2>
        <ul class="mt-3 flex flex-wrap gap-1.5">
          <li v-for="tech in project.tech" :key="tech">
            <TechTag>{{ tech }}</TechTag>
          </li>
        </ul>
      </section>
    </div>
  </article>

  <!-- An unknown slug is a dead link, not a crash: say so and offer a way back. -->
  <div v-else class="mx-auto max-w-3xl px-6 py-24 text-center">
    <p class="text-fg-faint font-mono text-sm">{{ slug }}</p>
    <h1 class="text-fg mt-3 text-2xl font-semibold">{{ t('projects.labels.notFound') }}</h1>
    <BaseButton to="/#projects" class="mt-8">{{ t('projects.labels.backToProjects') }}</BaseButton>
  </div>
</template>
