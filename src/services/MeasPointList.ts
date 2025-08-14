import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { 
  MeasPointListFragmentDoc,
  MeasPointsDocument, 
  type MeasPointListFragment 
} from '../graphql/types/graphql'
import { useFragment } from '../graphql/types'

export function useMeasPointList() {
  const { result, loading, error, refetch } = useQuery(MeasPointsDocument)

  const measPoints = computed<MeasPointListFragment[]>((): MeasPointListFragment[] => {
    const masked = result.value?.measPoints ?? []
    return masked.map(i => useFragment(MeasPointListFragmentDoc, i))
  })

  const enableAutoReadAll = () => {

  }

  const disableAutoReadAll = () => {

  }

  return {
    measPoints,
    loading,
    error,
    refetch,
    enableAutoReadAll,
    disableAutoReadAll
  }
}