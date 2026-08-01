<script setup lang="ts">
withDefaults(defineProps<{ interactive?: boolean }>(), { interactive: false })
</script>

<template>
  <div
    class="rounded-xl border border-edge bg-surface-raised transition-colors"
    :class="interactive ? 'hover:border-edge-strong hover:bg-surface-subtle' : ''"
  >
    <slot />
  </div>
</template>
