import type { Meta, StoryObj } from '@storybook/react'
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
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarTrigger
} from './sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Design System/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const MockSidebarContent = () => (
  <>
    <SidebarHeader variant="default">
      <h2 className="px-2 text-lg font-semibold">InvestPal</h2>
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
                <span>⭐</span>
                Watchlist
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span>🔍</span>
                Search
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
        <SidebarMenuItem>
          <SidebarMenuButton>
            <span>❓</span>
            Help
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
)

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <MockSidebarContent />
        </Sidebar>
        <SidebarInset>
          <div className="p-4">
            <div className="flex items-center gap-2 border-b pb-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Stock Analysis Dashboard</h1>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">
                This is the main content area. The sidebar can be toggled using the trigger button.
              </p>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
}

export const Floating: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-muted/20">
        <Sidebar variant="floating">
          <MockSidebarContent />
        </Sidebar>
        <SidebarInset>
          <div className="p-4">
            <div className="flex items-center gap-2 border-b pb-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Floating Sidebar</h1>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">
                The floating variant adds shadow and spacing around the sidebar.
              </p>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
}

export const Collapsible: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-full">
        <Sidebar collapsible="icon">
          <MockSidebarContent />
        </Sidebar>
        <SidebarInset>
          <div className="p-4">
            <div className="flex items-center gap-2 border-b pb-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Collapsible Sidebar</h1>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">
                This sidebar can collapse to show only icons. Click the trigger to toggle.
              </p>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
}

export const RightSide: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SidebarInset>
          <div className="p-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h1 className="text-xl font-semibold">Right Sidebar</h1>
              <SidebarTrigger />
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">
                The sidebar is positioned on the right side of the screen.
              </p>
            </div>
          </div>
        </SidebarInset>
        <Sidebar side="right">
          <MockSidebarContent />
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

export const WithSkeleton: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <h2 className="px-2 text-lg font-semibold">Loading...</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-4">
            <div className="flex items-center gap-2 border-b pb-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Loading State</h1>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">
                Skeleton components show loading states while content is being fetched.
              </p>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <SidebarProvider>
        <div className="flex h-64 w-full border">
          <Sidebar size="sm">
            <SidebarHeader>
              <h3 className="px-2 text-sm font-semibold">Small</h3>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="sm">
                    <span>📊</span>
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
      </SidebarProvider>
      
      <SidebarProvider>
        <div className="flex h-64 w-full border">
          <Sidebar size="default">
            <SidebarHeader>
              <h3 className="px-2 text-base font-semibold">Default</h3>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>📊</span>
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
      </SidebarProvider>
      
      <SidebarProvider>
        <div className="flex h-64 w-full border">
          <Sidebar size="lg">
            <SidebarHeader>
              <h3 className="px-2 text-lg font-semibold">Large</h3>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg">
                    <span>📊</span>
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
      </SidebarProvider>
    </div>
  ),
}