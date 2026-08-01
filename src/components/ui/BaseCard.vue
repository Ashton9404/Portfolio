<script setup lang="ts">
withDefaults(defineProps<{ interactive?: boolean }>(), { interactive: false })
</script>

<template>
  <div
    class="border-edge bg-surface-raised rounded-xl border transition-colors"
    :class="interactive ? 'hover:border-edge-strong hover:bg-surface-subtle' : ''"
  >
    <slot />
  </div>
</template>
