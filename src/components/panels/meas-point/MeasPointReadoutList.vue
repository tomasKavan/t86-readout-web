<script setup lang="ts">
import { computed } from 'vue';
import type { MBusReadoutErrCode, MeasPointSubject, MetricType, ReadoutSource } from '../../../graphql/types/graphql';
import { getUnit, names as metricNames } from '../../../utils/MetricTypeTransformers';
import { mdmd } from '../../../utils/DateFormatter';
import { readoutSourceNames } from '../../../utils/ReadoutTransformers';

export type Filter = {
  from: Date | null,
  to: Date | null,
  metricIds: number[]
}

type MetricMin = {
  id: number,
  type: MetricType
}

type Opt = {
  id: number,
  label: string
}

type ReadoutMin = {
  id: number,
  source: ReadoutSource,
  createdUTCTime: Date,
  meterUTCTimestamp: Date,
  value: number,
  errorCode?: MBusReadoutErrCode,
  errorDetails?: string,
  metric: MetricMin
}

type PageIndex = {
  first: number,
  rows: number,
}

const filter = defineModel<Filter>('filter', { required: true })

const { readouts, readoutsCnt, metrics, measPointSubject } = defineProps<{
  readouts: ReadoutMin[],
  readoutsCnt: number,
  metrics: MetricMin[],
  measPointSubject: MeasPointSubject,
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'loadPage', payload: PageIndex): void,
  (e: 'initReadoutDelete', payload: number): void,
  (e: 'initReadoutAdd'): void,
}>()

const metricOpts = computed<Opt[]>(() => {
  return metrics.map(m => {
    return { id: m.id, label: metricNames[m.type] } as Opt
  })
})

type DatePicType = null | Date | Date[] | (null | Date)[]
const dateRangeModel = computed<DatePicType>({
  get: (): DatePicType => {
    return [filter.value.from, filter.value.to]
  },
  set: (v: DatePicType) => {
    if (v instanceof Date) {
      filter.value.from = v
      filter.value.to = null
      return
    }
    if (v instanceof Array) {
      filter.value.from = v[0] || null
      filter.value.to = v[1] || null
      return
    }
    filter.value.from = null
    filter.value.to = null
  } 

})

const loadPage = (params: PageIndex) => {
  emit('loadPage', params)
}

</script>

<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row gap-3 pt-3 pb-5">
      <div class="flex flex-col w-70 ">
        <label for="range" class="pb-1 font-light text-xs text-surface-700 dark:text-surface-0">Časové rozmezí</label>
        <DatePicker 
          name="range" 
          selectionMode="range" 
          showIcon 
          fluid 
          dateFormat="dd.mm.y" 
          :showTime="true" 
          v-model="dateRangeModel"
          size="small"
        />
      </div>
      <div class="flex flex-col w-50">
        <label for="metrics" class="pb-1 font-light text-xs text-surface-700 dark:text-surface-0">Metriky</label>
        <MultiSelect 
          name="metrics" 
          size="small" 
          v-model="filter.metricIds" 
          :options="metricOpts" 
          optionLabel="label" 
          optionValue="id"
          placeholder="Vyber…"
        >
          <template #value>
            <span v-if="!filter.metricIds.length">Vyber…</span>
            <span v-else-if="filter.metricIds.length === metricOpts.length">Všechny</span>
            <span v-else>{{ filter.metricIds }}</span>
          </template>
        </MultiSelect>
      </div>
    </div>
    <div class="pt-6">
      <Button icon="pi pi-plus" variant="text" @click="emit('initReadoutAdd')" />
    </div>
  </div>

  <div class="">
    <DataTable 
      :value="readouts" 
      paginator
      lazy
      size="small"
      scrollable
      scrollHeight="flex"
      dataKey="id"
      @page="loadPage"
      :rowsPerPageOptions="[20, 50]"
      :totalRecords="readoutsCnt"
      :rows="20"
    >
      <Column :style="{ width: '3rem' }">
        <template #body="{ data }">
          <i v-if="data.errorCode" class="pi pi-exclamation-triangle text-red-600" />
          <i v-else class="pi pi-check text-primary" />
        </template>
      </Column>
      <Column field="metric.id" header="Metrika" :style="{ width: '7rem' }"></Column>
      <Column header="Datum" :style="{ width: '11rem' }">
        <template #body="{ data }">
          {{  mdmd(data.meterUTCTimestamp) }}
        </template>
      </Column>
      <Column header="Zdroj" :style="{ width: '11rem' }">
        <template #body="{ data }">
          {{  readoutSourceNames[data.source as ReadoutSource] }}
        </template>
      </Column>
      <Column field="value" :style="{ textAlign: 'right' }">
        <template #header>
          <div class="w-full font-semibold">Hodnota</div>
        </template>
        <template #body="{ data }">
          <span v-if="data.errorCode" v-tooltip.left="data.errorDetails">{{ data.errorCode }}</span>
          <span v-else>{{ data.value }} {{ getUnit(measPointSubject, data.metric.type).abbr }}</span>
        </template>
      </Column>
      <Column field="value" :style="{ width: '2rem' }">
        <template #body="{ data }">
          <i class="pi pi-trash text-red-600 cursor-pointer" @click="emit('initReadoutDelete', data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>


</style>