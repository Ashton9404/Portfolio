<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import PageSection from '@/components/layout/PageSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import OpenSourceSection from '@/components/sections/OpenSourceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import { useSeo } from '@/composables/useSeo'

const { t } = useI18n()

useSeo({
  title: () => t('seo.homeTitle'),
  description: () => t('seo.homeDescription'),
})
</script>

<template>
  <!-- Single root element: <Transition> in App.vue cannot animate a fragment. -->
  <div>
    <HeroSection />

    <PageSection id="about">
      <AboutSection />
    </PageSection>

    <PageSection id="skills" tone="subtle">
      <SkillsSection />
    </PageSection>

    <PageSection id="experience">
      <ExperienceSection />
    </PageSection>

    <PageSection id="projects" tone="subtle">
      <ProjectsSection />
    </PageSection>

    <PageSection id="open-source">
      <OpenSourceSection />
    </PageSection>

    <PageSection id="contact" tone="subtle">
      <ContactSection />
    </PageSection>
  </div>
</template>
