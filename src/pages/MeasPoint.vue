<script setup lang="ts">

import { computed, onMounted, ref, watch } from 'vue'
import { usePageTitle } from '../composables/usePageTitle'
import { useRoute } from 'vue-router'
import MeasPointMetricList from '../components/panels/meas-point/MeasPointMetricList.vue'
import MeasPointServiceEventList from '../components/panels/meas-point/MeasPointServiceEventList.vue'
import MeasPointReadoutList from '../components/panels/meas-point/MeasPointReadoutList.vue'
import MeasPointCorrectionList from '../components/panels/meas-point/MeasPointCorrectionList.vue'
import { MBusReadoutErrCode, MeasPointSubject, MetricType, ReadoutSource, ServiceEventType } from '../graphql/types/graphql'

const { setTitle } = usePageTitle()
const { params } = useRoute()

onMounted(() => {
  setTitle(`Měřící místo: ${params.id}`)
})

type ServiceEvent = {
  id: number,
  type: ServiceEventType,
  occuredUTCTime: Date,
  oldMeterManufacturer?: string | null,
  oldMeterType?: string | null,
  oldMBusAddr?: number | null,
  oldMBusSerial?: string | null,
  correctionCnt: number,
  createdUTCTime: Date
}

type Correction = {
  id: number,
  serviceEvent: {
    id: number,
    type: ServiceEventType,
    occuredUTCTime: Date
  },
  value: number,
  oldMeterEndValue: number | null,
  newMeterStartValue: number | null,
  oldMeterHasPhysicalDisplay: boolean | null
  oldMeterMbusValueRecordId: number | null,
  oldMeterMbusDecimalShift: number | null,
  metric: {
    id: number,
    type: MetricType
  }
}

type Readout = {
  id: number,
  createdUTCTime: Date,
  meterUTCTimestamp: Date,
  source: ReadoutSource,
  value: number,
  errorCode?: MBusReadoutErrCode,
  errorDetails?: string,
  metric: { id: number, type: MetricType }
}

type Metric = {
  id: number,
  type: MetricType,
  func?: string,
  hasPhysicalDisplay?: boolean,
  mbusValueRecordId?: number | null,
  mbusDecimalShift?: number | null,
  readoutCnt: number,
  correctionCnt: number,
  createdUTCTime?: Date,
}

type MeasPoint = {
  id?: string,
  name?: string,
  mbusAddr?: number | null,
  mbusSerial?: string | null,
  metricCnt?: number,
  lastRead?: Date,
  autoReadoutEnabled?: boolean,
  subject: MeasPointSubject,
  subjectSpec?: string | null,
  roomNo?: string,
  instDetails?: string,
  notes?: string,
  meterType?: string | null,
  meterManufacturer?: string | null,
  metrics: Metric[],
  serviceEvents: ServiceEvent[]
}

const product = ref<MeasPoint>({
  id: 'S.EL.01.01',
  name: 'Elektřina Byt 1',
  mbusAddr: 1,
  mbusSerial: '2543781',
  metricCnt: 1,
  lastRead: new Date(),
  autoReadoutEnabled: false,
  subject: MeasPointSubject.Electricity,
  subjectSpec: null,
  roomNo: '0.0.3',
  instDetails: 'v RSS',
  notes: 'aaa',
  meterManufacturer: 'INA',
  meterType: 'PRO380-Mb',
  metrics: [{
    id: 1,
    type: MetricType.Consumption,
    func: 'sum',
    hasPhysicalDisplay: true,
    mbusValueRecordId: 0,
    mbusDecimalShift: 1,
    createdUTCTime: new Date(),
    readoutCnt: 10,
    correctionCnt: 0
  }],
  serviceEvents: [{
    id: 10,
    type: ServiceEventType.MeterReplacement,
    occuredUTCTime: new Date(),
    createdUTCTime: new Date(),
    oldMeterManufacturer: 'AAA',
    oldMeterType: 'PRO380-Mb',
    oldMBusAddr: 5,
    oldMBusSerial: '21080518',
    correctionCnt: 1
  }]
})


const readoutsRaw: Readout[] = []
for (let i = 0; i < 10000; i++) {
  readoutsRaw.push({
    id: i,
    createdUTCTime: new Date(),
    source: ReadoutSource.Mbus,
    meterUTCTimestamp: new Date(),
    value: 154 + i,
    metric: { id: 1, type: MetricType.Consumption }
  })
}
const readouts = ref<Readout[]>(readoutsRaw)
const readoutsLoading = ref<boolean>(false)

const corrections = ref<Correction[]>([{
  id: 1,
  serviceEvent: {
    id: 1,
    type: ServiceEventType.MeterReplacement,
    occuredUTCTime: new Date()
  },
  value: 564,
  oldMeterEndValue: null,
  newMeterStartValue: null,
  oldMeterHasPhysicalDisplay: true,
  oldMeterMbusValueRecordId: 2,
  oldMeterMbusDecimalShift: 0,
  metric: {
    id: 1,
    type: MetricType.Consumption
  }
}])
const correctionsLoading = ref<boolean>(false)

const readoutFilter = ref({
  from: new Date(),
  to: new Date(),
  metricIds: [1]
})
watch(readoutFilter, () => {
  console.log('readout filter changed')
}, { deep: true })

const correctionFilter = ref({
  from: new Date(),
  to: new Date(),
  metricIds: [1],
  serviceEventIds: [10]
})
watch(readoutFilter, () => {
  console.log('correction filter changed')
}, { deep: true })

