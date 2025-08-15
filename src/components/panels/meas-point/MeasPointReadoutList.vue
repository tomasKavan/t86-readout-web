<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MetricType, type AddReadout, type MeasPointDetailMetricFragment, type MeasPointSubject, type ReadoutSource } from '../../../graphql/types/graphql';
import { getUnit, getTypeLabel } from '../../../utils/MetricTypeTransformers';
import { mdmd } from '../../../utils/DateFormatter';
import { readoutSourceNames } from '../../../utils/ReadoutTransformers';
import { useReadoutList } from '../../../services/ReadoutList';
import { useConfirm, useToast } from 'primevue';
import { useNumberFormat } from '../../../composables/UseNumberFormat';
import Big from 'big.js';

const bigNmr = useNumberFormat()

const TOAST_LIFE_MS = 2000
const DEFAULT_RANGE_MS = 60 * 60 * 1000

type Opt = {
  id: string,
  label: string
}

type DatePicType = null | Date | Date[] | (null | Date)[]

const confirm = useConfirm()
const toast = useToast()

// -------------------
// Component interface

const props = defineProps<{
  metrics: MeasPointDetailMetricFragment[],
  measPointSubject: MeasPointSubject,
}>()

// ---------------
// GraphQL Service

const now = new Date()
const init = {
  from: new Date(now.getTime() - DEFAULT_RANGE_MS),
  to: now,
  metricIds: props.metrics?.map(m => m.id) ?? []
}

const { filters, page, readouts, totalCount, loading, addReadout, deleteReadout } = useReadoutList(init)

// ---------------------
// Add new Readout logic

function bootstrapReadoutAddForm(): AddReadout {
  return {
    metricId: props.metrics[0]?.id ?? 0,
    timestampUTC: new Date(),
    value: new Big(0)
  }
}
const addReadoutForm = ref<AddReadout | null>(null)
const addReadoutDialogVisible = computed<boolean>(() => !!addReadoutForm.value )
const addFormValue = computed<number>({
  get: () => addReadoutForm.value?.value.toNumber() ?? 0,
  set: (v: number) => addReadoutForm.value ? addReadoutForm.value.value = new Big(v) : null
})

const initReadoutAdd = () => {
    addReadoutForm.value = bootstrapReadoutAddForm()
}

