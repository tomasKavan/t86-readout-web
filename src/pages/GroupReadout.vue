<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePageTitle } from '../composables/usePageTitle'

const { setTitle } = usePageTitle()

onMounted(() => {
  setTitle(`Hromadný manuální odečet`)
})

const occurence = ref<Date>(new Date())


</script>

<template>
  <Toolbar style="border: none; border-radius: 0px; padding-bottom: 1.5rem; padding-left: 0">
    <template #start>
      <label for="occurence" class="mr-3 font-medium text-surface-900 dark:text-surface-0">Čas odečtu</label>
      <DatePicker 
        v-model="occurence" 
        name="occurence" 
        size="small" 
        dateFormat="dd.mm.yy"
        :showTime="true"
      />
    </template>

    <template #end>
      <Button size="small" class="mr-3" label="Vymazat" variant="outlined" severity="danger" />
      <Button size="small" label="Uložit" />
    </template>
  </Toolbar>
</template>