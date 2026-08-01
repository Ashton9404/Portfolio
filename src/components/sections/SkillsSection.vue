<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import SectionHeading from '@/components/ui/SectionHeading.vue'
import { skillCategories } from '@/data/skills'

const { t } = useI18n()
</script>

<template>
  <div>
    <SectionHeading
      :eyebrow="t('skills.eyebrow')"
      :title="t('skills.title')"
      :subtitle="t('skills.subtitle')"
    />

    <div class="grid gap-6 md:grid-cols-2">
      <section
        v-for="category in skillCategories"
        :key="category.id"
        class="border-edge bg-surface-raised rounded-xl border p-6"
      >
        <h3
          class="text-accent-600 dark:text-accent-400 font-mono text-xs tracking-widest uppercase"
        >
          {{ t(`skills.categories.${category.id}`) }}
        </h3>

        <ul class="mt-5 space-y-4">
          <li v-for="skill in category.skills" :key="skill.key">
            <p class="text-fg text-sm font-semibold">{{ skill.name }}</p>
            <!-- The context line is the point of this section — the name alone proves nothing. -->
            <p class="text-fg-muted mt-1 text-sm leading-relaxed">
              {{ t(`skills.context.${skill.key}`) }}
            </p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
