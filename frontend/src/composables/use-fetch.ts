import { ref } from 'vue'

export function useFetch<T, P = void>(fetchFn: (params: P) => Promise<T>) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<T>()

  const refetchData = async (params: P) => {
    loading.value = true
    error.value = null

    try {
      const result = await fetchFn(params)
      data.value = result
    }
    catch (err: unknown) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return { data, refetchData, loading, error }
}
