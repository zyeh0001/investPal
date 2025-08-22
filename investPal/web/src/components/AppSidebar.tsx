'use client'

import React from 'react'
import { Sidebar, type SidebarNavigationItem } from '@investPal/designSystem'
import { TrendingUp, Newspaper } from 'lucide-react'

const navigationItems: SidebarNavigationItem[] = [
  {
    id: 'stocks',
    label: 'Stocks',
    icon: TrendingUp,
    href: '/stocks',
    isActive: false,
  },
  {
    id: 'news',
    label: 'News',
    icon: Newspaper,
    href: '/news',
    isActive: false,
  },
]

interface AppSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  className?: string
}

export function AppSidebar({ isCollapsed, onToggle, className }: AppSidebarProps) {
  return (
    <Sidebar
      isCollapsed={isCollapsed}
      onToggle={onToggle}
      items={navigationItems}
      header={
        <div className="font-semibold text-lg">
          {!isCollapsed && 'InvestPal'}
        </div>
      }
      className={className}
    />
  )
}