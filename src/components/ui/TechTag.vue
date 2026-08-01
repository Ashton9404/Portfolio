<script setup lang="ts">
withDefaults(defineProps<{ emphasis?: boolean }>(), { emphasis: false })
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs whitespace-nowrap"
    :class="
      emphasis
        ? 'border-accent-500/30 bg-accent-500/10 text-accent-700 dark:text-accent-300'
        : 'border-edge bg-surface-subtle text-fg-muted'
    "
  >
    <slot />
  </span>
</template>
