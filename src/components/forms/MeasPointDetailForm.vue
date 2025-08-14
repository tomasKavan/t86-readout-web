<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { MeasPointDetailMetricFragmentDoc, MeasPointSubject, MetricFunc, MetricType, type MeasPointDetailFragment } from '../../graphql/types/graphql'
import type { SaveMeasPointParams } from '../../services/MeasPointDetail'
import { useFragment } from '../../graphql/types'
import { useMeasPointListGrouping, type Opt } from '../../utils/MeasPointListTransformers'
import { getFunctionLabel, getTypeLabel } from '../../utils/MetricTypeTransformers'

const { optList } = useMeasPointListGrouping()

const props = defineProps<{
  data?: MeasPointDetailFragment | null
}>()

const emit = defineEmits<{
  (e: 'save', payload: SaveMeasPointParams): void,
  (e: 'enableAutoReadout'): void,
  (e: 'disableAutoReadout'): void,
}>()


function bootstrapData(): SaveMeasPointParams {
  return {
    id: '',
    name: '',
    subject: MeasPointSubject.Electricity,
    subjectSpec: null,
    roomNo: '',
    instDetails: '',
    notes: '',
    mbusAddr: null,
    mbusSerial: null,
    meterManufacturer: null,
    meterType: null,
    metrics: []
  }
}

function formFromProps(): SaveMeasPointParams {
  if (!props.data) {
    throw new Error('We shouldnt be here...')
  }
  return {
    id: props.data.id,
    name: props.data.name,
    subject: props.data.subject,
    subjectSpec: props.data.subjectSpec,
    roomNo: props.data.roomNo,
    instDetails: props.data.instDetails,
    notes: props.data.notes,
    mbusAddr: props.data.mbusAddr,
    mbusSerial: props.data.mbusSerial,
    meterManufacturer: props.data.meterManufacturer,
    meterType: props.data.meterType,
    metrics: props.data.metrics.map(i => useFragment(MeasPointDetailMetricFragmentDoc, i))
  }
}

const formData = ref<SaveMeasPointParams>(bootstrapData())
const isNew = computed<boolean>(() => !!props.data)
const changed = computed<boolean>(() => {
  const input = isNew ? bootstrapData() : formFromProps()
  return !(
    input.id === formData.value.id 
    && input.name === formData.value.name
    && input.subject === formData.value.subject
    && input.subjectSpec === formData.value.subjectSpec
    && input.roomNo === formData.value.roomNo
    && input.instDetails === formData.value.instDetails
    && input.notes === formData.value.notes
    && input.mbusAddr === formData.value.mbusAddr
    && input.mbusSerial === formData.value.mbusSerial
    && input.meterManufacturer === formData.value.meterManufacturer
    && input.meterType === formData.value.meterType
    && (!isNew || formData.value.metrics?.length )
  )
})

watch (() => props.data, () => {
  if (!props.data) {
    formData.value = bootstrapData()
    return
  }

  formData.value = {
    id: props.data.id,
    name: props.data.name,
    subject: props.data.subject,
    subjectSpec: props.data.subjectSpec,
    roomNo: props.data.roomNo,
    instDetails: props.data.instDetails,
    notes: props.data.notes,
    mbusAddr: props.data.mbusAddr,
    mbusSerial: props.data.mbusSerial,
    meterManufacturer: props.data.meterManufacturer,
    meterType: props.data.meterType,
    metrics: props.data.metrics.map(i => useFragment(MeasPointDetailMetricFragmentDoc, i))
  }
}, { deep: true })

const subjectOptions = optList()

const subjectOptsTranslator = computed<Opt>({
  get: () => {
    if (!formData.value) return subjectOptions[0]
    let id = formData.value.subject + ':' + formData.value.subjectSpec
    if (!formData.value.subjectSpec) id = formData.value.subject ?? ''
    return subjectOptions.find(s => s.id === id) || subjectOptions[0]
  },
  set: (val: Opt) => {
    formData.value.subject = val.subject
    formData.value.subjectSpec = val.spec
  }
})

const idpdAutoReadoutModel = computed<boolean>({
  get: () => {
    return !!(props.data ? props.data.autoReadoutEnabled : formData.value.autoReadoutEnabled)
  },
  set: (v: boolean) => {
    if (props.data) {
      if (v) {
        emit('disableAutoReadout') 
      } else {
        emit('enableAutoReadout') 
      }
    }
  }
})

const metricEditDone = () => {
  // Wondering what to do here ... we will see
}

const addNewMetricLine = () => {
  formData.value.metrics?.push({
    type: MetricType.Consumption,
    func: MetricFunc.Sum,
    mbusDecimalShift: 0,
    mbusValueRecordId: 0,
    hasPhysicalDisplay: true
  })
}

const removeMetricLine = (idx: number) => {
  formData.value.metrics?.splice(idx, 1)
}

