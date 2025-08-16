<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useConfirm, useToast } from 'primevue'
import { useRouter } from 'vue-router'

import { usePageTitle } from '../composables/UsePageTitle'
import { mdmd } from '../utils/DateFormatter'
import { useMeasPointList } from '../services/MeasPointList'
import { useMeasPointListGrouping } from '../utils/MeasPointListTransformers'
import { type MeasPointListFragment } from '../graphql/types/graphql'


const TOAST_LIFE_MS = 2000

const confirm = useConfirm()
const toast = useToast()

const router = useRouter()
const { setTitle } = usePageTitle()
const { measPoints, deleteMeasPoint } = useMeasPointList()
const { groupIcon, groupLabel } = useMeasPointListGrouping()

type WithGroupKey<T> = T & { groupKey: string }

function makeGroupKey(a: unknown, b: unknown) {
  // Use a separator that won't appear in normal text
  const SEP = '\u001F'
  return `${String(a ?? '')}${SEP}${String(b ?? '')}`
}

function addGroupKey<T, K1 extends keyof T, K2 extends keyof T>(
  rows: readonly T[],
  key1: K1,
  key2: K2
): WithGroupKey<T>[] {
  return rows.map(r => ({
    ...r,
    groupKey: makeGroupKey(r[key1], r[key2])
  }))
}

onMounted(() => { setTitle('Měřící místa') })

const selMeasPoints = ref([])

const tableRows = computed<WithGroupKey<MeasPointListFragment>[]>(() =>
  addGroupKey(measPoints.value ?? [], 'subject', 'subjectSpec')
)

const navToNewMeasPointPage = () => router.push('/meas-points/__new__')

const rowSelected = (payload: any) => {
  console.log(measPoints.value)
  const frg = payload.data as MeasPointListFragment
  router.push(`/meas-points/${frg.id}`)
}

const initMeasPointDelete = async (id: string) => {
  confirm.require({
    message: `Odstraní měřící bod ${ id }. Chcete pokračovat?`,
    header: 'Odstranit měřící bod',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: 'Zrušit' },
    acceptProps: { label: 'Pokračovat', severity:'danger', outlined: true },
    accept: () => executeMeasPointDelete(id, false)
  })
}

const executeMeasPointDelete = async (id: string, force: boolean = false) => {
  try {
    try {
      await deleteMeasPoint(id, force)
    } catch (e) {
      const code = (e as any)?.graphQLErrors?.[0]?.extensions?. code as string | undefined
      if (code === 'HAS_SOME_READOUTS' && !force /* to avoid cycles */) {
        confirm.require({
          message: 'Všechny odečty měřícího bodu budou také odstraněny. Chcete pokračovat?',
          header: 'Odstranit odečety měřícího bodu',
          icon: 'pi pi-exclamation-triangle',
          acceptProps: { label: 'Odstranit odečty', outlined: true, seveirty: 'danger' },
          rejectProps: { label: 'Zrušit' },
          accept: () => executeMeasPointDelete(id, true)
        })
        return
      }
      throw e
    }
    toast.add({ severity: 'success', summary: 'Metrika odstraněna', life: TOAST_LIFE_MS})
  } catch (e) {
    toast.add({ 
      severity: 'error', 
      summary: 'Odstranění měřícího bodu selhalo', 
      detail: e?.toString() ?? 'Neznámá chyba', 
      life: TOAST_LIFE_MS 
    })
  }
}

</script>

<template>
  <div class="flex flex-row justify-between pb-8 gap-3">
    <div class="flex flex-row pr-5 h-full pt-2">
      <ToggleSwitch id="autoReadAll" disabled>
        <template #handle>
          <i class="pi pi-sync text-primary" style="font-size: 0.65rem;"></i>
        </template>
      </ToggleSwitch>
      <label for="autoReadAll" class="font-medium text-surface-900 dark:text-surface-0 pr-4 pl-2">Automatické vyčítání</label>
    </div>
    <Button icon="pi pi-plus" size="small" @click="navToNewMeasPointPage" />
  </div>

  <DataTable 
    :value="tableRows" 
    rowGroupMode="subheader"
    groupRowsBy="groupKey"
    sortMode="single" 
    :sortField="'groupKey'"
    :sortOrder="1"
    size="small" 
    stripedRows
    tableStyle="min-width: 50rem"
    dataKey="id"
    @rowClick="rowSelected"
  >
    <Column bodyClass="text-center" :style="{ width: '2rem' }">
      <template #body="{ data }">
        <div class="flex justify-end items-center h-full">
          <i v-if="data.autoReadoutEnabled" class="pi pi-sync text-primary" v-tooltip="'Automatické výčítání zapnuto'"></i>
          <i v-else class="pi pi-sync text-red-800" v-tooltip="'Automatické výčítání vypnuto'"></i>
        </div>
      </template>
    </Column>
    <Column field="id" header="ID" :style="{ width: '8rem' }"></Column>
    <Column field="name" header="Název"></Column>
    <Column field="mbusAddr" header="MBus" :style="{ width: '4.5rem' }"></Column>
    <Column field="mbusSerial" header="S/N" :style="{ width: '5.5rem' }"></Column>
    <Column header="Metrik" :style="{ width: '4.5rem' }">
      <template #body="{ data }">
        {{ data.metrics.length || 0 }}
      </template>
    </Column>
    <Column header="Naposledy vyčteno" :style="{ width: '11rem' }">
      <template #body="{ data }">
        {{ data.lastRead ? mdmd(data.lastRead) : '' }}
      </template>
    </Column>
    <Column header="" :style="{ width: '3rem' }">
      <template #body="{ data }">
        <div class="flex flex-row justify-end w-full">
          <i class="pi pi-trash text-red-600 cursor-pointer pr-2" 
            @click="$event.preventDefault(); $event.stopPropagation(); initMeasPointDelete(data.id)"></i>
        </div>
      </template>
    </Column>

    <template #groupheader="{ data }">
      <div class="flex flex-row font-semibold py-2">
        <i :class="'pi-' + groupIcon(data)" class="pi pr-4 text-primary" style="font-size: 1.4rem;" />
        <h3>{{ groupLabel(data) }}</h3>
      </div>
    </template>
  </DataTable>

</template>
