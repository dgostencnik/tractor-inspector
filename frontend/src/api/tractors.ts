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

async function getTractor(serialNumber: string) {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json() as Tractor

  return data
}

async function getTractorSessionData(serialNumber: string, { pageSize }: { pageSize?: number }) {
  const response = await fetch(`${TRACTOR_API_ENDPOINT}/tractors/${serialNumber}/session?pageSize=${pageSize ?? 50}`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  return data
}

export const tractorsApi = {
  getTractors,
  getTractor,
  getTractorSessionData,
}
