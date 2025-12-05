"use client"

import { useEffect, useRef } from 'react'

export default function WebPage() {
  const webviewRef = useRef<any>(null)

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    const handleLoadStart = () => {
      console.log('Webview loading started')
    }

    const handleLoadStop = () => {
      console.log('Webview loading completed')
    }

    webview.addEventListener('did-start-loading', handleLoadStart)
    webview.addEventListener('did-stop-loading', handleLoadStop)

    return () => {
      webview.removeEventListener('did-start-loading', handleLoadStart)
      webview.removeEventListener('did-stop-loading', handleLoadStop)
    }
  }, [])

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-12 border-b border-border flex items-center px-4 bg-secondary/30">
        <h2 className="text-sm font-semibold">네이버 카페</h2>
      </div>
      <div className="flex-1 relative">
        <webview
          ref={webviewRef}
          src="https://cafe.naver.com/ingsfriends.cafe"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allowpopups="true"
        />
      </div>
    </div>
  )
}
