<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import LocaleSwitcher from '@/components/ui/LocaleSwitcher.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { profile } from '@/data/profile'

const { t } = useI18n()
const route = useRoute()

type NavKey = 'about' | 'skills' | 'experience' | 'projects' | 'openSource' | 'contact'

const NAV_ITEMS: { key: NavKey; hash: string }[] = [
  { key: 'about', hash: '#about' },
  { key: 'skills', hash: '#skills' },
  { key: 'experience', hash: '#experience' },
  { key: 'projects', hash: '#projects' },
  { key: 'openSource', hash: '#open-source' },
  { key: 'contact', hash: '#contact' },
]

/*
  Nav targets are `{ path: '/', hash }` rather than bare hashes so the links
  still work from a project detail page — they route home first, then scroll.
*/
const isMenuOpen = ref(false)
const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 8
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

// Any navigation closes the mobile panel, including same-page hash jumps.
watch(() => [route.path, route.hash], () => (isMenuOpen.value = false))
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-colors"
    :class="
      isScrolled
        ? 'border-b border-edge bg-surface/80 backdrop-blur-md'
        : 'border-b border-transparent bg-surface'
    "
  >
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
      <RouterLink
        to="/"
        class="font-mono text-sm font-semibold tracking-tight text-fg"
        :aria-label="t('nav.brandAria')"
      >
        {{ profile.name }}<span class="text-accent-500">.</span>
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Primary">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.key"
          :to="{ path: '/', hash: item.hash }"
          class="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg"
        >
          {{ t(`nav.${item.key}`) }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />

        <button
          type="button"
          class="inline-flex size-9 items-center justify-center rounded-lg border border-edge text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg md:hidden"
          :aria-label="isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path v-if="isMenuOpen" d="M6 6l12 12M18 6L6 18" />
            <path v-else d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-show="isMenuOpen"
      id="mobile-nav"
      class="border-t border-edge bg-surface md:hidden"
      aria-label="Primary mobile"
    >
      <ul class="mx-auto max-w-5xl px-4 py-2">
        <li v-for="item in NAV_ITEMS" :key="item.key">
          <RouterLink
            :to="{ path: '/', hash: item.hash }"
            class="block rounded-md px-3 py-2.5 text-sm text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg"
          >
            {{ t(`nav.${item.key}`) }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
