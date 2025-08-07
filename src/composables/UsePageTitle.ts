import { ref } from 'vue'

const title = ref('')

export function usePageTitle() {
  return {
    title,
    setTitle: (newTitle: string) => {
      title.value = newTitle
    }
  }
}