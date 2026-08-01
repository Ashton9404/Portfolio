<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <!-- Keyboard users get past the nav without tabbing through every link. -->
  <a
    href="#main"
    class="sr-only rounded-lg bg-accent-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
  >
    Skip to content
  </a>

  <div class="flex min-h-dvh flex-col">
    <AppHeader />

    <main id="main" class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition
          enter-active-class="transition-opacity duration-200 ease-out"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150 ease-in"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>
