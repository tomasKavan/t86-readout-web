<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePageTitle } from '../composables/usePageTitle'
import { useDTFormatter } from '../composables/DateFormatter'

const { setTitle } = usePageTitle()
const { tels } = useDTFormatter()

onMounted(() => {
  setTitle('Přímé dotazování M-Bus sběrnice')
})

const addr = ref<number | null>(null)
const queryActive = ref<boolean>(false)
const response = ref(null)
const error = ref<null | Error>(null)

const formatResponse = computed<string>(() => {
  if (error.value) return error.value.toString()
  if (!response.value ) return '\u00A0'

  try { 
    return JSON.stringify(response.value, null, '\n')
  } catch (e: any) {
    if (e instanceof Error) {
      return e.toString()
    }
    if (typeof e.toString === 'function') {
      return e.toString()
    }
    return 'Unknown error occured'
  }
})

const makeQuery = () => {
  console.log(`Query address ${addr.value}`)
}

</script>

<template>
  <Toolbar style="border: none; border-radius: 0px; padding-bottom: 1.5rem; padding-left: 0">
    <template #start>
      <InputNumber 
        v-model="addr" 
        class="w-44"
        name="shortAddr" 
        :min="0" 
        :max="255"  
        size="small" 
        placeholder="Adresa" 
      />
      <Button 
        @click="makeQuery" 
        :disabled="queryActive || typeof addr !== 'number'" 
        size="small" 
        label="Vyčíst" 
        class="ml-3" 
      />
      <Button v-if="queryActive" size="small" label="Zrušit" class="ml-3" severity="warn" />
    </template>

    <template #end>
      <i v-if="queryActive" class="pi pi-spin pi-spinner" style="font-size: 1.4rem"></i>
      <div v-if="!queryActive && response" class="">Doba čtení: {{tels(responseTime)}}</div>
    </template>
  </Toolbar>

  <div class="border border-dashed rounded-md p-4 font-mono text-sm bg-surface-50 border-surface-200 dark:border-surface-700 dark:bg-surface-800">
    {{ formatResponse }}
  </div>
</template>
