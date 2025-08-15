<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { usePageTitle } from '../composables/UsePageTitle'
import { 
  type MeasPointListFragment, 
  MeasPointSubject, 
  MetricType, 
  SerieSampling, 
  type MeasPointListMetricFragment, 
  type SerieEntry 
} from '../graphql/types/graphql'
import { useMeasPointList } from '../services/MeasPointList'
import { useSerie } from '../services/Serie'
import { mdmd } from '../utils/DateFormatter'

const { setTitle } = usePageTitle()

onMounted(() => {
  setTitle('Grafy spotřeby')
})

const { serie, query } = useSerie()

const serieEntries = computed(() => {
  if (!serie || !serie.value) return []
  return serie.value.entries
})

const chartData = computed(() => {
  const save: Date[] =[]
  const buckets = serieEntries.value.reduce((a, i) => {
    const sen = i as SerieEntry
    if (!save.includes(sen.timestampUTC)) {
      a.push(mdmd(sen.timestampUTC))
      save.push(sen.timestampUTC)
    }
    return a
  }, [] as string[])
  const mps = serieEntries.value.reduce((a, i) => {
    const sen = i as SerieEntry
    if (!a.includes(sen.metricId)) a.push(sen.metricId)
    return a
  }, [] as number[])
  return {
    labels: buckets,
    datasets: mps.map(mp => {
      return {
        label: mp,
        data: serieEntries.value.filter(se => {
          return (se as SerieEntry).metricId === mp
        }).map(se => {
          return (se as SerieEntry).value
        })
      }
    })
  }
})

const subject = ref<MeasPointSubject>(MeasPointSubject.Electricity)
const metricType = ref<MetricType>(MetricType.Consumption)
const sampling = ref<SerieSampling>(SerieSampling.D)
const range = ref<{ from: Date | null, to: Date | null }>({ from: null, to: null})

type SubjOpt = {
  subject: MeasPointSubject,
  metricType: MetricType,
  icon?: string,
  label: string
}

const availableSubjects: SubjOpt[] = [{
  subject: MeasPointSubject.Electricity,
  metricType: MetricType.Consumption,
  icon: 'bolt',
  label: 'Elektřina'
}, {
  subject: MeasPointSubject.Water,
  metricType: MetricType.Consumption,
  icon: 'bolt',
  label: 'Voda'
}, {
  subject: MeasPointSubject.Heat,
  metricType: MetricType.Consumption,
  icon: 'bolt',
  label: 'Teplo'
}, {
  subject: MeasPointSubject.GasFuel,
  metricType: MetricType.Consumption,
  icon: 'bolt',
  label: 'Plyn'
}, {
  subject: MeasPointSubject.Cleaning,
  metricType: MetricType.TimeElapsed,
  icon: 'bolt',
  label: 'Úklid'
}]

const subjectInp = computed<SubjOpt>({
  get: () => {
    return availableSubjects.find(as => {
      return (as.subject === subject.value && as.metricType === metricType.value) 
    }) || availableSubjects[0]
  },
  set: (v: SubjOpt) => {
    subject.value = v.subject
    metricType.value = v.metricType
  }
})

type SamplingOpt = {
  label: string,
  value: SerieSampling
}
const samplingOpts = ref<SamplingOpt[]>([{
  value: SerieSampling.Q,
  label: "15 minut"
}, {
  value: SerieSampling.H,
  label: "Hodina"
}, {
  value: SerieSampling.D,
  label: "Den"
}, {
  value: SerieSampling.M,
  label: "Měsíc"
}])

const rangeInp = computed<Date | null | Date[] | (Date | null)[]> ({
  get: () => {
    if (!range.value.from) return null
    return [range.value.from, range.value.to]
  },
  set: (v: Date | null | Date[] | (Date | null)[]) => {
    if (v instanceof Array) {
      range.value = { from: v[0] || null, to: v[1] || null}
      return
    }
    range.value = { from: v as Date || null, to: null}
  }
})

const isTimeRelevant = computed<boolean>(() => {
  return sampling.value === SerieSampling.Q || sampling.value === SerieSampling.H
})

const queryActive = ref<boolean>(false)

type MeasPointOpt = {
  metric: MeasPointListMetricFragment,
  measPoint: MeasPointListFragment,
  label: string
}

const selectedMp = ref<MeasPointOpt[] | null>(null)

const { measPoints } = useMeasPointList()
const filteredMeasPoints = computed<MeasPointOpt[]>(() => {
  if (!measPoints.value) return []
  let filtered: MeasPointOpt[] = []
  for (const mp of measPoints.value) {
    if (mp.subject !== subject.value) continue 
    const m: MeasPointListMetricFragment = mp.metrics.find(m => (m as MeasPointListMetricFragment).type === metricType.value) as MeasPointListMetricFragment
    if (!m) continue
    filtered.push({
      measPoint: mp,
      metric: m,
      label: mp.name
    })
  }
  return filtered
})

const load = () => {
  if (!range.value.from || !range.value.to || !selectedMp.value) return
  query({
    fromUTC: range.value.from,
    toUTC: range.value.to,
    sampling: sampling.value,
    metricIds: selectedMp.value?.map(smi => smi.metric.id)
  })
}

</script>

<template>
  <Toolbar style="border: none; border-radius: 0px; padding-bottom: 1.5rem; padding-left: 0">
    <template #start>
      <div class="flex flex-col mr-4">
        <label for="sampling" class="pb-1 text-surface-800 dark:text-surface-0">Vzorek</label>
        <SelectButton 
          name="sampling" 
          v-model="sampling" 
          :options="samplingOpts" 
          optionLabel="label" 
          optionValue="value" 
          size="small"
        />
      </div>
      <div class="flex flex-col w-34 mr-4">
        <label for="type" class="pb-1 text-surface-800 dark:text-surface-0">Typ</label>
        <Select
          name="type" 
          v-model="subjectInp" 
          :options="availableSubjects" 
          optionLabel="label" 
          size="small"
        />
      </div>
      <div class="flex flex-col mr-4" :class="{ 'w-70' : isTimeRelevant, 'w-50': !isTimeRelevant}">
        <label for="range" class="pb-1 text-surface-800 dark:text-surface-0">Rozmezí</label>
        <DatePicker 
            name="range" 
            selectionMode="range" 
            showIcon 
            fluid 
            dateFormat="dd.mm.y" 
            :showTime="isTimeRelevant" 
            v-model="rangeInp"
            size="small"
            placeholder="Doba"
          />
      </div>
      <div class="flex flex-col w-50 mr-3">
        <label for="measpoints" class="pb-1 text-surface-800 dark:text-surface-0">Měřící místa</label>
        <MultiSelect 
          name="measpoints" 
          size="small" 
          v-model="selectedMp" 
          :options="filteredMeasPoints" 
          optionLabel="label" 
          placeholder="Vyber…"
        />
      </div>
      <div class="flex flex-col w-20">
        <Button label="Načíst" size="small" class="mt-7" @click="load"></Button>
      </div>
    </template>

    <template #end>
      <i v-if="queryActive" class="pi pi-spin pi-spinner" style="font-size: 1.4rem"></i>
    </template>
  </Toolbar>

  <div class="p-4">
    <Chart type="line" :data="chartData" class="h-[30rem]"> </Chart>
  </div>
</template>
