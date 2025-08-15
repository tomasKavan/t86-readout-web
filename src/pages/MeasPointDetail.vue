<script setup lang="ts">

import { computed, onMounted, ref, watch } from 'vue'
import { usePageTitle } from '../composables/UsePageTitle'
import { useRoute } from 'vue-router'
import MeasPointMetricList from '../components/panels/meas-point/MeasPointMetricList.vue'
import MeasPointServiceEventList from '../components/panels/meas-point/MeasPointServiceEventList.vue'
import MeasPointReadoutList from '../components/panels/meas-point/MeasPointReadoutList.vue'
import MeasPointCorrectionList from '../components/panels/meas-point/MeasPointCorrectionList.vue'
import { 
  type MeasPointDetailMetricFragment, 
  MeasPointDetailMetricFragmentDoc,
  type MeasPointDetailServiceEventFragment,
  MeasPointDetailServiceEventFragmentDoc,
  type AddMetric,
  MetricType,
  MetricFunc,
  type ChangeMeter,
  type UpdateMeasPoint
} from '../graphql/types/graphql'
import { useMeasPointDetail } from '../services/MeasPointDetail'
import { useFragment } from '../graphql/types'
import { useConfirm, useToast } from 'primevue'
import { getFunctionLabel, getTypeLabel } from '../utils/MetricTypeTransformers'
import NullableInput from '../components/NullableInput.vue'
import MeasPointDetailForm from '../components/forms/MeasPointDetailForm.vue'

const NEW_MEAS_POINT_KEY = '__new__'
const TOAST_LIFE_MS = 2000

const { setTitle } = usePageTitle()
const { params } = useRoute()
const { 
  id,
  measPoint, 
  save, 
  enableAutoRead, 
  disableAutoRead,
  addMetric,
  removeMetric,
  changeMeter,
  revertMeterChange
} = useMeasPointDetail()
const { add: toastAdd } = useToast()
const confirm = useConfirm()

const handlePageParamsUpdate = () => {
  if (params.id === NEW_MEAS_POINT_KEY) {
    throw new Error('URL path seems like new MeasPoint page. We shouldn\'t be here.')
  }
  setTitle(`Měřící místo: ${params.id}`)
  id.value = params.id as string
}
onMounted(handlePageParamsUpdate)
watch(() => params.id, handlePageParamsUpdate)

