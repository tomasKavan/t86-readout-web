import { computed } from "vue"

export function useMeasPointDetail() {
  const measPoint = computed(() => {
    
  })

  const add = () => {

  }

  const remove = () => {

  }

  const addMetric = () => {

  }

  const removeMetric = () => {

  }

  const changeMeter = () => {

  }

  const revertMeterChange = () => {
    
  }

  const save = () => {

  }

  const enableAutoRead = () => {

  }

  const disableAutoRead = () => {

  }

  const loading = computed<boolean>(() => {
    return false
  })

  const error = computed<Error>(() => {
    return new Error()
  })

  return {
    measPoint,
    add,
    remove,
    addMetric,
    removeMetric,
    changeMeter,
    revertMeterChange,
    save,
    enableAutoRead,
    disableAutoRead,
    loading,
    error
  }
  
}