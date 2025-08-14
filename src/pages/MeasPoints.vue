<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { usePageTitle } from '../composables/UsePageTitle'
import { mdmd } from '../utils/DateFormatter'
import { useMeasPointList } from '../services/MeasPointList'
import { useMeasPointListGrouping } from '../utils/MeasPointListTransformers'

const { setTitle } = usePageTitle()

onMounted(() => { setTitle('Měřící místa') })

const { measPoints } = useMeasPointList()

const selMeasPoints = ref([])

const { groupIcon, groupLabel } = useMeasPointListGrouping()

</script>

<template>
  <div class="flex flex-row justify-between pb-8 gap-3">
    <div class="flex flex-row pr-5 h-full pt-2">
      <ToggleSwitch id="autoReadAll">
        <template #handle>
          <i class="pi pi-sync text-primary" style="font-size: 0.65rem;"></i>
        </template>
      </ToggleSwitch>
      <label for="autoReadAll" class="font-medium text-surface-900 dark:text-surface-0 pr-4 pl-2">Automatické vyčítání</label>
    </div>
    <Button icon="pi pi-plus" size="small" />
  </div>

  <DataTable 
    :value="measPoints" 
    rowGroupMode="subheader"
    :groupRowsBy="['subject', 'subjectSpec']" 
    size="small" 
    stripedRows
    tableStyle="min-width: 50rem"
    dataKey="id"
    v-model:selection="selMeasPoints"
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
        <div class="flex justify-end items-center h-full">
          <router-link :to="'/meas-points/' + data.id" class="cursor-pointer">
            <i class="pi pi-chevron-right text-primary cursor-pointer"></i>
          </router-link>
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
