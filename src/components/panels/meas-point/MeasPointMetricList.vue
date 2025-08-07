<script setup lang="ts">
import { useDTFormatter } from '../../../composables/DateFormatter'

const { mdmd } = useDTFormatter()

const { metrics } = defineProps(['metrics'])
const emit = defineEmits<{
  (e: 'navToMetricReadout', payload: number): void,
  (e: 'navToMetricCorrection', payload: number): void,
  (e: 'initMetricDelete', payload: number): void
  (e: 'initMetricAdd'): void
}>()

const metricTypes = [{
  id: 'cons',
  label: 'Spotřeba'
}, {
  id: 'tel',
  label: 'Uběhlý čas'
}]

const metricFunc = [{
  id: 'inst',
  label: 'Okamžitá hodnota'
}, {
  id: 'sum',
  label: 'Souhrnně'
}]

</script>

<template>
  <DataTable :value="metrics" size="small">
    <Column field="id" header="ID" :style="{ width: '2rem' }"></Column>
    <Column header="Typ" :style="{ width: '5rem' }">
      <template #body="{ data }">
        {{ data.type ? metricTypes.find((i: any) => i.id === data.type).label : '' }}
      </template>
    </Column>
    <Column header="Funkce" :style="{ width: '5rem' }">
      <template #body="{ data }">
        {{ data.func ? metricFunc.find((i: any) => i.id === data.func).label : '' }}
      </template>
    </Column>
    <Column header="Záz/Pos" :style="{ width: '4rem' }">
      <template #body="{ data }">
        <div v-if="data.mbusValueRecordId !== null">
          {{ data.mbusValueRecordId }} | {{ data.mbusDecimalShift }}
        </div>
        <div v-else>
          N/A
        </div>
      </template>
    </Column>
    <Column header="# O/C" :style="{ width: '4rem' }">
      <template #body="{ data }">
        {{ data.readoutCnt || 0 }} | {{ data.correctionCnt || 0 }}
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
          <Button icon="pi pi-plus" variant="text" size="small" @click="emit('initMetricAdd')"></Button>
        </div>
      </template>
      <template #body="{ data }">
        <div class="flex flex-row justify-end w-full">
          <i class="pi pi-pen-to-square text-primary cursor-pointer pr-2" @click="emit('navToMetricReadout', data.id)"></i>
          <i class="pi pi-sort-alt text-primary cursor-pointer pr-2" @click="emit('navToMetricCorrection', data.id)"></i>
          <i class="pi pi-times text-red-600 cursor-pointer pr-2" @click="emit('initMetricDelete', data.id)"></i>
        </div>
      </template>
    </Column>

    <template #empty>
      <div class="text-surface-500 dark:text-surface-100">Toto měřící místo zatím nemá žádnou metriku.</div>
    </template>
  </DataTable>
</template>