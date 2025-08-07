<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import { usePageTitle } from '../composables/usePageTitle'
import { useRoute } from 'vue-router'
import MeasPointMetricList from '../components/panels/meas-point/MeasPointMetricList.vue'

const { setTitle } = usePageTitle()
const { params } = useRoute()

onMounted(() => {
  setTitle(`Měřící místo: ${params.id}`)
})

type ServiceEvent = {

}

type Correction = {

}

type Readout = {
  id?: number,
}

type Metric = {
  id?: number,
  type?: string,
  func?: string,
  hasPhysicalDisplay?: boolean,
  mbusValueRecordId?: number | null,
  mbusDecimalShift?: number | null,
  readoutCnt?: number,
  correctionCnt?: number,
  createdUTCTime?: Date
}

type Product = {
  id?: string,
  name?: string,
  mbusAddr?: number | null,
  mbusSerial?: string | null,
  metricCnt?: number,
  lastRead?: Date,
  autoReadoutEnabled?: boolean,
  subject?: string,
  subjectSpec?: string | null,
  roomNo?: string,
  instDetails?: string,
  notes?: string,
  meterType?: string | null,
  meterManufacturer?: string | null,
  metrics: Metric[]
}

const product = ref<Product>({
  id: 'S.EL.01.01',
  name: 'Elektřina Byt 1',
  mbusAddr: 1,
  mbusSerial: '2543781',
  metricCnt: 1,
  lastRead: new Date(),
  autoReadoutEnabled: false,
  subject: 'ele',
  subjectSpec: null,
  roomNo: '0.0.3',
  instDetails: 'v RSS',
  notes: 'aaa',
  meterManufacturer: 'INA',
  meterType: 'PRO380-Mb',
  metrics: [{
    id: 1,
    type: 'cons',
    func: 'sum',
    hasPhysicalDisplay: true,
    mbusValueRecordId: 0,
    mbusDecimalShift: 1,
    createdUTCTime: new Date(),
    readoutCnt: 10,
    correctionCnt: 0
  }]
})

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
      product.value.subject = undefined
      product.value.subjectSpec = undefined
      return 
    }
    const spl = val.id.split(':')
    product.value.subject = spl[0]
    if (spl.length !== 2) {
      product.value.subjectSpec = null
    } else {
      product.value.subjectSpec = spl[1]
    }
  }
})

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
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="id" class="font-medium text-surface-900 dark:text-surface-0">M-Bus Adresa</label>
          <InputText id="id" type="text" v-model="product.mbusAddr" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-2">
          <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Serial</label>
          <InputText id="name" type="text" v-model="product.mbusSerial" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Výrobce</label>
          <InputText id="name" type="text" v-model="product.meterManufacturer" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-6">
          <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Typ</label>
          <InputText id="name" type="text" v-model="product.meterType" size="small" class="w-full" />
        </div>
      </div>
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
          <MeasPointMetricList :metrics="product.metrics"></MeasPointMetricList>
        </TabPanel>
        <TabPanel value="1">

        </TabPanel>
        <TabPanel value="2">

        </TabPanel>
        <TabPanel value="3">

        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
