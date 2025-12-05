"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Calculator, Settings, FileText, Database } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  id: string
  label: string
  icon: any
  path: string
  disabled?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: 'name-sum',
    label: '이름-숫자 합산',
    icon: Calculator,
    path: '/',
  },
  {
    id: 'placeholder-1',
    label: '툴 2 (예정)',
    icon: FileText,
    path: '/tool2',
    disabled: true,
  },
  {
    id: 'placeholder-2',
    label: '툴 3 (예정)',
    icon: Database,
    path: '/tool3',
    disabled: true,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (item: MenuItem) => {
    if (!item.disabled) {
      router.push(item.path)
    }
  }

  return (
    <div className="w-64 h-full bg-secondary/30 border-r border-border flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-border">
        <h1 className="text-lg font-bold">Office Toolkit</h1>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              disabled={item.disabled}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
                'hover:bg-accent',
                isActive && 'bg-accent',
                item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => router.push('/settings')}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
            'hover:bg-accent',
            pathname === '/settings' && 'bg-accent'
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">설정</span>
        </button>
      </div>
    </div>
  )
}
