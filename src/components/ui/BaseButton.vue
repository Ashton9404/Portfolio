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

/*
  Bind only the attributes that belong to the element actually being rendered.

  Binding `:href` unconditionally looks harmless but breaks RouterLink: `href`
  is not one of its props, so it falls through onto the root <a> *after*
  RouterLink has set its own href — and an undefined fallthrough attribute
  removes it. The result is an anchor with no href, which is unclickable for
  keyboard users and invisible to crawlers.
*/
const attrs = computed(() => {
  if (props.to) return { to: props.to }

  if (props.href) {
    const isExternal = props.href.startsWith('http')
    return {
      href: props.href,
      target: isExternal ? '_blank' : undefined,
      rel: isExternal ? 'noopener noreferrer' : undefined,
    }
  }

  return { type: 'button' as const }
})

const VARIANTS: Record<Variant, string> = {
  /*
    accent-600 in both themes rather than lightening to accent-500 in dark:
    white on accent-500 measures 4.46:1, just under the 4.5:1 AA threshold for
    15px text. accent-600 reaches 6.3:1 and reads just as well on near-black.
  */
  primary: 'bg-accent-600 text-white hover:bg-accent-700',
  secondary:
    'border border-edge bg-surface-raised text-fg hover:border-edge-strong hover:bg-surface-subtle',
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
    v-bind="attrs"
    class="inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
    :class="[VARIANTS[variant], SIZES[size]]"
  >
    <slot />
  </component>
</template>
