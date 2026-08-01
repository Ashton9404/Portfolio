<script setup lang="ts">
defineProps<{ slug: string }>()
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-20">
    <p class="font-mono text-sm text-fg-faint">Project detail — {{ slug }}</p>
  </div>
</template>
