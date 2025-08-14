import { computed, ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'

import { useFragment } from '../graphql/types'
import { 
  MeasPointDocument, 
  MeasPointDetailFragmentDoc, 
  AddMeasPointDocument, 
  UpdateMeasPointDocument, 
  type AddMeasPoint, 
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

export type SaveMeasPointParams = AddMeasPoint & UpdateMeasPoint

export function useMeasPointDetail() {

  const id = ref<string | null>(null) 
  const isNew = computed<boolean>(() => !id.value)

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

  const { mutate: addMut, loading: adding } = useMutation(AddMeasPointDocument)
  const { mutate: updateMut, loading: updating } = useMutation(UpdateMeasPointDocument)
  const { mutate: addMetricMut, loading: addingMetric } = useMutation(AddMetricDocument)
  const { mutate: deleteMetricMut, loading: deletingMetric } = useMutation(DeleteMetricDocument)
  const { mutate: changeMeterMut, loading: changingMeter } = useMutation(ChangeMeterDocument)
  const { mutate: reverMeterChangeMut, loading: reverting } = useMutation(RevertMeterChangeDocument)
  const { mutate: enableARMut, loading: enablingAr } = useMutation(EnableAutoReadoutDocument)
  const { mutate: disableARMut, loading: disablingAr } = useMutation(DisableAutoReadoutDocument)


  const addMetric = async (data: AddMetric) => {
    if (isNew) throw new Error('Can\'t call addMetric when adding new measPoint')

    const res = await addMetricMut({ measPointId: id.value as string, data})
    const masked = res?.data?.addMetric
    const frg = masked ? useFragment(MeasPointDetailMetricFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - AddMeasPoint returned no data')

    await refetch()
    return frg
  }

  const removeMetric = async (id: string, force: boolean) => {
    if (isNew) throw new Error('Can\'t call removeMetric when adding new measPoint')
    
    await deleteMetricMut({ deleteMetricId: id, force})
    await refetch()
    return
  }

  const changeMeter = async (data: ChangeMeter, force: boolean) => {
    if (isNew) throw new Error('Can\'t call changeMeter when adding new measPoint')
    
    const res = await changeMeterMut({ changeMeterId: id.value as string, data, force })
    const masked = res?.data?.changeMeter
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - ChangeMeter returned no data')

    await refetch()
    return frg
  }

  const revertMeterChange = async (measPointId: string, seId: string, force: boolean) => {
    if (isNew) throw new Error('Can\'t call revertMeterChange when adding new measPoint')
    
    const res = await reverMeterChangeMut({ serviceEventId: seId, measPointId, force})
    const masked = res?.data?.revertMeterChange
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - RevertMeterChange returned no data')

    await refetch()
    return frg
  }

  /**
   * save() behavior:
   * - if isNew: expects AddMeasPoint input, calls add, sets id from server, exposes data
   * - else: expects UpdateMeasPoint input, calls update, keeps id, exposes data
   *
   * Returns { ok, data?, error? } and DOES NOT throw
   */
  const save = async (data: SaveMeasPointParams): Promise<MeasPointDetailFragment> => {
    if (isNew.value) {
      const addInput = data as AddMeasPoint
      const res = await addMut({ data: addInput })
      const masked = res?.data?.addMeasPoint
      const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
      if (!frg) throw new Error('Unknown error - AddMeasPoint returned no data')

      id.value = frg.id
      return frg
    }

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
    if (isNew) throw new Error('Can\'t call enableAutoRead when adding new')

    const res = await enableARMut({ enableAutoReadoutId: id.value as string})
    const masked = res?.data?.enableAutoReadout
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - EnableAutoReadout returned no data')
    await refetch()
  }

  const disableAutoRead = async () => {
    if (isNew) throw new Error('Can\'t call disableAutoRead when adding new')

    const res = await disableARMut({ disableAutoReadoutId: id.value as string})
    const masked = res?.data?.disableAutoReadout
    const frg = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!frg) throw new Error('Unknown error - DisableAutoReadout returned no data')
    await refetch()
  }

  const loading = computed<boolean>(() => {
    return querying.value || adding.value || updating.value || addingMetric.value 
      || deletingMetric.value || changingMeter.value || reverting.value || enablingAr.value
      || disablingAr.value
  })

  return {
    // Params
    id,
    isNew,

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
  }
  
}