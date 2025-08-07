<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePageTitle } from '../composables/usePageTitle'
import { useDTFormatter } from '../composables/DateFormatter';

const { setTitle } = usePageTitle()
const { mdmd } = useDTFormatter()

onMounted(() => {
  setTitle('Měřící místa')
})

const products = ref([{
  id: 'S.EL.01.01',
  name: 'Elektřina Byt 1',
  mbusAddr: 1,
  mbusSerial: '2543781',
  metricCnt: 1,
  lastRead: new Date(),
  autoReadoutEnabled: false,
  subject: 'ele',
  subjectSpec: null
}])

const selProducts = ref([])

const groupPresets = {
  'ele': {
    icon: 'bolt',
    name: 'Elektřina'
  },
  'wat': {
    'hot': {
      icon: 'wave-pulse',
      name: 'Teplá voda'
    },
    'cold': {
      icon: 'wave-pulse',
      name: 'Studená voda'
    }
  }, 
  'hth': {
    icon: 'sun',
    name: 'Teplo'
  },
  'gas': {
    icon: 'sun',
    name: 'Plyn'
  },
  'env': {
    icon: 'sparkles',
    name: 'Prostředí'
  },
  'cln': {
    icon: 'wrench',
    name: 'Úklid'
  }
}

const groupPresetSelect = (data: any) => {
  let pres = groupPresets[data.subject]
  if (data.subjectSpec) {
    pres = pres[data.subjectSpec]
  }
  return pres
}

const groupIcon = (data: any) => {
  return 'pi-' + groupPresetSelect(data).icon
}

const groupName = (data: any) => {
  return groupPresetSelect(data).name
}

</script>

<template>
  <div class="flex flex-row justify-end pb-8 gap-3">
    <Button label="Zapnout vybrané" size="small" outined />
    <Button label="Zapnout všechny" size="small" />
  </div>

  <DataTable 
    :value="products" 
    rowGroupMode="subheader"
    :groupRowsBy="['subject', 'subjectSpec']" 
    size="small" 
    stripedRows
    tableStyle="min-width: 50rem"
    dataKey="id"
    v-model:selection="selProducts"
  >
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column field="id" header="ID" :style="{ width: '8rem' }"></Column>
    <Column field="name" header="Název"></Column>
    <Column field="mbusAddr" header="MBus" :style="{ width: '4.5rem' }"></Column>
    <Column field="mbusSerial" header="S/N" :style="{ width: '5.5rem' }"></Column>
    <Column field="metricCnt" header="Metrik" :style="{ width: '4.5rem' }"></Column>
    <Column header="Naposledy vyčteno" :style="{ width: '11rem' }">
      <template #body="{ data }">
        {{ data.lastRead ? mdmd(data.lastRead) : '' }}
      </template>
    </Column>
    <Column header="Vyčítání" bodyClass="text-center" :style="{ width: '4.95rem' }">
      <template #body="{ data }">
        <div class="flex justify-end items-center h-full">
          <i v-if="data.autoReadoutEnabled" class="pi pi-check text-primary"></i>
          <i v-else class="pi pi-times text-red-800"></i>
        </div>
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

    <template #groupheader="sp">
      <div class="flex flex-row font-semibold py-2">
        <i class="pi pr-4 text-primary" style="font-size: 1.4rem;" :class="groupIcon(sp.data)" />
        <h3>{{groupName(sp.data)}}</h3>
      </div>
    </template>
  </DataTable>

</template>
