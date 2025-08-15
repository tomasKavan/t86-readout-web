<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePageTitle } from '../composables/UsePageTitle'
import { useMBusQuery } from '../services/MBus'

const { setTitle } = usePageTitle()

onMounted(() => {
  setTitle('Přímé dotazování M-Bus sběrnice')
})

const { response, query, loading, error } = useMBusQuery()

const addr = ref<number | null>(null)

const formatResponse = computed<string>(() => {
  if (error.value) return error.value.toString()
  if (!response.value ) return '\u00A0'

  try { 
    return JSON.stringify(response.value, null, 2)
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

const makeQuery = async () => {
  await query(addr.value || 0)
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
        :disabled="loading || typeof addr !== 'number'" 
        size="small" 
        label="Vyčíst" 
        class="ml-3" 
      />
      <Button v-if="loading" size="small" label="Zrušit" class="ml-3" severity="warn" />
    </template>

    <template #end>
      <i v-if="loading" class="pi pi-spin pi-spinner" style="font-size: 1.4rem"></i>
      <!-- <div v-if="!loading && response" class="">Doba čtení: {{tels(responseTime)}}</div> -->
    </template>
  </Toolbar>

  <pre class="border border-dashed rounded-md p-4 font-mono text-sm bg-surface-50 border-surface-200 dark:border-surface-700 dark:bg-surface-800">{{ formatResponse }}</pre>
</template>
