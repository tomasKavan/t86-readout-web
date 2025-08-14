<script setup lang="ts">
import { type MeasPointDetailMetricFragment } from '../../../graphql/types/graphql';
import { mdmd } from '../../../utils/DateFormatter'
import { getFunctionLabel, getTypeLabel } from '../../../utils/MetricTypeTransformers';

const { metrics } = defineProps<{
  metrics: MeasPointDetailMetricFragment[]
}>()
const emit = defineEmits<{
  (e: 'initMetricDelete', payload: string): void
  (e: 'initMetricAdd'): void
}>()

</script>

<template>
  <DataTable :value="metrics" size="small">
    <Column field="id" header="ID" :style="{ width: '2rem' }"></Column>
    <Column header="Typ" :style="{ width: '5rem' }">
      <template #body="{ data }">
        {{ getTypeLabel(data.type) }}
      </template>
    </Column>
    <Column header="Funkce" :style="{ width: '5rem' }">
      <template #body="{ data }">
        {{ getFunctionLabel(data.func) }}
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
          <i class="pi pi-trash text-red-600 cursor-pointer pr-2" @click="emit('initMetricDelete', data.id)"></i>
        </div>
      </template>
    </Column>

    <template #empty>
      <div class="text-surface-500 dark:text-surface-100">Toto měřící místo zatím nemá žádnou metriku.</div>
    </template>
  </DataTable>
</template>