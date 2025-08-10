import { computed } from "vue";
import { SerieDocument, type QuerySerie, type SerieFrgFragment } from "../graphql/types/graphql";
import { useLazyQuery } from "@vue/apollo-composable";

export function useSerie() {
  const { result, loading, error, load } = useLazyQuery(SerieDocument)

  const serie = computed(() => {
    if (result.value && result.value.serie) {
      return result.value.serie as SerieFrgFragment
    }
    return undefined
  })

  const query = (params: QuerySerie) => {
    load(null, { params })
  }

  return {
    serie,
    query,
    loading,
    error,
  }
}