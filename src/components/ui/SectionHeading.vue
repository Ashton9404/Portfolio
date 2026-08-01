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
    <p class="text-accent-600 dark:text-accent-400 font-mono text-xs tracking-widest uppercase">
      {{ eyebrow }}
    </p>
    <h2 class="text-fg mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-fg-muted mt-3 max-w-2xl">
      {{ subtitle }}
    </p>
  </header>
</template>