const metricTypeOpts = [{
  id: MetricType.Consumption,
  label: getTypeLabel(MetricType.Consumption)
}, {
  id: MetricType.TimeElapsed,
  label: getTypeLabel(MetricType.TimeElapsed)
}]

const metricFuncOpts = [{
  id: MetricFunc.Inst,
  label: getFunctionLabel(MetricFunc.Inst)
}, {
  id: MetricFunc.Sum,
  label: getFunctionLabel(MetricFunc.Sum)
}]

</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12 md:col-span-3">
        <label for="id" class="font-medium text-surface-900 dark:text-surface-0">ID</label>
        <InputText id="id" type="text" v-model="formData.id" size="small" class="w-full" />
      </div>
      <div class="flex flex-col gap-2 col-span-12 md:col-span-9">
        <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Název</label>
        <InputText id="name" type="text" v-model="formData.name" size="small" class="w-full" />
      </div>
    </div>
    
    <div class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12 md:col-span-3">
        <label for="subject" class="font-medium text-surface-900 dark:text-surface-0">Veličina</label>
        <Select 
          id="subject" 
          v-model="subjectOptsTranslator" 
          :options="subjectOptions" 
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
        <InputText id="roomNo" type="text" v-model="formData.id" size="small" class="w-full" />
      </div>
      <div class="flex flex-col gap-2 col-span-12 md:col-span-7">
        <label for="instDetail" class="font-medium text-surface-900 dark:text-surface-0">Detaily umístění</label>
        <InputText id="instDetail" type="text" size="small" class="w-full" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12">
        <label for="id" class="font-medium text-surface-900 dark:text-surface-0">Poznámky</label>
        <Textarea id="id" type="text" v-model="formData.notes" size="small" class="w-full" />
      </div>
    </div>

    <div v-if="!isNew && changed" class="grid grid-cols-12 gap-6">
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
          <ToggleSwitch id="autoReadAll" v-model="idpdAutoReadoutModel" ></ToggleSwitch>
        </div>
      </template>
      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="mbusAddr" class="font-medium text-surface-900 dark:text-surface-0">Adresa</label>
          <InputNumber id="mbusAddr" :min="0" :max="255" type="text" :disabled="!isNew" v-model="formData.mbusAddr" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-2">
          <label for="sn" class="font-medium text-surface-900 dark:text-surface-0">Seriové číslo</label>
          <InputText id="sn" type="text" :disabled="!isNew" v-model="formData.mbusSerial" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="manu" class="font-medium text-surface-900 dark:text-surface-0">Výrobce</label>
          <InputText id="manu" type="text" :disabled="!isNew" v-model="formData.meterManufacturer" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-6">
          <label for="mtype" class="font-medium text-surface-900 dark:text-surface-0">Typ</label>
          <InputText id="mtype" type="text" :disabled="!isNew" v-model="formData.meterType" size="small" class="w-full" />
        </div>
      </div>
    </Panel>

    <div v-if="isNew">
      <h4>Metriky</h4>
      <DataTable
        :value="formData.metrics"
        editMode="cell"
        @cellEditComplete="metricEditDone"
        size="small"
      >
        <Column header="Typ" field="type">
          <template #body="{ data}">
            {{ getTypeLabel(data.type) }}  
          </template>
          <template #editor="{ data }">
            <Select
              v-model="data.type"
              :options="metricTypeOpts"
              optionLabel="label"
              optionValue="id"
              placeholder="Zvolte metriku"
            />
          </template> 
        </Column>
        <Column header="Funkce" field="func">
          <template #body="{ data }">
            {{ getTypeLabel(data.func) }}  
          </template>
          <template #editor="{ data }">
            <Select
              v-model="data.func"
              :options="metricFuncOpts"
              optionLabel="label"
              optionValue="id"
              placeholder="Zvolte funkci"
            />
          </template> 
        </Column>
        <Column header="M-Bus záznam" field="mbusRecordId">
          <template #editor="{ data }">
            <InputNumber :min="0" :max="64" v-model="data.mbusRecordId" />
          </template>
        </Column>
        <Column header="M-Bus posun" field="mbusDecimalShift">
          <template #editor="{ data }">
            <InputNumber :min="-5" :max="6" v-model="data.mbusDecimalShift" />
          </template>
        </Column>
        <Column header="Displej" field="hasOwnDisplay">
          <template #body="{ data }">
            <Checkbox v-model="data.hasOwnDisplay" binary />
          </template>
        </Column>
        <Column>
          <template #header>
            <Button icon="pi pi-plus" variant="text" @click="addNewMetricLine()" />
          </template>
          <template #body="{ index }">
            <i class="pi pi-trash text-red-600 cursor-pointer" @click="removeMetricLine(index)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <div v-if="isNew" class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12">
        <div class="flex flex-row justify-end">
          <Button label="Uložit" :disabled="!changed" class="w-32" />
        </div>
      </div>
    </div>
  </div>
</template>
