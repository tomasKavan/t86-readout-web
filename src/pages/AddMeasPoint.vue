<script setup lang="ts">
import { computed, ref } from 'vue';
import { getFunctionLabel, getTypeLabel } from '../utils/MetricTypeTransformers';
import { MeasPointSubject, MetricFunc, MetricType, type AddMeasPoint } from '../graphql/types/graphql';
import { useMeasPointListGrouping } from '../utils/MeasPointListTransformers';
import { useAddMeasPoint } from '../services/AddMeasPoint';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue';
import NullableInput from '../components/NullableInput.vue';

const TOAST_LIFE_MS = 2000

const { optList } = useMeasPointListGrouping()
const router = useRouter()
const { add: toastAdd } = useToast()
const { add, adding, error } = useAddMeasPoint()

const subjectOptions = optList()

const formData = ref<AddMeasPoint>({
  id: '',
  name: '',
  roomNo: '',
  subject: MeasPointSubject.Electricity,
  metrics: []
})

type TypeOpt = { id: MetricType, label: string }
const fullMetricTypeOpts: TypeOpt[] = [{
  id: MetricType.Consumption,
  label: getTypeLabel(MetricType.Consumption)
}, {
  id: MetricType.TimeElapsed,
  label: getTypeLabel(MetricType.TimeElapsed)
}]

type FuncOpt = { id: MetricFunc, label: string }
const metricFuncOpts: FuncOpt[] = [{
  id: MetricFunc.Inst,
  label: getFunctionLabel(MetricFunc.Inst)
}, {
  id: MetricFunc.Sum,
  label: getFunctionLabel(MetricFunc.Sum)
}]

const availableTypeOptions = computed<TypeOpt[]>(() => {
  return fullMetricTypeOpts.filter(opt => {
    return !formData.value.metrics || !formData.value.metrics.find(i => i.type === opt.id)
  })
})

const lineAvailableTypeOptions = (val: MetricType) => {
  const atos = availableTypeOptions.value
  const mto = fullMetricTypeOpts.find(to => to.id === val)
  if (!mto) return atos
  return [mto, ...atos]
}

const subjectOptsTranslator = computed<string>({
  get: () => {
    if (!formData.value) return subjectOptions[0].id
    let id = formData.value.subject + ':' + formData.value.subjectSpec
    if (!formData.value.subjectSpec) id = formData.value.subject ?? ''
    return (subjectOptions.find(s => s.id === id) || subjectOptions[0]).id
  },
  set: (val: string) => {
    const opt = subjectOptions.find(i => i.id === val) || subjectOptions[0]
    formData.value.subject = opt.subject
    formData.value.subjectSpec = opt.spec
  }
})

const canAddMetricLine = computed<boolean>(() => !!availableTypeOptions.value.length)

const addNewMetricLine = () => {
  formData.value.metrics?.push({
    type: availableTypeOptions.value[0].id,
    func: MetricFunc.Sum,
    mbusDecimalShift: null,
    mbusValueRecordId: null,
    hasPhysicalDisplay: true
  })
}

const removeMetricLine = (idx: number) => {
  formData.value.metrics?.splice(idx, 1)
}

const validate = () => {
  if (formData.value.id.length < 3 || formData.value.id.length > 16) {
    throw { validation: `Délka identifikátoru (ID) musí být alespoň 3 a nejvíce 16 znaků. Je ${formData.value.id.length}` }
  }
  if (formData.value.name.length < 3) {
    throw { validation: `Délka názevu musí být alespoň 3 znaky. Je ${formData.value.id.length}` }
  }
}

const isValid = computed<boolean>(() => {
  try {
    validate()
    return true
  } catch (e) {
    return false
  }
})

