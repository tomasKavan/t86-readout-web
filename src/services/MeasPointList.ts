import { computed } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { 
  DeleteMeasPointDocument,
  MeasPointListFragmentDoc,
  MeasPointsDocument, 
  type MeasPointListFragment 
} from '../graphql/types/graphql'
import { useFragment } from '../graphql/types'

export function useMeasPointList() {
  const { result, loading: querying, error, refetch } = useQuery(MeasPointsDocument)

  const measPoints = computed<MeasPointListFragment[]>((): MeasPointListFragment[] => {
    const masked = result.value?.measPoints ?? []
    return masked.map(i => useFragment(MeasPointListFragmentDoc, i))
  })

  const { mutate, loading: deleting } = useMutation(DeleteMeasPointDocument)

  const deleteMeasPoint = async (id: string, force: boolean) => {
    await mutate({ deleteMeasPointId: id, force })
    await refetch()
  }

  const enableAutoReadAll = () => {
    throw new Error('Not implemented')
  }

  const disableAutoReadAll = () => {
    throw new Error('Not implemented')
  }

  const loading = computed<boolean>(() => querying.value || deleting.value )

  return {
    // Data nad state
    measPoints,
    loading,
    error,
    
    // Mutations
    enableAutoReadAll,
    disableAutoReadAll,
    deleteMeasPoint
  }
}