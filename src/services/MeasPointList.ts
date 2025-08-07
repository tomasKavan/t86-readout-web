import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { 
  MeasPointsDocument, 
  type MeasPointMplFragment 
} from '../graphql/types/graphql'

export function useMeasPointList() {
  const { result, loading, error, refetch } = useQuery(MeasPointsDocument)

  const measPoints = computed<MeasPointMplFragment[]>((): MeasPointMplFragment[] => {
    if (result.value && result.value.measPoints) {
      return (result.value.measPoints ?? []) as MeasPointMplFragment[]
    }
    return []
  })

  const add = () => {

  }

  const enableAutoRead = () => {

  }

  const disableAutoRead = () => {

  }

  return {
    measPoints,
    loading,
    error,
    refetch,
    add,
    enableAutoRead,
    disableAutoRead
  }
}