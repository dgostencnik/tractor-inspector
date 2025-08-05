import { ref } from 'vue'

export function useFetch<T, Args extends any[]>(fetchFn: (...args: Args) => Promise<T>) {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<T>()

  const refetchData = async (...args: Args) => {
    loading.value = true
    error.value = null

    try {
      const result = await fetchFn(...args)
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
