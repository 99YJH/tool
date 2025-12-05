"use client"

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Copy, Download } from 'lucide-react'
import { AggregatedItem } from '@/types'
import { formatNumber } from '@/lib/utils'
import { exportToExcel } from '@/lib/excel-export'

interface OutputPanelProps {
  results: AggregatedItem[]
}

export function OutputPanel({ results }: OutputPanelProps) {
  const handleCopy = () => {
    const text = results
      .map((item) => `${item.name} ${item.sum}`)
      .join('\n')

    navigator.clipboard.writeText(text)
    alert('클립보드에 복사되었습니다.')
  }

  const handleExport = async () => {
    try {
      await exportToExcel(results)
      alert('Excel 파일이 다운로드되었습니다.')
    } catch (error) {
      alert('파일 저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">
          출력 ({results.length}개)
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={results.length === 0}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            복사
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={results.length === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Excel 저장
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">순위</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="text-right">합계</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground h-32">
                  입력된 데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              results.map((item) => (
                <TableRow key={`${item.rank}-${item.name}`}>
                  <TableCell className="font-medium">{item.rank}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatNumber(item.sum)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
