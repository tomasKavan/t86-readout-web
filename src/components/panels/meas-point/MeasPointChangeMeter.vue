<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { ChangeMeter, ChangeMeterCorrection, MeasPointDetailMetricFragment } from '../../../graphql/types/graphql'
import { getTypeLabel } from '../../../utils/MetricTypeTransformers';
import NullableInput from '../../../components/NullableInput.vue'
import Big from 'big.js';

const props = defineProps<{
  visible: boolean,
  metrics: MeasPointDetailMetricFragment[]
}>()

const emit = defineEmits<{
  (e: 'cancleMeterChange'): void,
  (e: 'executeMeterChange', payload: ChangeMeter): void
}>()

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
const changeMeterForm = ref<ChangeMeter>(bootstrapChangeMeterData())
const correctionsById = ref<Record<string, ChangeMeterCorrection>>({})

watchEffect(() => {
  const nextIds = new Set(props.metrics.map(m => String(m.id)))

  // add
  for (const m of props.metrics) {
    const k = String(m.id)
    if (!correctionsById.value[k]) {
      correctionsById.value[k] = {
        metricId: Number(m.id),
        value: null,
        oldMeterEndValue: null,
        newMeterStartValue: null,
        mbusValueRecordId: null,
        mbusDecimalShift: null,
        hasPhysicalDisplay: null
      }
    }
  }
  // remove
  for (const k of Object.keys(correctionsById)) {
    if (!nextIds.has(k)) delete correctionsById.value[k]
  }
})

watch(() => props.visible, (newVal, oldVal) => {
  console.log(`old: ${oldVal}, new: ${newVal}`)
  if (newVal && !oldVal) {
    changeMeterForm.value = bootstrapChangeMeterData()
  }
})

type MetricTab = { 
  metric: MeasPointDetailMetricFragment, 
  correction: ChangeMeterCorrection
}
const metricTabs = computed<MetricTab[]>(() => {
  const out = props.metrics.map(m => {
    return {
      metric: m,
      correction: correctionsById.value[String(m.id)]
    }
  })
  return out
})

const buildDataAndExecute = () => {
  changeMeterForm.value.corrections = metricTabs.value
    .filter(mt => {
      const c = mt.correction
      return c.value !== null 
        || c.oldMeterEndValue !== null 
        || c.newMeterStartValue !== null 
        || c.mbusValueRecordId !== null
        || c.mbusDecimalShift !== null
        || c.hasPhysicalDisplay !== null
    })
    .map(mt => mt.correction)

  emit('executeMeterChange', changeMeterForm.value)
}

</script>

<template>
  <Dialog 
    :visible="props.visible" 
    @update:visible="emit('cancleMeterChange')"
    header="Výměna měřidla" 
    :modal="true" 
    :style="{ width: '32rem' }"
  >
    <div class="flex flex-col gap-3" v-if="changeMeterForm">
      <div class="flex items-center gap-2">
        <label for="occured" class="w-46">Čas výměny</label>
        <DatePicker 
          class="w-full"
          size="small"
          id="occured"
          dateFormat="dd.mm.yyyy" 
          showTime
          showSeconds
          v-model="changeMeterForm.occuredUTCTime" />
      </div>
      <div class="flex items-center gap-2">
        <label for="manu" class="w-46">Výrobce měřidla</label>
        <NullableInput id="manu" v-model="changeMeterForm.meterManufacturer" />
      </div>
      <div class="flex items-center gap-2">
        <label for="typ" class="w-46">Typ měřidla</label>
        <NullableInput id="typ" v-model="changeMeterForm.meterType" />
      </div>
      <div class="flex items-center gap-2">
        <label for="typ" class="w-46">Seriové číslo</label>
        <NullableInput id="typ" v-model="changeMeterForm.mbusSerial" />
      </div>
      <div class="flex items-center gap-2">
        <label for="typ" class="w-46">MBus Adresa</label>
        <NullableInput id="typ" v-model="changeMeterForm.mbusAddr">
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
      <div class="flex items-center gap-2">
        <label for="typ" class="w-46">Poznámky</label>
        <Textarea class="w-full" v-model="changeMeterForm.comments" />
      </div>
    </div>

    <div class="pt-8 pb-4 font-semibold text-xl">
      Korekce metrik
    </div>

    <div v-if="!metrics.length" class="p-4 text-center text-surface-600">
      Žádné metriky ke korekci
    </div>

    <Accordion
      v-else
      multiple
      class="w-full"
    >
      <AccordionPanel
        v-for="tab in metricTabs"
        :key="tab.metric.id"
        :value="tab.metric.id"
      >
        <AccordionHeader>
          <span class="flex items-center gap-3 w-full">
            <span class="truncate">{{ getTypeLabel(tab.metric.type) }}</span>
          </span>
        </AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <label for="typ" class="w-120">Hodnota <strong>starého</strong> měřidla</label>
              <NullableInput id="typ" v-model="tab.correction.oldMeterEndValue" :defaultValue="0">
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
            <div class="flex items-center gap-2">
              <label for="typ" class="w-120">Hodnota <strong>nového</strong> měřidla</label>
              <NullableInput id="typ" v-model="tab.correction.newMeterStartValue" :defaultValue="0">
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
            <div class="flex items-center gap-2">
              <label for="typ" class="w-120">Přepis hodnoty</label>
              <NullableInput id="typ" v-model="tab.correction.value" :defaultValue="0">
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
            <div class="flex items-center gap-2">
              <label for="typ" class="w-120">ID M-Bus záznamu</label>
              <NullableInput id="typ" v-model="tab.correction.mbusValueRecordId" :defaultValue="0">
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
            <div class="flex items-center gap-2">
              <label for="typ" class="w-120">Desetinný posun</label>
              <NullableInput id="typ" v-model="tab.correction.mbusDecimalShift" :defaultValue="0">
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
            <div class="flex items-center gap-2">
              <label for="typ" class="w-120">MBus Adresa</label>
              <NullableInput id="typ" v-model="tab.correction.hasPhysicalDisplay" :defaultValue="false">
                <template #input="{ value, setValue, disabled }">
                  <Checkbox
                    size="small"
                    binary
                    :modelValue="Boolean(value ?? false)"
                    class="pt-2"
                    :disabled="disabled"
                    @input="setValue(Boolean($event.value || false))"
                  />
                </template>
              </NullableInput>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <template #footer>
      <Button label="Zrušit" text @click="emit('cancleMeterChange')" />
      <Button label="Potvrdit" @click="buildDataAndExecute" />
    </template>
  </Dialog>
</template>