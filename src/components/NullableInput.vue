<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

type AnyVal = unknown

// model is generic-like: T | null (kept as unknown | null for Vue SFC ergonomics)
const model = defineModel<AnyVal | null>({ default: null })

const props = defineProps<{
  nullLabel?: string
  /** If user checks the box and model is null, we initialize to this value */
  defaultValue?: AnyVal
  /** Tailwind classes for the disabled null label look */
  nullClasses?: string
  /** Make input stretch */
  fluid?: boolean
}>()

const disabled = computed(() => model.value === null)

const checked = computed({
  get: () => model.value !== null,
  set: v => {
    if (!v) {
      model.value = null
    } else if (model.value === null) {
      model.value = props.defaultValue ?? ''
    }
  }
})

// A safe read/write view of the model's non-null value
const value = computed<AnyVal>({
  get: () => (model.value === null ? '' : model.value),
  set: v => {
    if (checked.value) model.value = v
  }
})

// Display text when disabled
const displayValue = computed(() => (disabled.value ? (props.nullLabel ?? 'null') : value.value))

// Helper exposed to slot for convenience
function setValue(v: AnyVal) {
  value.value = v
}
</script>

<template>
  <InputGroup :class="fluid ? 'w-full' : ''" size="small">
    <InputGroupAddon size="small">
      <Checkbox v-model="checked" binary size="small" />
    </InputGroupAddon>

    <!--
      Default content: a simple InputText.
      You can override by providing the 'input' slot.
    -->
    <slot
      name="input"
      :value="value"
      :set-value="setValue"
      :checked="checked"
      :disabled="disabled"
      :model="model"
    >
      <InputText
        size="small"
        :value="displayValue as any"
        :disabled="disabled"
        :class="[disabled ? (nullClasses ?? 'italic text-gray-400') : '', fluid ? 'w-full' : '']"
        @input="setValue(($event.target as HTMLInputElement).value)"
      />
    </slot>
  </InputGroup>
</template>