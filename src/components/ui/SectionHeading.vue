<script setup lang="ts">
defineProps<{
  /** Small mono label above the title, e.g. "01 / About". */
  eyebrow: string
  title: string
  /** Optional one-line framing sentence under the title. */
  subtitle?: string
}>()
</script>

<template>
  <header class="mb-10 sm:mb-12">
    <p class="font-mono text-xs tracking-widest text-accent-600 uppercase dark:text-accent-400">
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-3 max-w-2xl text-fg-muted">
      {{ subtitle }}
    </p>
  </header>
</template>
