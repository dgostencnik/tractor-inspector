import type { Tractor } from '../types'

export const TRACTOR_API_ENDPOINT = 'http://localhost:3000'

async function getTractors() {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json() as Tractor[]
  return data
}

export const tractorsApi = {
  getTractors,
}