type SubjectOption = {
  id: string,
  label: string
}
const subjects: SubjectOption[] = [{
    id: 'ele',
    label: 'Elektřina'
}, {
    id: 'wat:hot',
    label: 'Teplá voda'
}, {
    id: 'wat:cold',
    label: 'Studená voda'
}, {
    id: 'hth',
    label: 'Teplo'
}, {
    id: 'gas',
    label: 'Plyn'
}, {
    id: 'env',
    label: 'Prostředí'
}, {
    id: 'cln',
    label: 'Úklid'
}]

const subjectOptsTranslator = computed<SubjectOption | null>({
  get: (): SubjectOption | null => {
    if (!product.value) return null
    let id = product.value.subject + ':' + product.value.subjectSpec
    if (!product.value.subjectSpec) id = product.value.subject ?? ''
    return subjects.find(s => s.id === id) || null
  },
  set: (val?: SubjectOption | null) => {
    if (!val) {
      throw new Error('Subject must be set')
    }
    const spl = val.id.split(':')
    product.value.subject = spl[0] as MeasPointSubject
    if (spl.length !== 2) {
      product.value.subjectSpec = null
    } else {
      product.value.subjectSpec = spl[1]
    }
  }
})

const loadReadoutsPage = (param: { first: number, last?: number, rows?: number}) => {
  console.log(param)
}

const initReadoutAdd = () => {
  console.log('add readout')
}

const initReadoutDelete = (id: number) => {
  console.log(`delete readout ${id}`)
}

</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-6">
      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-col gap-2 col-span-12 md:col-span-3">
          <label for="id" class="font-medium text-surface-900 dark:text-surface-0">ID</label>
          <InputText id="id" type="text" v-model="product.id" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-12 md:col-span-9">
          <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Název</label>
          <InputText id="name" type="text" v-model="product.name" size="small" class="w-full" />
        </div>
      </div>
      
      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-col gap-2 col-span-12 md:col-span-3">
          <label for="subject" class="font-medium text-surface-900 dark:text-surface-0">Veličina</label>
          <Select 
            id="subject" 
            v-model="subjectOptsTranslator" 
            :options="subjects" 
            option-label="label" 
            placeholder="Vyberte veličinu" 
            class="w-full"
            size="small"
          >
            <template #option="{ option }">
              <div class="flex items-center">
                <div>{{ option.label }}</div>
              </div>
            </template>
          </Select>
        </div>
        <div class="flex flex-col gap-2 col-span-12 md:col-span-2">
          <label for="roomNo" class="font-medium text-surface-900 dark:text-surface-0">V místnosti</label>
          <InputText id="roomNo" type="text" v-model="product.id" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-12 md:col-span-7">
          <label for="instDetail" class="font-medium text-surface-900 dark:text-surface-0">Detaily umístění</label>
          <InputText id="instDetail" type="text" size="small" class="w-full" />
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-col gap-2 col-span-12">
          <label for="id" class="font-medium text-surface-900 dark:text-surface-0">Poznámky</label>
          <Textarea id="id" type="text" v-model="product.notes" size="small" class="w-full" />
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-col gap-2 col-span-12">
          <div class="flex flex-row justify-end">
            <Button label="Zrušit" severity="danger" variant="outlined" class="w-32 mr-3" />
            <Button label="Uložit" class="w-32" />
          </div>
        </div>
      </div>

      <Panel header="MBus" class="mt-3">
        <template #icons>
          <div class="flex flex-row pr-5 h-full pt-2">
            <label for="autoReadAll" class="font-medium text-surface-900 dark:text-surface-0 pr-4 pl-2">Automatické vyčítání</label>
            <ToggleSwitch id="autoReadAll"></ToggleSwitch>
          </div>
        </template>
        <div class="grid grid-cols-12 gap-6">
          <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
            <label for="id" class="font-medium text-surface-900 dark:text-surface-0">Adresa</label>
            <InputText id="id" type="text" disabled v-model="product.mbusAddr" size="small" class="w-full" />
          </div>
          <div class="flex flex-col gap-2 col-span-8 md:col-span-2">
            <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Seriové číslo</label>
            <InputText id="name" type="text" disabled v-model="product.mbusSerial" size="small" class="w-full" />
          </div>
          <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
            <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Výrobce</label>
            <InputText id="name" type="text" disabled v-model="product.meterManufacturer" size="small" class="w-full" />
          </div>
          <div class="flex flex-col gap-2 col-span-8 md:col-span-6">
            <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Typ</label>
            <InputText id="name" type="text" disabled v-model="product.meterType" size="small" class="w-full" />
          </div>
        </div>
      </Panel>
    </div>

    <Tabs value="0">
      <TabList>
        <Tab value="0"><i class="pi pi-gauge pr-2"></i>Metriky</Tab>
        <Tab value="1"><i class="pi pi-pen-to-square pr-2"></i>Odečty</Tab>
        <Tab value="2"><i class="pi pi-wrench pr-2"></i>Servisní události</Tab>
        <Tab value="3"><i class="pi pi-sort-alt pr-2"></i>Korekce</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <MeasPointMetricList :metrics="product.metrics" />
        </TabPanel>
        <TabPanel value="1">
          <MeasPointReadoutList 
            :metrics="product.metrics"
            :readouts="readouts"
            :readoutsCnt="readouts.length"
            :loading="readoutsLoading"
            :measPointSubject="product.subject"
            @loadPage="loadReadoutsPage"
            @initReadoutAdd="initReadoutAdd"
            @initReadoutDelete="initReadoutDelete"
            v-model:filter="readoutFilter" />
        </TabPanel>
        <TabPanel value="2">
          <MeasPointServiceEventList :serviceEvents="product.serviceEvents" />
        </TabPanel>
        <TabPanel value="3">
          <MeasPointCorrectionList 
          :metrics="product.metrics"
          :serviceEvents="product.serviceEvents"
          :corrections="corrections"
          :loading="correctionsLoading"
          :measPointSubject="product.subject"
          v-model:filter="correctionFilter"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
