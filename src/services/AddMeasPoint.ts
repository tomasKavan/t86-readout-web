import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'

import { 
  AddMeasPointDocument, 
  type MeasPointDetailFragment, 
  MeasPointDetailFragmentDoc, 
  type AddMeasPoint 
} from '../graphql/types/graphql'
import { useFragment } from '../graphql/types'

export function useAddMeasPoint() {
  const { mutate, loading: adding, error } = useMutation(AddMeasPointDocument)

  const measPoint = ref<MeasPointDetailFragment | null>(null)

  const add = async (data: AddMeasPoint) => {
    const res = await mutate({ data })
    const masked = res?.data?.addMeasPoint
    measPoint.value = masked ? useFragment(MeasPointDetailFragmentDoc, masked) : null
    if (!measPoint.value) throw new Error('Unknown error - AddMeasPoint returned no data')
    
    return measPoint.value
  }

  return {
    measPoint,
    add,
    adding,
    error
  }
}
