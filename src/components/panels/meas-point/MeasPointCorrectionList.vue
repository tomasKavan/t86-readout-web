<script setup lang="ts">
import { computed, ref } from 'vue'
import { 
  type MeasPointDetailCorrectionFragment,
  MeasPointDetailCorrectionFragmentDoc,
  type MeasPointDetailMetricFragment,
  type MeasPointDetailServiceEventFragment,
  type MeasPointSubject
} from '../../../graphql/types/graphql'
import { getUnit, getTypeLabel } from '../../../utils/MetricTypeTransformers'
import { mdmd, mdnt } from '../../../utils/DateFormatter'
import { useFragment } from '../../../graphql/types'

export type Filter = {
  metricIds: string[],
  serviceEventIds: string[]
}

type Opt = {
  id: string,
  label: string
}

const { serviceEvents, metrics, measPointSubject} = defineProps<{
  serviceEvents: MeasPointDetailServiceEventFragment[],
  metrics: MeasPointDetailMetricFragment[],
  measPointSubject: MeasPointSubject
}>()

const filter = ref<Filter>({
  metricIds: metrics?.map(m => m.id) ?? [],
  serviceEventIds: serviceEvents?.map(se => se.id) ?? []
})

type Row = { 
  correction: MeasPointDetailCorrectionFragment, 
  serviceEvent: MeasPointDetailServiceEventFragment
}
const correctionRows = computed<Row[]>(() => {
  let out: Row[] = []
  for (const se of serviceEvents) {
    const masked = se.corrections ?? []
    const all = masked.map(i => useFragment(MeasPointDetailCorrectionFragmentDoc, i))

    out = [...out, ...all.map(a => {
      return { serviceEvent: se, correction: a}
    })]
  }
  return out
})

const metricOpts = computed<Opt[]>(() => {
  return metrics.map(m => {
    return { id: m.id, label: getTypeLabel(m.type) } as Opt
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

</script>

<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row gap-3 pt-3 pb-5">
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
      :value="correctionRows" 
      size="small"
      scrollable
      scrollHeight="flex"
      dataKey="id"
    >
      <Column field="serviceEvent.id" header="Událost" :style="{ width: '6rem' }"></Column>
      <Column field="correction.metric.id" header="Metrika" :style="{ width: '6rem' }"></Column>
      <Column header="Datum" :style="{ width: '11rem' }">
        <template #body="{ data }">
          {{  mdmd(data.serviceEvent.occuredUTCTime) }}
        </template>
      </Column>
      <Column field="correction.value" :style="{ textAlign: 'right', width: '8rem' }">
        <template #header>
          <div class="w-full font-semibold">Hodnota</div>
        </template>
        <template #body="{ data }">
          {{ data.correction.value }} {{ getUnit(measPointSubject, data.correction.metric.type).abbr }}
        </template>
      </Column>
      <Column header="Detaily">
        <template #body>
          
        </template>
      </Column>

      <template #empty>
        <div class="text-surface-500 dark:text-surface-100">Toto měřící místo zatím nemá žádnou korekci.</div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>


</style>