import { NameSumItem, AggregatedItem } from '@/types'

export function parseInput(text: string): NameSumItem[] {
  const lines = text.split('\n')
  const items: NameSumItem[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const parts = trimmed.split(/\s+/)

    if (parts.length < 2) continue

    const lastPart = parts[parts.length - 1]
    const value = parseFloat(lastPart.replace(/,/g, ''))

    if (isNaN(value)) continue

    const name = parts.slice(0, -1).join(' ')

    items.push({ name, value })
  }

  return items
}

export function aggregateAndSort(items: NameSumItem[]): AggregatedItem[] {
  const sumMap = new Map<string, number>()

  for (const item of items) {
    const current = sumMap.get(item.name) || 0
    sumMap.set(item.name, current + item.value)
  }

  const sorted = Array.from(sumMap.entries())
    .map(([name, sum]) => ({ name, sum }))
    .sort((a, b) => b.sum - a.sum)

  return sorted.map((item, index) => ({
    rank: index + 1,
    ...item,
  }))
}
