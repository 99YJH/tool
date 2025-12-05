import ExcelJS from 'exceljs'
import { AggregatedItem } from '@/types'

export async function exportToExcel(data: AggregatedItem[]): Promise<void> {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('합산 결과')

  worksheet.columns = [
    { header: '순위', key: 'rank', width: 10 },
    { header: '이름', key: 'name', width: 30 },
    { header: '합계', key: 'sum', width: 20 },
  ]

  data.forEach((item) => {
    worksheet.addRow({
      rank: item.rank,
      name: item.name,
      sum: item.sum,
    })
  })

  worksheet.getRow(1).font = { bold: true }
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' },
  }

  const buffer = await workbook.xlsx.writeBuffer()

  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `합산결과_${new Date().toISOString().slice(0, 10)}.xlsx`
  link.click()

  URL.revokeObjectURL(url)
}
