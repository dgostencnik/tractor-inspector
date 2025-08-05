import { describe, expect, it } from 'vitest'
import { formatLastActive } from '../formatters'

describe('formatLastActive', () => {
  it('returns N/A when dateString is undefined', () => {
    expect(formatLastActive()).toBe('N/A')
  })

  it('returns N/A when dateString is not a valid date string', () => {
    expect(formatLastActive('test')).toBe('N/A')
  })

  it('returns N/A when dateString is null', () => {
    expect(formatLastActive(null)).toBe('N/A')
  })

  it('returns N/A when dateString is in the future', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60)
    expect(formatLastActive(futureDate.toISOString())).toBe('N/A')
  })

  it('returns Just now when dateString is less than 1 hour ago', () => {
    const recentDate = new Date(Date.now() - 1000 * 60)
    expect(formatLastActive(recentDate.toISOString())).toBe('Just now')
  })

  it('returns number of hours ago when dateString is less than 24 hours ago', () => {
    const recentDate = new Date(Date.now() - 1000 * 60 * 60 * 2)
    expect(formatLastActive(recentDate.toISOString())).toBe('2h ago')
  })

  it('returns  number of days ago" when dateString is more than 24 hours ago', () => {
    const oldDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
    expect(formatLastActive(oldDate.toISOString())).toBe('2d ago')
  })
})
