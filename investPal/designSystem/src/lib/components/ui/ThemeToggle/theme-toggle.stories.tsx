import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle, ThemeToggleDropdown } from './theme-toggle'
import { ThemeProvider } from '../ThemeProvider'
import { Button } from '../Button'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Design System/Theme Toggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-8 rounded-lg border bg-card text-card-foreground">
      <span>Toggle theme:</span>
      <ThemeToggle />
    </div>
  ),
}

export const WithLabels: Story = {
  render: () => {
    return (
      <ThemeProvider>
        <div className="flex flex-col items-center gap-6 p-8 rounded-lg border bg-card text-card-foreground">
          <h3 className="text-lg font-semibold">Theme Controls</h3>
          
          <div className="flex items-center gap-4">
            <span>Simple toggle:</span>
            <ThemeToggle />
          </div>
          
          <div className="flex flex-col gap-4">
            <span>Dropdown options:</span>
            <div className="border rounded-lg bg-popover">
              <ThemeToggleDropdown />
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground text-center max-w-md">
            The theme toggle cycles through light → dark → system themes. 
            The dropdown provides direct access to each theme option.
          </div>
        </div>
      </ThemeProvider>
    )
  },
}

export const InNavigation: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <header className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">InvestPal</h1>
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Stocks</Button>
            <Button variant="ghost">Portfolio</Button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Sign In</Button>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-lg border bg-card text-card-foreground">
              <h3 className="font-semibold mb-2">Stock Card {i}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-mono">$150.25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Change:</span>
                  <span className="font-mono text-green-600">+2.45%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  ),
}

export const ThemeDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Design System Theme Demo</h2>
        <p className="text-muted-foreground mb-4">
          Use the theme toggle to see how all components adapt to different themes
        </p>
        <ThemeToggle />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Components</h3>
          
          <div className="space-y-3">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          
          <div className="p-4 rounded-lg border bg-card text-card-foreground">
            <h4 className="font-medium mb-2">Card Component</h4>
            <p className="text-sm text-muted-foreground">
              This card automatically adapts its colors based on the current theme.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Color Scheme</h3>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded bg-background border text-foreground">
              Background
            </div>
            <div className="p-3 rounded bg-foreground text-background">
              Foreground
            </div>
            <div className="p-3 rounded bg-primary text-primary-foreground">
              Primary
            </div>
            <div className="p-3 rounded bg-secondary text-secondary-foreground">
              Secondary
            </div>
            <div className="p-3 rounded bg-muted text-muted-foreground">
              Muted
            </div>
            <div className="p-3 rounded bg-accent text-accent-foreground">
              Accent
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}