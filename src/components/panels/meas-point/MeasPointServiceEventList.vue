<script setup lang="ts">
import { mdmd } from '../../../utils/DateFormatter'

const { serviceEvents } = defineProps<{
  serviceEvents: any[]
}>()
const emit = defineEmits<{
  (e: 'initServiceEventRevert'): void,
  (e: 'initServiceEventAdd'): void,
}>()

const showDetails = (se: any) => {

}

</script>

<template>
  <DataTable :value="serviceEvents" size="small">
    <Column field="id" header="ID" :style="{ width: '2rem' }"></Column>
    <Column header="Typ" :style="{ width: '5rem' }">
      <template #body>
        Výměna elektroměru
      </template>
    </Column>
    <Column header="Datum" :style="{ width: '8rem' }">
      <template #body="{ data }">
      {{ data.occuredUTCTime ? mdmd(data.occuredUTCTime) : ''}}
      </template>
    </Column>
    <Column header="Korekcí" :style="{ width: '4rem' }">
      <template #body="{ data }">
        {{ data.correctionCnt || 0 }}
      </template>
    </Column>
    <Column header="Vytvořeno" :style="{ width: '8rem' }">
      <template #body="{ data }">
        {{ data.createdUTCTime ? mdmd(data.createdUTCTime) : '' }}
      </template>
    </Column>
    <Column :style="{ width: '1rem' }">
      <template #header>
        <div class="flex flex-row justify-end w-full">
          <Button icon="pi pi-plus" variant="text" size="small" @click="emit('initServiceEventRevert')"></Button>
          <Button icon="pi pi-plus" variant="text" size="small" @click="emit('initServiceEventAdd')"></Button>
        </div>
      </template>
      <template #body="{ data }">
        <div class="flex flex-row justify-end w-full">
          <i class="pi pi-pen-to-square text-primary cursor-pointer pr-2" @click="showDetails(data)"></i>
        </div>
      </template>
    </Column>

    <template #empty>
      <div class="text-surface-500 dark:text-surface-100">Toto měřící místo zatím nemá žádnou metriku.</div>
    </template>
  </DataTable>
</template>