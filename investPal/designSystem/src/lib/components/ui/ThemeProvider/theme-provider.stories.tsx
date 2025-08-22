import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider, useTheme } from './themeProvider'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../Button'
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '../Sidebar'

const meta: Meta<typeof ThemeProvider> = {
  title: 'Design System/Theme Provider',
  component: ThemeProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

function InvestPalDemo() {
  const { theme } = useTheme()
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between px-2">
              <h2 className="text-lg font-semibold">InvestPal</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {theme}
                </span>
                <ThemeToggle />
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <span>📊</span>
                      Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>📈</span>
                      Stocks
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>💼</span>
                      Portfolio
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>⭐</span>
                      Watchlist
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Markets</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>🇺🇸</span>
                      US Markets
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>🌍</span>
                      International
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span>₿</span>
                      Crypto
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>⚙️</span>
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="flex items-center gap-2 border-b px-4 py-3 bg-background">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Stock Analysis Dashboard</h1>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Current theme: {theme}</span>
              </div>
            </header>

            <main className="flex-1 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Market Overview Cards */}
                {[
                  { title: 'S&P 500', value: '4,567.23', change: '+1.24%', positive: true },
                  { title: 'NASDAQ', value: '14,321.45', change: '+2.15%', positive: true },
                  { title: 'DOW', value: '34,891.12', change: '-0.45%', positive: false },
                ].map((market, i) => (
                  <div key={i} className="p-6 rounded-lg border bg-card text-card-foreground">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">{market.title}</h3>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold font-mono">{market.value}</span>
                      <span className={`text-sm font-medium font-mono ${
                        market.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {market.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border bg-card text-card-foreground">
                  <h3 className="text-lg font-semibold mb-4">Top Stocks</h3>
                  <div className="space-y-4">
                    {[
                      { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.43', change: '+2.1%' },
                      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,834.56', change: '+1.8%' },
                      { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$378.91', change: '+0.9%' },
                      { symbol: 'TSLA', name: 'Tesla Inc.', price: '$201.87', change: '-1.2%' },
                    ].map((stock, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <div className="font-medium font-mono">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono">{stock.price}</div>
                          <div className={`text-sm font-mono ${
                            stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-lg border bg-card text-card-foreground">
                  <h3 className="text-lg font-semibold mb-4">Theme Showcase</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This demonstrates how the design system components adapt to different themes.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">Primary</Button>
                      <Button size="sm" variant="secondary">Secondary</Button>
                      <Button size="sm" variant="outline">Outline</Button>
                      <Button size="sm" variant="ghost">Ghost</Button>
                    </div>
                    
                    <div className="p-4 rounded border bg-muted/50">
                      <h4 className="font-medium mb-2">Color Variables</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-primary"></div>
                          <span>Primary</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-secondary"></div>
                          <span>Secondary</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-accent"></div>
                          <span>Accent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-muted"></div>
                          <span>Muted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export const FullApplication: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <InvestPalDemo />
    </ThemeProvider>
  ),
}

export const DarkTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <InvestPalDemo />
    </ThemeProvider>
  ),
}

export const SystemTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="system">
      <InvestPalDemo />
    </ThemeProvider>
  ),
}

export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Light Theme</h2>
        <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <ThemeProvider defaultTheme="light">
            <div className="h-full light bg-background text-foreground p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Components</h3>
                  <ThemeToggle />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
                <div className="p-4 rounded border bg-card">
                  <h4 className="font-medium mb-2">Card Component</h4>
                  <p className="text-sm text-muted-foreground">Light theme styling</p>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Dark Theme</h2>
        <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <ThemeProvider defaultTheme="dark">
            <div className="h-full dark bg-background text-foreground p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Components</h3>
                  <ThemeToggle />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
                <div className="p-4 rounded border bg-card">
                  <h4 className="font-medium mb-2">Card Component</h4>
                  <p className="text-sm text-muted-foreground">Dark theme styling</p>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  ),
}