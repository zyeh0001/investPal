'use client'

import { useState } from 'react';
import { ThemeProvider, SidebarToggle } from '@investPal/designSystem';
import { AppSidebar } from '../components/AppSidebar';

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <div className="flex h-screen">
        <AppSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b border-border p-4">
            <div className="flex items-center gap-4">
              <SidebarToggle
                isCollapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
              />
              <h1 className="text-xl font-semibold">InvestPal</h1>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}