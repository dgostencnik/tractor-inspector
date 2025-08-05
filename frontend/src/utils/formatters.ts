export function formatLastActive(dateString?: string | null) {
  if (!dateString) {
    return 'N/A'
  }

  const now = Date.now()
  const date = new Date(dateString).getTime()

  if (Number.isNaN(date)) {
    return 'N/A'
  }

  const msDifference = now - date

  if (msDifference < 0) {
    return 'N/A'
  }

  const hoursDifference = msDifference / 1000 / 60 / 60

  if (hoursDifference < 1) {
    return 'Just now'
  }

  if (hoursDifference < 24) {
    return `${Math.floor(hoursDifference)}h ago`
  }

  const daysDifference = Math.floor(hoursDifference / 24)

  return `${daysDifference}d ago`
}
