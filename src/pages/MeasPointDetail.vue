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
  type ChangeMeter,
  type UpdateMeasPoint
} from '../graphql/types/graphql'
import { useMeasPointDetail } from '../services/MeasPointDetail'
import { useFragment } from '../graphql/types'
import { useConfirm, useToast } from 'primevue'
import { fullTypeList, getTypeLabel } from '../utils/MetricTypeTransformers'
import MeasPointDetailForm from '../components/forms/MeasPointDetailForm.vue'
import MeasPointAddMetric from '../components/panels/meas-point/MeasPointAddMetric.vue'
import MeasPointChangeMeter from '../components/panels/meas-point/MeasPointChangeMeter.vue'

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

const addMetricDialogVisible = ref<boolean>(false)

const initMetricAdd = () => {
  if (fullTypeList.length <= uwpMetrics.value.length) {
    toastAdd({ 
      severity: 'warn', 
      summary: 'Metriku nelze přidat', 
      detail: 'Všechny dostupné metriky už jsou v tomto místě měřeny', 
      life: TOAST_LIFE_MS 
    })
    return 
  }
  addMetricDialogVisible.value = true
}

const executeMetricAdd = async (data: AddMetric) => {
  try {
    await addMetric(data)
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

const cleanupMetricAdd = () => addMetricDialogVisible.value = false

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
          rejectProps: { label: 'Zrušit' },
          acceptProps: { label: 'Pokračovat', severity:'danger', outlined: true },
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

const changeMeterDialogVisible = ref<boolean>(false)

const initMeterChange = () => changeMeterDialogVisible.value = true

const executeMeterChange = async (data: ChangeMeter, force: boolean = false) => {
  try {
    try {
      await changeMeter(data, force)
    } catch (e) {
      const code = (e as any)?.graphQLErrors?.[0]?.extensions?. code as string | undefined
      if (code === 'HAS_SOME_READOUTS' && !force /* to avoid cycles */) {
        confirm.require({
          message: 'Odečty novější než čas změny budou odstraněny. Chcete pokračovat?',
          header: 'Odstranit novější odečet',
          icon: 'pi pi-exclamation-triangle',
          rejectProps: { label: 'Zrušit' },
          acceptProps: { label: 'Pokračovat', severity:'danger', outlined: true },
          accept: () => executeMeterChange(data, true)
        })
        return
      }
      throw e
    }
    toastAdd({ severity: 'success', summary: 'Měřidlo vyměněno', life: TOAST_LIFE_MS})
    cleanupMeterChange()
  } catch (e) {
    toastAdd({ 
      severity: 'error', 
      summary: 'Výměna měřidla selhala', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

const cleanupMeterChange = () => changeMeterDialogVisible.value = false

const initMeterChangeRevet = () => {
  confirm.require({
    message: 'Zneplatní poslední výměnu měřidla. Chcete pokračovat?',
    header: 'Zneplatnit výměnu měřidla',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: 'Zrušit' },
    acceptProps: { label: 'Pokračovat', severity:'danger', outlined: true },
    accept: () => executeMeterChangeRevert(false)
  })
}

const executeMeterChangeRevert = async (force: boolean = false) => {
  try {
    try {
      const masked = measPoint.value?.serviceEvents ?? []
      const se = masked.map(i => useFragment(MeasPointDetailServiceEventFragmentDoc, i))
      .reduce((a, i) => {
        if (!a) return i
        const da = typeof a.occuredUTCTime === 'string' ? new Date(a.occuredUTCTime) : a.occuredUTCTime
        const ia = typeof i.occuredUTCTime === 'string' ? new Date(i.occuredUTCTime) : i.occuredUTCTime
        if (da.getTime() < ia.getTime()) return i
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
          rejectProps: { label: 'Zrušit' },
          acceptProps: { label: 'Pokračovat', severity:'danger', outlined: true },
          accept: () => executeMeterChangeRevert(true)
        })
        return
      }
      throw e
    }
    toastAdd({ severity: 'success', summary: 'Výměna měřidlo zneplatněna', life: TOAST_LIFE_MS})
    cleanupMeterChange()
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

</script>

<template>
  <MeasPointAddMetric
    :visible="addMetricDialogVisible"
    :currentMetrics="uwpMetrics"
    @hideMetricAdd="cleanupMetricAdd"
    @executeMetricAdd="executeMetricAdd"
  />

  <MeasPointChangeMeter
    :visible="changeMeterDialogVisible"
    :metrics="uwpMetrics"
    @cancleMeterChange="cleanupMeterChange"
    @executeMeterChange="executeMeterChange"
  />

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
