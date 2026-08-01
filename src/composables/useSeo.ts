import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { profile } from '@/data/profile'

interface SeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
}

/**
 * Per-route title, description, canonical URL and Open Graph tags.
 *
 * index.html carries the same tags statically for the home page, because
 * social crawlers (LinkedIn, Slack) do not execute JavaScript — this composable
 * is what keeps the project sub-pages correct for search engines, which do.
 *
 * Note: `<html lang>` is deliberately *not* set here. setLocale() in src/i18n
 * owns that attribute, and two writers would race.
 */
export function useSeo({ title, description }: SeoOptions): void {
  const route = useRoute()
  const { locale } = useI18n()

  const canonical = computed(() => new URL(route.path, profile.siteUrl).toString())
  const ogImage = `${profile.siteUrl}/og-image.png`

  useHead({
    title: () => toValue(title),
    link: [{ rel: 'canonical', href: canonical }],
    meta: [
      { name: 'description', content: () => toValue(description) },

      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: `${profile.name} — ${profile.role}` },
      { property: 'og:title', content: () => toValue(title) },
      { property: 'og:description', content: () => toValue(description) },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:locale', content: () => (locale.value === 'zh-TW' ? 'zh_TW' : 'en_US') },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => toValue(title) },
      { name: 'twitter:description', content: () => toValue(description) },
      { name: 'twitter:image', content: ogImage },
    ],
  })
}
