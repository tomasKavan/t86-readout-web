<script setup lang="ts">
import { computed } from 'vue'
import type { 
  MeasPointSubject, 
  MetricType, 
  ServiceEventType 
} from '../../../graphql/types/graphql'
import { 
  getUnit, 
  names as metricNames 
} from '../../../utils/MetricTypeTransformers'
import { mdmd, mdnt } from '../../../utils/DateFormatter'

export type Filter = {
  from: Date | null,
  to: Date | null,
  metricIds: number[],
  serviceEventIds: number[]
}

type MetricMin = {
  id: number,
  type: MetricType
}

type Opt = {
  id: number,
  label: string
}

type ServiceEventMin = {
  id: number,
  type: ServiceEventType,
  occuredUTCTime: Date
}

type CorrectionMin = {
  id: number,
  serviceEvent: ServiceEventMin,
  value: number,
  oldMeterEndValue: number | null,
  newMeterStartValue: number | null,
  oldMeterHasPhysicalDisplay: boolean | null
  oldMeterMbusValueRecordId: number | null,
  oldMeterMbusDecimalShift: number | null,
  metric: MetricMin
}

const filter = defineModel<Filter>('filter', { required: true })

const { corrections, serviceEvents, metrics, loading, measPointSubject} = defineProps<{
  corrections: CorrectionMin[],
  serviceEvents: ServiceEventMin[],
  metrics: MetricMin[],
  loading: boolean,
  measPointSubject: MeasPointSubject
}>()

const metricOpts = computed<Opt[]>(() => {
  return metrics.map(m => {
    return { id: m.id, label: metricNames[m.type] } as Opt
  })
})

const serviceEventOpts = computed<Opt[]>(() => {
  return serviceEvents.map(se => {
    return { 
      id: se.id, 
      label: 'Výměna: ' + mdnt(se.occuredUTCTime)
    } as Opt
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
      <div class="flex flex-col w-50">
        <label for="serviceEvents" class="pb-1 font-light text-xs text-surface-700 dark:text-surface-0">Servisní události</label>
        <MultiSelect 
          name="serviceEvents" 
          size="small" 
          v-model="filter.serviceEventIds" 
          :options="serviceEventOpts" 
          optionLabel="label" 
          optionValue="id"
          placeholder="Vyber…"
        >
          <template #value>
            <span v-if="!filter.serviceEventIds.length">Vyber…</span>
            <span v-else-if="filter.serviceEventIds.length === serviceEventOpts.length">Všechny</span>
            <span v-else>{{ filter.serviceEventIds }}</span>
          </template>
        </MultiSelect>
      </div>
    </div>
  </div>

  <div class="">
    <DataTable 
      :value="corrections" 
      size="small"
      scrollable
      scrollHeight="flex"
      dataKey="id"
    >
      <Column field="serviceEvent.id" header="Událost" :style="{ width: '6rem' }"></Column>
      <Column field="metric.id" header="Metrika" :style="{ width: '6rem' }"></Column>
      <Column header="Datum" :style="{ width: '11rem' }">
        <template #body="{ data }">
          {{  mdmd(data.serviceEvent.occuredUTCTime) }}
        </template>
      </Column>
      <Column field="value" :style="{ textAlign: 'right', width: '8rem' }">
        <template #header>
          <div class="w-full font-semibold">Hodnota</div>
        </template>
        <template #body="{ data }">
          {{ data.value }} {{ getUnit(measPointSubject, data.metric.type).abbr }}
        </template>
      </Column>
      <Column header="Detaily">
        <template #body="{ data }">
          
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>


</style>