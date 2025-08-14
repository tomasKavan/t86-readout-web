import { useMutation, useQuery } from '@vue/apollo-composable'
import { 
  type AddReadout,
  AddReadoutDocument,
  DeleteReadoutDocument,
  type ReadoutListFragment, 
  ReadoutListFragmentDoc, 
  ReadoutsDocument 
} from '../graphql/types/graphql'
import { computed, ref, watch } from 'vue'
import { useFragment } from '../graphql/types'
import { useDebouncedRef } from '../utils/DeboucedRef'

const FILTER_CHANGE_DELAY_MS = 500
const DEFAULT_PAGE_SIZE = 20

type MaybeDate = Date | null | undefined

type Filters = {
  metricIds: number[] | null
  from: MaybeDate
  to: MaybeDate
}

type Pagination = {
  take: number
  skip: number
}

type Init = Partial<Filters & Pagination>

export function useReadoutList(init: Init = {}) {

  const filters = ref<Filters>({
    metricIds: init.metricIds ?? null,
    from: init.from ?? null,
    to: init.to ?? null
  })

  const page = ref<Pagination>({
    take: init.take ?? DEFAULT_PAGE_SIZE,
    skip: init.skip ?? 0
  })

  watch(
    () => [filters.value.metricIds, filters.value.from, filters.value.to],
    () => { page.value.skip = 0 },
    { deep: true }
  )

  const varsNow = computed(() => ({
    take: page.value.take,
    skip: page.value.skip,
    metricIds: filters.value.metricIds ?? null,
    from: filters.value.from,
    to: filters.value.to
  }))
  const debouncedVars = useDebouncedRef(() => varsNow.value, FILTER_CHANGE_DELAY_MS)

  const { result, loading: querying, error, refetch } = useQuery(
    ReadoutsDocument, 
    computed(() => debouncedVars.value), 
    { fetchPolicy: 'cache-and-network'}
  )

  const readouts = computed<ReadoutListFragment[]>((): ReadoutListFragment[] => {
    const masked = result.value?.readouts.items ?? []
    return masked.map(i => useFragment(ReadoutListFragmentDoc, i))
  })

  const totalCount = computed(() => result.value?.readouts.totalCount ?? 0)

  function reset() {
    filters.value = { metricIds: null, from: null, to: null }
    page.value = { take: init.take ?? DEFAULT_PAGE_SIZE, skip: 0}
  }

  const { mutate: addMut, loading: adding } = useMutation(AddReadoutDocument)
  const { mutate: deleteMut, loading: deleting } = useMutation(DeleteReadoutDocument)

  async function addReadout(data: AddReadout) {
    await addMut({ data })
    page.value.skip = 0
    await refetch({ ...varsNow.value, skip: 0 })
  }

  async function deleteReadout(id: number | string) {
    await deleteMut( { id: typeof id !== 'string' ? String(id) : id})
    await refetch({ ...varsNow.value })
  }

  const loading = computed<boolean>(() => querying.value && adding.value && deleting.value)

  return {
    filters,
    page,
    
    // Query
    readouts,
    totalCount,
    loading,
    error,

    // Mutations
    addReadout,
    deleteReadout,

    reset,
  }
}
