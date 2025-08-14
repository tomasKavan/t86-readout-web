import { watch, ref } from 'vue'

export function useDebouncedRef<T>(source: () => T, delay = 300) {
  const out = ref(source()) as { value: T }
  let t: any
  watch(source, v => {
    clearTimeout(t)
    t = setTimeout(() => (out.value = v), delay)
  }, { immediate: true })
  return out
}