const executeReadoutAdd = async () => {
  if (!addReadoutForm.value?.metricId) {
    toast.add({ severity: 'error', summary: 'Musíte vybrat metriku', life: TOAST_LIFE_MS })
    return
  }
  if (!addReadoutForm.value.timestampUTC) {
    toast.add({ severity: 'error', summary: 'Musíte čas odečtu', life: TOAST_LIFE_MS })
    return
  }
  try {
    await addReadout(addReadoutForm.value as AddReadout)
    addReadoutForm.value = null
    toast.add({ severity: 'success', summary: 'Odečet Vytvořen', life: TOAST_LIFE_MS })
  } catch (e) {
    toast.add({ 
      severity: 'error', 
      summary: 'Přidání odečtu selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

const cancelReadoutAdd = () => addReadoutForm.value = null

// --------------------
// Delete Readout logic

const initReadoutDelete = (id: string) => {
  confirm.require({
    message: 'Opravdu chcete odečet odstranit?',
    header: 'Odstranit odečet',
    icon: 'pi pi-exclamation-triangle',
    acceptProps: { label: 'Odstranit', severity: 'danger', outlined: true },
    rejectProps: { label: 'Zrušit' },
    accept: () => executeReadoutDelete(id)
  })
}

const executeReadoutDelete = async (id: string) => {
  try {
    await deleteReadout(id)
    toast.add({ severity: 'success', summary: 'Odečet smazán', life: TOAST_LIFE_MS })
  } catch (e) {
    toast.add({ 
      severity: 'error', 
      summary: 'Mazání odečtu selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

// --------------------------------
// Filter & Table control variables

watch(() => [props.metrics], () => {
  filters.value.metricIds = props.metrics.map(m => m.id)
})

const metricOpts = computed<Opt[]>(() => {
  return props.metrics.map(m => {
    return { id: m.id, label: getTypeLabel(m.type) } as Opt
  })
})

const rangeModel = computed<DatePicType>({
  get: (): DatePicType => {
    const { from, to } = filters.value
    return from || to ? [from ?? null, to ?? null] : null
  },
  set: (v: any) => {
    const [from, to] = v ?? [null, null]
    filters.value.from = from
    filters.value.to = to
  } 
})

const metricIdsModel = computed<string[] | null>({
  get: () => filters.value.metricIds,
  set: v => {
    if (!v || !v.length) v = props.metrics.map(m => m.id)
    filters.value.metricIds = v
  }
})

const firstModel = computed<number>({
  get: () => page.value.skip,
  set: v => { page.value.skip = v ?? 0 }
})

const rowsModel = computed<number>({
  get: () => page.value.take,
  set: v => { page.value.take = v ?? 25 }
})


</script>

<template>  
  <!-- Add new Readout Dialog -->
  <Dialog 
    :visible="addReadoutDialogVisible" 
    @update:visible="(v) => !v && cancelReadoutAdd()"
    header="Nový odečet" 
    :modal="true" 
    :style="{ width: '32rem' }"
  >
    <div class="flex flex-col gap-3" v-if="addReadoutForm">
      <div class="flex items-center gap-2">
        <label class="w-48">Metrika</label>
        <Select
          size="small"
          v-model="addReadoutForm.metricId"
          :options="metricOpts"
          optionLabel="label"
          optionValue="id"
          placeholder="Zvolte metriku"
          class="w-full"
          :disabled="loading"
        />
      </div>

      <div class="flex items-center gap-2">
        <label class="w-48">Meter time (UTC)</label>
        <DatePicker 
          size="small"
          v-model="addReadoutForm.timestampUTC" 
          showTime
          showSeconds 
          hourFormat="24" 
          showIcon 
          class="w-full" 
          :disabled="loading"
        />
      </div>

      <div class="flex items-center gap-2">
        <label class="w-48">Hodnota</label>
        <InputNumber 
          size="small"
          v-model="addFormValue" 
          class="w-full" 
          :disabled="loading" 
          :suffix="' ' + getUnit(measPointSubject, metrics.find(m => m.id === addReadoutForm?.metricId)?.type ?? MetricType.Consumption).abbr"
        />
      </div>
    </div>

    <template #footer>
      <Button size="small" label="Zrušit" text @click="cancelReadoutAdd" :disabled="loading" />
      <Button size="small" label="Přidat" :loading="loading" @click="executeReadoutAdd" />
    </template>
  </Dialog>

  <!-- Filter Toolbar -->
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
          v-model="rangeModel"
          size="small"
        />
      </div>
      <div class="flex flex-col w-50">
        <label for="metrics" class="pb-1 font-light text-xs text-surface-700 dark:text-surface-0">Metriky</label>
        <MultiSelect 
          name="metrics" 
          size="small" 
          v-model="metricIdsModel" 
          :options="metricOpts" 
          optionLabel="label" 
          optionValue="id"
          placeholder="Vyber…"
        >
          <template #value>
            <span v-if="!filters.metricIds?.length">Vyber…</span>
            <span v-else-if="filters.metricIds?.length === metricOpts.length">Všechny</span>
            <span v-else>{{ filters.metricIds }}</span>
          </template>
        </MultiSelect>
      </div>
    </div>
    <div class="pt-6">
      <Button icon="pi pi-plus" variant="text" @click="initReadoutAdd" />
    </div>
  </div>

  <!-- Readout List data table -->
  <div class="">
    <DataTable 
      :value="readouts" 
      v-model:first="firstModel"
      v-model:rows="rowsModel"
      paginator
      lazy
      :loading="loading"
      size="small"
      scrollable
      scrollHeight="flex"
      dataKey="id"
      :rowsPerPageOptions="[20, 50]"
      :totalRecords="totalCount"
    >
      <Column :style="{ width: '3rem' }">
        <template #body="{ data }">
          <i v-if="data.errCode" class="pi pi-exclamation-triangle text-red-600" />
          <i v-else class="pi pi-check text-primary" />
        </template>
      </Column>
      <Column field="metric.id" header="Metrika" :style="{ width: '9rem' }">
        <template #body="{ data }">
          {{ getTypeLabel(metrics?.find(m => m.id === data.metric.id)?.type ?? MetricType.Consumption) }}
        </template>
      </Column>
      <Column header="Datum" :style="{ width: '11rem' }">
        <template #body="{ data }">
          {{  mdmd(data.meterUTCTimestamp) }}
        </template>
      </Column>
      <Column header="Zdroj" :style="{ width: '11rem' }">
        <template #body="{ data }">
          {{  readoutSourceNames[data.source as ReadoutSource] }}
        </template>
      </Column>
      <Column field="value" :style="{ textAlign: 'right' }">
        <template #header>
          <div class="w-full font-semibold">Hodnota</div>
        </template>
        <template #body="{ data }">
          <span v-if="data.errCode" v-tooltip.left="data.errDetails">{{ data.errCode }}</span>
          <span v-else>{{ bigNmr.fmtBig(data.value) }} {{ getUnit(measPointSubject, data.metric.type).abbr }}</span>
        </template>
      </Column>
      <Column :style="{ width: '2rem' }">
        <template #body="{ data }">
          <i class="pi pi-trash text-red-600 cursor-pointer" @click="initReadoutDelete(data.id)" />
        </template>
      </Column>

      <template #loading>
        <div class="text-surface-500 dark:text-surface-100">Načítá se...</div>
      </template>

      <template #empty>
        <div class="text-surface-500 dark:text-surface-100">Toto měřící místo zatím nemá žádný odečet.</div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>


</style>