<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    /** Internal route — renders a RouterLink. */
    to?: string
    /** URL or in-page anchor — renders an anchor. */
    href?: string
  }>(),
  { variant: 'primary', size: 'md', to: undefined, href: undefined },
)

/*
  One component covers buttons, internal links and external links. Recruiters
  click "View Projects" (anchor), "Download Resume" (file) and project cards
  (route) — all of which must look identical, so the styling lives in one place
  and only the rendered element changes.
*/
const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

const isExternal = computed(() => props.href?.startsWith('http') ?? false)

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent-600 text-white hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600',
  secondary: 'border border-edge bg-surface-raised text-fg hover:border-edge-strong hover:bg-surface-subtle',
  ghost: 'text-fg-muted hover:bg-surface-subtle hover:text-fg',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
  md: 'h-11 gap-2 px-5 text-[0.9375rem]',
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
    :class="[VARIANTS[variant], SIZES[size]]"
  >
    <slot />
  </component>
</template>
