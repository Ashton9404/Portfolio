import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Reads an array of strings out of the locale files.
 *
 * `t()` only resolves leaf strings, so lists (responsibilities, features,
 * roadmap items) need `tm()` to fetch the array and `rt()` to resolve each
 * entry. Wrapping that pair once keeps the ceremony out of every component.
 */
export function useMessageList(key: MaybeRefOrGetter<string>): ComputedRef<string[]> {
  const { tm, rt } = useI18n()

  return computed(() => {
    const messages = tm(toValue(key))
    if (!Array.isArray(messages)) return []
    return messages.map((message) => rt(message as Parameters<typeof rt>[0]))
  })
}
