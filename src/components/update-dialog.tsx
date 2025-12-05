"use client"

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function UpdateDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [updateInfo, setUpdateInfo] = useState<any>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloaded, setIsDownloaded] = useState(false)

  useEffect(() => {
    if (!window.electronAPI) return

    window.electronAPI.updater.onUpdateAvailable((info) => {
      setUpdateInfo(info)
      setIsOpen(true)
    })

    window.electronAPI.updater.onDownloadProgress((progress) => {
      setDownloadProgress(Math.round(progress.percent))
    })

    window.electronAPI.updater.onUpdateDownloaded(() => {
      setIsDownloading(false)
      setIsDownloaded(true)
    })
  }, [])

  const handleDownload = () => {
    setIsDownloading(true)
    window.electronAPI?.updater.downloadUpdate()
  }

  const handleCancel = () => {
    window.electronAPI?.updater.cancelUpdate()
  }

  const handleInstall = () => {
    window.electronAPI?.updater.quitAndInstall()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isDownloaded ? '업데이트 준비 완료' : '새 버전 업데이트'}
          </DialogTitle>
          <DialogDescription>
            {isDownloaded ? (
              '업데이트를 설치하고 앱을 재시작합니다.'
            ) : (
              <>
                새로운 버전 {updateInfo?.version}이 출시되었습니다.
                <br />
                업데이트를 다운로드하시겠습니까?
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {isDownloading && (
          <div className="py-4">
            <div className="w-full bg-secondary rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              다운로드 중... {downloadProgress}%
            </p>
          </div>
        )}

        <DialogFooter>
          {isDownloaded ? (
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                나중에
              </Button>
              <Button onClick={handleInstall}>재시작하고 설치</Button>
            </>
          ) : (
            <>
              <Button variant="destructive" onClick={handleCancel}>
                취소 (앱 종료)
              </Button>
              <Button onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? '다운로드 중...' : '다운로드'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
