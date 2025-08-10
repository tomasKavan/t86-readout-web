import { useLazyQuery } from "@vue/apollo-composable";
import { SlavesDocument, type MBusSlaveFragment } from "../graphql/types/graphql";
import { computed } from "vue";

export function useMBusQuery() {
  const { result, loading, error, load } = useLazyQuery(SlavesDocument, { 
    primaryAddr: 0
  }, {
    fetchPolicy: 'no-cache'
  })

  const response = computed(() => {
    if (result.value && result.value.slaves) {
      return result.value.slaves as MBusSlaveFragment
    }
    return undefined
  })

  const query = async (primaryAddr: number) => {
    await load(null, { primaryAddr }, { fetchPolicy: 'no-cache' })
  }

  return {
    response,
    query,
    loading,
    error
  }
}