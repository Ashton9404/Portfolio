<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ProjectCard from '@/components/sections/ProjectCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { gridProjects } from '@/data/projects'

const { t } = useI18n()
</script>

<template>
  <div>
    <SectionHeading
      :eyebrow="t('projects.eyebrow')"
      :title="t('projects.title')"
      :subtitle="t('projects.subtitle')"
    />

    <!--
      Stacked full-width cards rather than a grid: each case study carries a
      problem and a solution paragraph, which a narrow grid column would
      squeeze into an unreadable ribbon.
    -->
    <div class="space-y-6">
      <ProjectCard v-for="project in gridProjects" :key="project.slug" :project="project" />
    </div>
  </div>
</template>
