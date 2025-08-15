import { computed, ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'

import { useFragment } from '../graphql/types'
import { 
  MeasPointDocument, 
  MeasPointDetailFragmentDoc, 
  UpdateMeasPointDocument, 
  type UpdateMeasPoint, 
  type MeasPointDetailFragment, 
  AddMetricDocument, 
  DeleteMetricDocument, 
  ChangeMeterDocument, 
  RevertMeterChangeDocument, 
  type AddMetric, 
  type ChangeMeter, 
  EnableAutoReadoutDocument, 
  DisableAutoReadoutDocument, 
  MeasPointDetailMetricFragmentDoc 
} from '../graphql/types/graphql'

export function useMeasPointDetail() {
  const id = ref<string | undefined>()

  const enabled = computed<boolean>(() => !!id.value)
  const { result, loading: querying, error, refetch } = useQuery(
    MeasPointDocument,
    () => ({ measPointId: id.value as string }),
    { enabled }
  )

  const measPoint = computed(() => {
    const masked = result.value?.measPoint
    return masked ? useFragment(MeasPointDetailFragmentDoc, result.value?.measPoint) : null
  })

  const { mutate: updateMut, loading: updating } = useMutation(UpdateMeasPointDocument)
  const { mutate: addMetricMut, loading: addingMetric } = useMutation(AddMetricDocument)
  const { mutate: deleteMetricMut, loading: deletingMetric } = useMutation(DeleteMetricDocument)
  const { mutate: changeMeterMut, loading: changingMeter } = useMutation(ChangeMeterDocument)
  const { mutate: reverMeterChangeMut, loading: reverting } = useMutation(RevertMeterChangeDocument)
  const { mutate: enableARMut, loading: enablingAr } = useMutation(EnableAutoReadoutDocument)
  const { mutate: disableARMut, loading: disablingAr } = useMutation(DisableAutoReadoutDocument)


  const addMetric = async (data: AddMetric) => {
    const res = await addMetricMut({ measPointId: id.value as string, data})
    const masked = res?.data?.addMetric
    const frg = masked ? useFragment(MeasPointDetailMetricFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - AddMetric returned no data')

    await refetch()
    return frg
  }

  const removeMetric = async (id: string, force: boolean) => {
    await deleteMetricMut({ deleteMetricId: id, force})
    await refetch()
    return
  }

  const changeMeter = async (data: ChangeMeter, force: boolean) => {
    const res = await changeMeterMut({ changeMeterId: id.value as string, data, force })
    const masked = res?.data?.changeMeter
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - ChangeMeter returned no data')

    await refetch()
    return frg
  }

  const revertMeterChange = async (measPointId: string, seId: string, force: boolean) => {
    const res = await reverMeterChangeMut({ serviceEventId: seId, measPointId, force})
    const masked = res?.data?.revertMeterChange
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - RevertMeterChange returned no data')

    await refetch()
    return frg
  }

  const save = async (data: UpdateMeasPoint): Promise<MeasPointDetailFragment> => {
    const updateIntput = data as UpdateMeasPoint
    const currId = id.value as string
    const res = await updateMut({ data: updateIntput, updateMeasPointId: currId })
    const masked = res?.data?.updateMeasPoint
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - UpdateMeasPoint returned no data')
  
    await refetch()
    return frg
  }

  const enableAutoRead = async () => {
    const res = await enableARMut({ enableAutoReadoutId: id.value as string})
    const masked = res?.data?.enableAutoReadout
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - EnableAutoReadout returned no data')
    await refetch()
  }

  const disableAutoRead = async () => {
    const res = await disableARMut({ disableAutoReadoutId: id.value as string})
    const masked = res?.data?.disableAutoReadout
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - DisableAutoReadout returned no data')
    await refetch()
  }

  const loading = computed<boolean>(() => {
    return querying.value || updating.value || addingMetric.value 
      || deletingMetric.value || changingMeter.value || reverting.value || enablingAr.value
      || disablingAr.value
  })

  return {
    // Query
    measPoint,
    loading,
    error,

    // Mutations
    save,
    addMetric,
    removeMetric,
    changeMeter,
    revertMeterChange,
    enableAutoRead,
    disableAutoRead,

    // Param
    id
  }
  
}