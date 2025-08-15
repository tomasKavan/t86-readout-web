<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { type MeasPointDetailFragment, type UpdateMeasPoint } from '../../graphql/types/graphql'
import { useMeasPointListGrouping } from '../../utils/MeasPointListTransformers';

const { optList } = useMeasPointListGrouping()
const subjectOptList = optList()

const props = defineProps<{
  data?: MeasPointDetailFragment | null
}>()

const emit = defineEmits<{
  (e: 'save', payload: UpdateMeasPoint): void,
  (e: 'enableAutoReadout'): void,
  (e: 'disableAutoReadout'): void,
}>()


function bootstrapData(): UpdateMeasPoint {
  return {
    name: '',
    roomNo: '',
    instDetails: '',
    notes: ''
  }
}

function formFromProps(): UpdateMeasPoint {
  if (!props.data) {
    throw new Error('We shouldnt be here...')
  }
  return {
    name: props.data.name,
    roomNo: props.data.roomNo,
    instDetails: props.data.instDetails,
    notes: props.data.notes
  }
}

const formData = ref<UpdateMeasPoint>(bootstrapData())
const changed = computed<boolean>(() => {
  const input = !props.data ? bootstrapData() : formFromProps()
  return !(
    input.name === formData.value.name
    && input.roomNo === formData.value.roomNo
    && input.instDetails === formData.value.instDetails
    && input.notes === formData.value.notes
  )
})

const resetFromProps = () => formData.value = formFromProps()

watch (() => props.data, () => {
  if (!props.data) {
    formData.value = bootstrapData()
    return
  }

  resetFromProps()
}, { deep: true })

const idpdAutoReadoutModel = computed<boolean>({
  get: () => {
    return props.data ? props.data.autoReadoutEnabled : false
  },
  set: (v: boolean) => {
    if (v) {
      emit('enableAutoReadout') 
    } else {
      emit('disableAutoReadout') 
    }
  }
})

const subjectValue = computed<string>(() => {
  if (!props.data) return ''
  const opt = subjectOptList.find(op => {
    if (op.subject === props.data?.subject) {
      if ((!op.spec && !props.data.subjectSpec) || op.spec === props.data.subjectSpec) {
        return true
      }
    }
    return false
  })
  if (!opt) return ''
  return opt.name
})

</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12 md:col-span-3">
        <label for="id" class="font-medium text-surface-900 dark:text-surface-0">ID</label>
        <InputText id="id" type="text" disabled :modelValue="props.data?.id" size="small" class="w-full" />
      </div>
      <div class="flex flex-col gap-2 col-span-12 md:col-span-9">
        <label for="name" class="font-medium text-surface-900 dark:text-surface-0">Název</label>
        <InputText id="name" type="text" v-model="formData.name" size="small" class="w-full" />
      </div>
    </div>
    
    <div class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12 md:col-span-3">
        <label for="subject" class="font-medium text-surface-900 dark:text-surface-0">Veličina</label>
        <InputText id="subject" type="text" disabled :model-value="subjectValue" size="small" class="w-full" />
      </div>
      <div class="flex flex-col gap-2 col-span-12 md:col-span-2">
        <label for="roomNo" class="font-medium text-surface-900 dark:text-surface-0">V místnosti</label>
        <InputText id="roomNo" type="text" v-model="formData.roomNo" size="small" class="w-full" />
      </div>
      <div class="flex flex-col gap-2 col-span-12 md:col-span-7">
        <label for="instDetail" class="font-medium text-surface-900 dark:text-surface-0">Detaily umístění</label>
        <InputText id="instDetail" type="text" v-model="formData.instDetails" size="small" class="w-full" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12">
        <label for="id" class="font-medium text-surface-900 dark:text-surface-0">Poznámky</label>
        <Textarea id="id" type="text" v-model="formData.notes" size="small" class="w-full" />
      </div>
    </div>
    
    <div v-if="changed" class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12">
        <div class="flex flex-row justify-end">
          <Button label="Zrušit" severity="danger" variant="outlined" class="w-32 mr-3" @click="resetFromProps()" />
          <Button label="Uložit" class="w-32" @click="emit('save', formData)" />
        </div>
      </div>
    </div>

    <Panel header="MBus" class="mt-3" v-if="props.data">
      <template #icons>
        <div class="flex flex-row pr-5 h-full pt-2">
          <label for="autoReadAll" class="font-medium text-surface-900 dark:text-surface-0 pr-4 pl-2">Automatické vyčítání</label>
          <ToggleSwitch id="autoReadAll" v-model="idpdAutoReadoutModel" ></ToggleSwitch>
        </div>
      </template>
      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="mbusAddr" class="font-medium text-surface-900 dark:text-surface-0">Adresa</label>
          <InputNumber id="mbusAddr" :min="0" :max="255" type="text" disabled v-model="props.data.mbusAddr" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-2">
          <label for="sn" class="font-medium text-surface-900 dark:text-surface-0">Seriové číslo</label>
          <InputText id="sn" type="text" disabled v-model="props.data.mbusSerial" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="manu" class="font-medium text-surface-900 dark:text-surface-0">Výrobce</label>
          <InputText id="manu" type="text" disabled v-model="props.data.meterManufacturer" size="small" class="w-full" />
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-6">
          <label for="mtype" class="font-medium text-surface-900 dark:text-surface-0">Typ</label>
          <InputText id="mtype" type="text" disabled v-model="props.data.meterType" size="small" class="w-full" />
        </div>
      </div>
    </Panel>
  </div>
</template>