const executeAdd = async () => {
  try {
    validate()

    const measPoint = await add(formData.value)
    toastAdd({ severity: 'success', summary: 'Měřící bod vytvořen', life: TOAST_LIFE_MS})
    router.push(`/meas-points/${measPoint.id}`)
  } catch (e) {
    if ((e as any).validation) {
      toastAdd({ 
        severity: 'error', 
        summary: 'Chyba vstupních dat', 
        detail: (e as any).validation, 
        life: TOAST_LIFE_MS 
      })
      return
    }
    toastAdd({ 
      severity: 'error', 
      summary: 'Vytváření méřícího bodu selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

</script>

<template>
  <div class="flex flex-col gap-10">
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
          option-label="name"
          option-value="id"
          placeholder="Vyberte veličinu" 
          class="w-full"
          size="small"
        />
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

    <Panel header="Měřidlo" class="mt-3">
      <template #icons>
        <div class="flex flex-row pr-5 h-full pt-2">
          <label for="autoReadAll" class="font-medium text-surface-900 dark:text-surface-0 pr-4 pl-2">Automatické vyčítání</label>
          <ToggleSwitch id="autoReadAll" v-model="formData.autoReadoutEnabled" ></ToggleSwitch>
        </div>
      </template>
      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="mbusAddr" class="font-medium text-surface-900 dark:text-surface-0">M-Bus Adresa</label>
          <NullableInput id="typ" v-model="formData.mbusAddr" :defaultValue="0" nullLabel="N/A">
            <template #input="{ value, setValue, disabled }">
              <InputNumber 
                size="small"
                :modelValue="Number(value ?? 0)"
                :disabled="disabled"
                class="w-full"
                @input="setValue(Number($event.value || 0))"
              />
            </template>
          </NullableInput>
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-2">
          <label for="sn" class="font-medium text-surface-900 dark:text-surface-0">Seriové číslo</label>
          <NullableInput id="typ" v-model="formData.mbusSerial" nullLabel="N/A" />
        </div>
        <div class="flex flex-col gap-2 col-span-4 md:col-span-2">
          <label for="manu" class="font-medium text-surface-900 dark:text-surface-0">Výrobce</label>
          <NullableInput id="typ" v-model="formData.meterManufacturer" nullLabel="N/A" />
        </div>
        <div class="flex flex-col gap-2 col-span-8 md:col-span-6">
          <label for="mtype" class="font-medium text-surface-900 dark:text-surface-0">Typ</label>
          <NullableInput id="typ" v-model="formData.meterType" nullLabel="N/A" />
        </div>
      </div>
    </Panel>

    <Panel header="Metriky" class="mt-3">
      <template #icons>
        <Button v-if="canAddMetricLine" icon="pi pi-plus" size="small" @click="addNewMetricLine()" />
      </template>
      <DataTable
        :value="formData.metrics"
        size="small"
      >
        <Column header="Typ" field="type">
          <template #body="{ data }">
            <Select
              size="small"
              v-model="data.type"
              :options="lineAvailableTypeOptions(data.type)"
              optionLabel="label"
              optionValue="id"
              placeholder="Zvolte metriku"
              class="w-full"
            />
          </template>
        </Column>
        <Column header="Funkce" field="func">
          <template #body="{ data }">
            <Select
              size="small"
              v-model="data.func"
              :options="metricFuncOpts"
              optionLabel="label"
              optionValue="id"
              placeholder="Zvolte funkci"
              class="w-full"
            />
          </template> 
        </Column>
        <Column header="M-Bus záznam" field="mbusValueRecordId">
          <template #body="{ data }">
            <NullableInput id="typ" v-model="data.mbusValueRecordId" :defaultValue="0" nullLabel="N/A">
              <template #input="{ value, setValue, disabled }">
                <InputNumber 
                  :min="0" 
                  :max="64"
                  size="small"
                  :modelValue="Number(value ?? 0)"
                  :disabled="disabled"
                  class="w-full"
                  @input="setValue(Number($event.value || 0))"
                />
              </template>
            </NullableInput>
          </template>
        </Column>
        <Column header="M-Bus posun" field="mbusDecimalShift">
          <template #body="{ data }">
            <NullableInput id="typ" v-model="data.mbusDecimalShift" :defaultValue="0" nullLabel="N/A">
              <template #input="{ value, setValue, disabled }">
                <InputNumber 
                  :min="-5" 
                  :max="6"
                  size="small"
                  :modelValue="Number(value ?? 0)"
                  :disabled="disabled"
                  class="w-full"
                  @input="setValue(Number($event.value || 0))"
                />
              </template>
            </NullableInput>
          </template>
        </Column>
        <Column header="Displej" field="hasPhysicalDisplay">
          <template #body="{ data }">
            <div class="flex flex-row justify-center w-full">
              <Checkbox class="mb-[0.14rem] mr-3" size="large" v-model="data.hasPhysicalDisplay" binary />
            </div>
          </template>
        </Column>
        <Column>
          <template #body="{ index }">
            <div class="flex flex-row justify-end w-full">
              <i class="pi pi-trash text-red-600 cursor-pointer mr-1" @click="removeMetricLine(index)" />
            </div>
          </template>
        </Column>
        <template #empty>
          <div class="text-surface-500 dark:text-surface-0">Zde přidejte metriky měřené na přidávaném měřícím místě.</div>
        </template>
      </DataTable>
    </Panel>

    <div class="grid grid-cols-12 gap-6">
      <div class="flex flex-col gap-2 col-span-12">
        <div class="flex flex-row justify-end">
          <Button label="Uložit" :loading="adding" class="w-32" @click="executeAdd" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>