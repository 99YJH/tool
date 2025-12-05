"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [version, setVersion] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const fetchVersion = async () => {
      if (window.electronAPI) {
        const ver = await window.electronAPI.app.getVersion()
        setVersion(ver)
      }
    }
    fetchVersion()
  }, [])

  if (!mounted) return null

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">설정</h1>
          <p className="text-muted-foreground mt-2">
            애플리케이션 설정을 관리합니다.
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">테마</h2>
            <p className="text-sm text-muted-foreground">
              앱의 테마를 변경합니다.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">테마 모드</span>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="테마 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">라이트</SelectItem>
                <SelectItem value="dark">다크</SelectItem>
                <SelectItem value="system">시스템</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">앱 정보</h2>
            <p className="text-sm text-muted-foreground">
              현재 앱의 버전 정보를 확인합니다.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">버전</span>
            <span className="text-sm text-muted-foreground">
              {version || '알 수 없음'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
