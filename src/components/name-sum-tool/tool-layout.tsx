"use client"

import { useState, useEffect } from 'react'
import { InputPanel } from './input-panel'
import { OutputPanel } from './output-panel'
import { parseInput, aggregateAndSort } from '@/lib/parser'
import { AggregatedItem } from '@/types'

export function NameSumTool() {
  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState<AggregatedItem[]>([])

  useEffect(() => {
    const loadData = async () => {
      if (window.electronAPI) {
        const saved = await window.electronAPI.store.get('inputText')
        if (saved) {
          setInputText(saved)
        }
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.store.set('inputText', inputText)
    }

    const items = parseInput(inputText)
    const aggregated = aggregateAndSort(items)
    setResults(aggregated)
  }, [inputText])

  const handleClear = () => {
    setInputText('')
  }

  return (
    <div className="h-full flex">
      <div className="w-1/2 border-r border-border">
        <InputPanel
          value={inputText}
          onChange={setInputText}
          onClear={handleClear}
        />
      </div>

      <div className="w-1/2">
        <OutputPanel results={results} />
      </div>
    </div>
  )
}
