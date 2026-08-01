<script setup lang="ts">
defineProps<{
  /** Anchor target used by the header nav, e.g. "projects". */
  id: string
  /** Alternating background to separate adjacent sections without adding borders. */
  tone?: 'default' | 'subtle'
}>()
</script>

<template>
  <!--
    scroll-mt-20 offsets the sticky header: without it, jumping to #projects
    parks the heading underneath the navbar.
  -->
  <section
    :id="id"
    class="scroll-mt-20 border-t border-edge/60 py-20 first:border-t-0 sm:py-24"
    :class="tone === 'subtle' ? 'bg-surface-subtle' : 'bg-surface'"
  >
    <div class="mx-auto max-w-5xl px-6">
      <slot />
    </div>
  </section>
</template>
