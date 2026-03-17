function timeAgo(ms) {

  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const remainingMinutes = minutes % 60
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours} hr${hours !== 1 ? 's' : ''} ${remainingMinutes} min${remainingMinutes !== 1 ? 's' : ''}`
  }

  if (minutes > 0) {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`
  }

  return `${remainingSeconds} sec${remainingSeconds !== 1 ? 's' : ''}`
}

module.exports = timeAgo 