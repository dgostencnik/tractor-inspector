import { describe, expect, it, vi } from 'vitest'
import { useFetch } from '../use-fetch'

describe('useFetch composable', () => {
  const fetchingFunction = vi.fn((name: string) => Promise.resolve({ id: 1, name }))
  const errorFetchingFunction = vi.fn(() => Promise.reject(new Error('Oh no')))

  it('sets correct initial state', () => {
    const { loading, error, refetchData, data } = useFetch(fetchingFunction)
    expect(data.value).toBeUndefined()
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
    expect(refetchData).toBeDefined()
  })

  it('fetches data', async () => {
    const { loading, error, refetchData, data } = useFetch(fetchingFunction)

    const promise = refetchData('testName')
    expect(loading.value).toBe(true)
    expect(data.value).toBeUndefined()

    await promise

    expect(fetchingFunction).toHaveBeenCalledWith('testName')
    expect(data.value).toEqual({ id: 1, name: 'testName' })
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('handle errors', async () => {
    const { data, loading, error, refetchData } = useFetch(errorFetchingFunction)
    expect(error.value).toBeNull()

    await expect(refetchData()).rejects.toThrow('Oh no')

    expect(data.value).toBeUndefined()
    expect(loading.value).toBe(false)
    expect(error.value).toBe('Oh no')
  })
})
