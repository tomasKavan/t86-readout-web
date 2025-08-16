<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { MetricFunc, MetricType, type AddMetric, type MeasPointDetailMetricFragment } from '../../../graphql/types/graphql'
import { fullTypeList, getFunctionLabel } from '../../../utils/MetricTypeTransformers'
import NullableInput from '../../../components/NullableInput.vue'


const props = defineProps<{
  visible: boolean,
  currentMetrics: MeasPointDetailMetricFragment[]
}>()

const emit = defineEmits<{
  (e: 'hideMetricAdd'): void,
  (e: 'executeMetricAdd', payload: AddMetric): void
}>()

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

watch(() => props.visible, (newVal, oldVal) => {
  console.log(`old: ${oldVal}, new: ${newVal}`)
  if (newVal && !oldVal) {
    addMetricForm.value = bootstrapAddMetricData()
    addMetricForm.value.type = availableTypeOptions.value[0].id
  }
})

type TypeOpt = { id: MetricType, label: string }
const addMetricTypeOpts = computed<TypeOpt[]>(() => {
  return fullTypeList.filter(i => !(props.currentMetrics.find(b => b.id === i.id)))
})
const availableTypeOptions = computed<TypeOpt[]>(() => {
  return addMetricTypeOpts.value.filter(opt => {
    return !props.currentMetrics.find(i => i.type === opt.id)
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
    :visible="props.visible" 
    @update:visible="(v) => !v && emit('hideMetricAdd')"
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
      <Button label="Zrušit" text @click="emit('hideMetricAdd')" />
      <Button v-if="addMetricForm" label="Potvrdit" @click="emit('executeMetricAdd', addMetricForm)" />
    </template>
  </Dialog>
</template>