export function hexToRgba(hex?: string, alpha = 1) {
  if (!hex) return `rgba(0, 0, 0, ${alpha})`

  const cleanHex = hex.replace('#', '')

  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
