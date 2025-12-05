"use client"

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface InputPanelProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

export function InputPanel({ value, onChange, onClear }: InputPanelProps) {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">입력</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          초기화
        </Button>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 resize-none font-mono"
      />
    </div>
  )
}