const saveAction = async (data: UpdateMeasPoint) => {
  try {
    await save(data)
    toastAdd({ severity: 'success', summary: 'Měřící bod změněn', life: TOAST_LIFE_MS})
  } catch (e) {
    toastAdd({ 
      severity: 'error', 
      summary: 'Uložení měřícího bodu selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

const enableAutoReadAction = async () => {
  try {
    await enableAutoRead()
    toastAdd({ severity: 'success', summary: 'Automatický odečet zapnut', life: TOAST_LIFE_MS})
  } catch (e){
    toastAdd({ 
      severity: 'error', 
      summary: 'Zapnutí automatického odečtu selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

const disableAutoReadAction = async () => {
  try {
    await disableAutoRead()
    toastAdd({ severity: 'success', summary: 'Automatický odečet vypnut', life: TOAST_LIFE_MS})
  } catch (e){
    toastAdd({ 
      severity: 'error', 
      summary: 'Vypnutí automatického odečtu selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

function bootstrapAddMetricData(): AddMetric {
  return {
    type: MetricType.Consumption,
    func: MetricFunc.Sum,
    mbusDecimalShift: undefined,
    mbusValueRecordId: undefined,
    hasPhysicalDisplay: true
  }
}
const addMetricForm = ref<AddMetric | null>(null)
const addMetricDialogVisible = computed<boolean>(() => !!addMetricForm.value)

const initMetricAdd = () => {
  if (!availableTypeOptions.value.length) {
    toastAdd({ 
      severity: 'warn', 
      summary: 'Metriku nelze přidat', 
      detail: 'Všechny dostupné metriky už jsou v tomto místě měřeny', 
      life: TOAST_LIFE_MS 
    })
    return 
  }
  addMetricForm.value = bootstrapAddMetricData()
  addMetricForm.value.type = availableTypeOptions.value[0].id
}

const executeMetricAdd = async () => {
  try {
    if (!addMetricForm.value) throw new Error('Neznámá chyba - formulář pro novou metriku === null')

    await addMetric(addMetricForm.value)
    toastAdd({ severity: 'success', summary: 'Metrika přidána', life: TOAST_LIFE_MS})
    cleanupMetricAdd()
  } catch (e) {
    toastAdd({ 
      severity: 'error', 
      summary: 'Uložení nové metriky selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

const cleanupMetricAdd = () => addMetricForm.value = null

const initMetricDelete = (id: string) => {
  const masked = measPoint.value?.metrics ?? []
  const metric = masked.map(i => useFragment(MeasPointDetailMetricFragmentDoc, i))
  .find(i => i.id === id) 
  if (!metric) {
    toastAdd({ 
      severity: 'error', 
      summary: 'Odstranění metriky selhalo.', 
      detail: 'Metrika nenalezena', 
      life: TOAST_LIFE_MS 
    })
    return
  }
  confirm.require({
    message: `Odstraní metriku typu ${ getTypeLabel(metric.type)}. Chcete pokračovat?`,
    header: 'Odstranit metriku',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: 'Zrušit' },
    acceptProps: { label: 'Pokračovat', severity:'danger', outlined: true },
    accept: () => executeMetricDelete(id, false)
  })
}

const executeMetricDelete = async (id: string, force: boolean = false) => {
  try {
    try {
      await removeMetric(id, force)
    } catch (e) {
      const code = (e as any)?.graphQLErrors?.[0]?.extensions?. code as string | undefined
      if (code === 'HAS_SOME_READOUTS' && !force /* to avoid cycles */) {
        confirm.require({
          message: 'Všechny odečty metriky budou také odstraněny. Chcete pokračovat?',
          header: 'Odstranit odečety metriky',
          icon: 'pi pi-exclamation-triangle',
          accept: () => executeMetricDelete(id, true)
        })
        return
      }
      throw e
    }
    toastAdd({ severity: 'success', summary: 'Metrika odstraněna', life: TOAST_LIFE_MS})
  } catch (e) {
    toastAdd({ 
      severity: 'error', 
      summary: 'Odstranění metriky selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

function bootstrapChangeMeterData(): ChangeMeter {
  return {
    corrections: [],
    comments: '',
    mbusAddr: undefined,
    mbusSerial: undefined,
    meterManufacturer: undefined,
    meterType: undefined,
    occuredUTCTime: new Date()
  }
}
const changeMeterForm = ref<ChangeMeter | null>(null)
const changeMeterDialogVisible = computed<boolean>(() => !!changeMeterForm.value )

const initMeterChange = () => {
  changeMeterForm.value = bootstrapChangeMeterData()
}

const executeMeterChange = async (force: boolean = false) => {
  try {
    if (!changeMeterForm.value) throw new Error('Neznámá chyba - formulář změnu měřidla === null')

    try {
      await changeMeter(changeMeterForm.value, force)
    } catch (e) {
      const code = (e as any)?.graphQLErrors?.[0]?.extensions?. code as string | undefined
      if (code === 'HAS_SOME_READOUTS' && !force /* to avoid cycles */) {
        confirm.require({
          message: 'Odečty novější než čas změny budou odstraněny. Chcete pokračovat?',
          header: 'Odstranit novější odečet',
          icon: 'pi pi-exclamation-triangle',
          accept: () => executeMeterChange(true)
        })
        return
      }
      throw e
    }
    toastAdd({ severity: 'success', summary: 'Měřidlo vyměněno', life: TOAST_LIFE_MS})
    cleanupMeteChange()
  } catch (e) {
    toastAdd({ 
      severity: 'error', 
      summary: 'Výměna měřidla selhala', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

const cleanupMeteChange = () => changeMeterForm.value = null

const initMeterChangeRevet = () => {
  confirm.require({
    message: 'Zneplatní poslední výměnu měřidla. Chcete pokračovat?',
    header: 'Zneplatnit výměnu měřidla',
    icon: 'pi pi-exclamation-triangle',
    accept: () => executeMeterChangeRevert(false)
  })
}

const executeMeterChangeRevert = async (force: boolean = false) => {
  try {
    if (!changeMeterForm.value) throw new Error('Neznámá chyba - formulář změnu měřidla === null')

    try {
      const masked = measPoint.value?.serviceEvents ?? []
      const se = masked.map(i => useFragment(MeasPointDetailServiceEventFragmentDoc, i))
      .reduce((a, i) => {
        if (!a || a.occuredUTCTime.getTime() < i.occuredUTCTime.getTime()) return i
        return a
      }, null as MeasPointDetailServiceEventFragment | null)
      if (!se) throw new Error('Nelze vrátit. Nenalezena žádná servisní událost')
      await revertMeterChange(measPoint.value?.id as string, se.id, force)
    } catch (e) {
      const code = (e as any)?.graphQLErrors?.[0]?.extensions?. code as string | undefined
      if (code === 'HAS_SOME_READOUTS' && !force /* to avoid cycles */) {
        confirm.require({
          message: 'Odečty novější než čas změny budou odstraněny. Chcete pokračovat?',
          header: 'Odstranit novější odečet',
          icon: 'pi pi-exclamation-triangle',
          accept: () => executeMeterChangeRevert(true)
        })
        return
      }
      throw e
    }
    toastAdd({ severity: 'success', summary: 'Výměna měřidlo zneplatněna', life: TOAST_LIFE_MS})
    cleanupMeteChange()
  } catch (e) {
    toastAdd({ 
      severity: 'error', 
      summary: 'Zneplatnění výměny měřidla selhala', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}


const uwpMetrics = computed<MeasPointDetailMetricFragment[]>(() => {
  const masked = measPoint.value?.metrics ?? []
  return masked.map(i => useFragment(MeasPointDetailMetricFragmentDoc, i))
})

const uwpServiceEvents = computed<MeasPointDetailServiceEventFragment[]>(() => {
  const masked = measPoint.value?.serviceEvents ?? []
  return masked.map(i => useFragment(MeasPointDetailServiceEventFragmentDoc, i))
})

type TypeOpt = { id: MetricType, label: string }
const addMetricTypeOpts = computed<TypeOpt[]>(() => {
  const full = [{
    id: MetricType.Consumption,
    label: getTypeLabel(MetricType.Consumption)
  }, {
    id: MetricType.TimeElapsed,
    label: getTypeLabel(MetricType.TimeElapsed)
  }]
  const masked = measPoint.value?.metrics ?? []
  const metrics = masked.map(i => useFragment(MeasPointDetailMetricFragmentDoc, i))
  return full.filter(i => !(metrics.find(b => b.id === i.id)))
})
const availableTypeOptions = computed<TypeOpt[]>(() => {
  return addMetricTypeOpts.value.filter(opt => {
    const masked = measPoint.value?.metrics ?? []
    const frgs = useFragment(MeasPointDetailMetricFragmentDoc, masked)
    return !frgs.find(i => i.type === opt.id)
  })
})

const addMetricFuncOpts = ref<{ id: MetricFunc, label: string }[]>([{
  id: MetricFunc.Inst,
  label: getFunctionLabel(MetricFunc.Inst)
}, {
  id: MetricFunc.Sum,
  label: getFunctionLabel(MetricFunc.Sum)
}])

</script>

<template>
  <Dialog 
    :visible="addMetricDialogVisible" 
    @update:visible="(v) => !v && cleanupMetricAdd()"
    header="Nová metrika" 
    :modal="true" 
    :style="{ width: '32rem' }"
  >
    <div class="flex flex-col gap-3" v-if="addMetricForm">
      <div class="flex items-center gap-2">
        <label class="w-36">Type</label>
        <Select
          size="small"
          v-model="addMetricForm.type"
          :options="availableTypeOptions"
          optionLabel="label"
          optionValue="id"
          placeholder="Zvolte metriku"
          class="w-full"
        />
      </div>
      <div class="flex items-center gap-2">
        <label class="w-36">Funkce</label>
        <Select
          size="small"
          v-model="addMetricForm.func"
          :options="addMetricFuncOpts"
          optionLabel="label"
          optionValue="id"
          placeholder="Zvolte funkci"
          class="w-full"
        />
      </div>

      <div class="flex items-center gap-2">
        <label class="w-36">Záznam</label>
        <NullableInput id="typ" v-model="addMetricForm.mbusValueRecordId" :defaultValue="0" nullLabel="N/A">
          <template #input="{ value, setValue, disabled }">
            <InputNumber 
              :min="0" 
              :max="254"
              size="small"
              :modelValue="Number(value ?? 0)"
              :disabled="disabled"
              class="w-full"
              @input="setValue(Number($event.value || 0))"
            />
          </template>
        </NullableInput>
      </div>

      <div class="flex items-center gap-2">
        <label class="w-36">Posun</label>
        <NullableInput id="typ" v-model="addMetricForm.mbusDecimalShift" :defaultValue="0" nullLabel="N/A">
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
      </div>

      <div class="flex items-center gap-2">
        <label class="w-36">Fyzický displej</label>
        <Checkbox 
          v-model="addMetricForm.hasPhysicalDisplay" 
          class="w-full"
          binary
        />
      </div>
    </div>

    <template #footer>
      <Button label="Zrušit" text @click="cleanupMetricAdd" />
      <Button label="Potvrdit" @click="executeMetricAdd" />
    </template>
  </Dialog>

  <Dialog 
    v-model:visible="changeMeterDialogVisible" 
    header="Výměna měřidla" 
    :modal="true" 
    :style="{ width: '32rem' }"
  >
    <div class="flex flex-col gap-3" v-if="changeMeterForm">
      <div class="flex items-center gap-2">
        <label for="occured" class="w-36">Datum a čas výměny</label>
        <DatePicker 
          id="occured"
          dateFormat="dd.mm.yyyy" 
          :showTime="true" 
          v-model="changeMeterForm.occuredUTCTime" />
      </div>
      <div class="flex items-center gap-2">
        <label for="manu" class="w-36">Výrobce měřidla</label>
        <NullableInput id="manu" v-model="changeMeterForm.meterManufacturer" />
      </div>
      <div class="flex items-center gap-2">
        <label for="typ" class="w-36">Typ měřidla</label>
        <NullableInput id="typ" v-model="changeMeterForm.meterType" />
      </div>
      <div class="flex items-center gap-2">
        <label for="typ" class="w-36">Seriové číslo</label>
        <NullableInput id="typ" v-model="changeMeterForm.mbusSerial" />
      </div>
      <div class="flex items-center gap-2">
        <label for="typ" class="w-36">MBus Adresa</label>
        <NullableInput id="typ" v-model="changeMeterForm.mbusAddr">
          <template #input="{ value, setValue, disabled }">
            <InputNumber 
              :modelValue="Number(value ?? 0)"
              :disabled="disabled"
              class="w-full"
              @input="setValue(Number($event.value || 0))"
            />
          </template>
        </NullableInput>
      </div>
      <div class="flex items-center gap-2">
        <label for="typ" class="w-36">Poznámky</label>
        <Textarea v-model="changeMeterForm.comments" />
      </div>
    </div>
    <template #footer>
      <Button label="Zrušit" text @click="cleanupMeteChange" />
      <Button label="Potvrdit" @click="executeMeterChange(false)" />
    </template>
  </Dialog>

  <div class="flex flex-col gap-10">
    <MeasPointDetailForm 
      :data="measPoint"
      @save="saveAction"
      @enableAutoReadout="enableAutoReadAction"
      @disableAutoReadout="disableAutoReadAction"
    />

    <Tabs v-if="measPoint" value="0">
      <TabList>
        <Tab value="0"><i class="pi pi-gauge pr-2"></i>Metriky</Tab>
        <Tab value="1"><i class="pi pi-pen-to-square pr-2"></i>Odečty</Tab>
        <Tab value="2"><i class="pi pi-wrench pr-2"></i>Servisní události</Tab>
        <Tab value="3"><i class="pi pi-sort-alt pr-2"></i>Korekce</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <MeasPointMetricList 
            :metrics="uwpMetrics" 
            @initMetricDelete="initMetricDelete"
            @initMetricAdd="initMetricAdd"
          />
        </TabPanel>
        <TabPanel value="1">
          <MeasPointReadoutList 
            :metrics="uwpMetrics" 
            :measPointSubject="measPoint.subject" 
          />
        </TabPanel>
        <TabPanel value="2">
          <MeasPointServiceEventList 
            :serviceEvents="uwpServiceEvents" 
            @initServiceEventRevert="initMeterChangeRevet"
            @initServiceEventAdd="initMeterChange"
          />
        </TabPanel>
        <TabPanel value="3">
          <MeasPointCorrectionList 
            :metrics="uwpMetrics"
            :serviceEvents="uwpServiceEvents"
            :measPointSubject="measPoint.subject"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
