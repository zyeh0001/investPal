import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  Sidebar, 
  SidebarNavigationItem,
  SidebarItem,
} from './sidebar';
import { 
  Home, 
  TrendingUp, 
  PieChart, 
  Briefcase, 
  Search, 
  Bell, 
  Settings,
  User,
  BarChart3,
  Wallet,
  Star,
  Activity,
  DollarSign,
  AlertCircle,
  BookOpen,
  Calculator,
  Target,
  Shield
} from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'glass', 'dark'],
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    isCollapsed: {
      control: { type: 'boolean' },
    },
    showToggle: {
      control: { type: 'boolean' },
    },
    overlay: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items for financial dashboard
const financialNavItems: SidebarNavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    isActive: true,
  },
  {
    id: 'markets',
    label: 'Markets',
    icon: TrendingUp,
    badge: 'Live',
    children: [
      { id: 'stocks', label: 'Stocks', icon: BarChart3 },
      { id: 'etfs', label: 'ETFs', icon: PieChart },
      { id: 'crypto', label: 'Crypto', icon: DollarSign },
      { id: 'forex', label: 'Forex', icon: Activity },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: Briefcase,
    badge: 3,
    children: [
      { id: 'holdings', label: 'Holdings', icon: Wallet },
      { id: 'performance', label: 'Performance', icon: Target },
      { id: 'analytics', label: 'Analytics', icon: Calculator },
    ],
  },
  {
    id: 'watchlist',
    label: 'Watchlist',
    icon: Star,
    badge: 12,
  },
  {
    id: 'research',
    label: 'Research',
    icon: Search,
    children: [
      { id: 'stock-screener', label: 'Stock Screener', icon: Search },
      { id: 'news', label: 'News & Analysis', icon: BookOpen },
      { id: 'reports', label: 'Research Reports', icon: BookOpen },
    ],
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: Bell,
    badge: 5,
  },
  {
    id: 'risk',
    label: 'Risk Management',
    icon: Shield,
    children: [
      { id: 'risk-analysis', label: 'Risk Analysis', icon: AlertCircle },
      { id: 'var', label: 'Value at Risk', icon: Shield },
    ],
  },
];

const userNavItems: SidebarNavigationItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
];

// Story wrapper component to manage state
const SidebarWrapper = ({ 
  children, 
  initialCollapsed = false,
  showOverlay = false,
}: { 
  children: (props: { isCollapsed: boolean; onToggle: () => void; showOverlay: boolean; onOverlayClick: () => void }) => React.ReactNode;
  initialCollapsed?: boolean;
  showOverlay?: boolean;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [overlay, setOverlay] = useState(showOverlay);

  return (
    <div className="h-screen bg-background">
      {children({
        isCollapsed,
        onToggle: () => setIsCollapsed(!isCollapsed),
        showOverlay: overlay,
        onOverlayClick: () => setOverlay(false),
      })}
    </div>
  );
};

// Default Financial Dashboard Sidebar
export const Default: Story = {
  render: (args) => (
    <SidebarWrapper>
      {({ isCollapsed, onToggle }) => (
        <Sidebar
          {...args}
          isCollapsed={isCollapsed}
          onToggle={onToggle}
          header={
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="size-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-semibold text-sm">InvestPal</h1>
                  <p className="text-xs text-muted-foreground">Financial Dashboard</p>
                </div>
              )}
            </div>
          }
          items={financialNavItems}
          footer={
            <div className="space-y-1">
              {userNavItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  isCollapsed={isCollapsed}
                  variant="ghost"
                />
              ))}
            </div>
          }
        />
      )}
    </SidebarWrapper>
  ),
  args: {},
};

// Collapsed State
export const Collapsed: Story = {
  render: (args) => (
    <SidebarWrapper initialCollapsed={true}>
      {({ isCollapsed, onToggle }) => (
        <Sidebar
          {...args}
          isCollapsed={isCollapsed}
          onToggle={onToggle}
          header={
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="size-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-semibold text-sm">InvestPal</h1>
                  <p className="text-xs text-muted-foreground">Financial Dashboard</p>
                </div>
              )}
            </div>
          }
          items={financialNavItems}
        />
      )}
    </SidebarWrapper>
  ),
  args: {},
};

// Glass Variant
export const GlassVariant: Story = {
  render: (args) => (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <SidebarWrapper>
        {({ isCollapsed, onToggle }) => (
          <Sidebar
            {...args}
            variant="glass"
            isCollapsed={isCollapsed}
            onToggle={onToggle}
            header={
              <div className="flex items-center gap-2">
                <div className="size-8 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <TrendingUp className="size-4 text-primary-foreground" />
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="font-semibold text-sm">InvestPal</h1>
                    <p className="text-xs text-muted-foreground">Financial Dashboard</p>
                  </div>
                )}
              </div>
            }
            items={financialNavItems}
          />
        )}
      </SidebarWrapper>
    </div>
  ),
  args: {},
};

// Dark Variant
export const DarkVariant: Story = {
  render: (args) => (
    <SidebarWrapper>
      {({ isCollapsed, onToggle }) => (
        <Sidebar
          {...args}
          variant="dark"
          isCollapsed={isCollapsed}
          onToggle={onToggle}
          header={
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="size-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-semibold text-sm text-foreground">InvestPal</h1>
                  <p className="text-xs text-muted-foreground">Financial Dashboard</p>
                </div>
              )}
            </div>
          }
          items={financialNavItems}
        />
      )}
    </SidebarWrapper>
  ),
  args: {},
};

// Mobile Overlay
export const MobileOverlay: Story = {
  render: (args) => (
    <div className="h-screen bg-background relative">
      <div className="p-4">
        <button 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => {
            // This would typically be handled by the parent component
            console.log('Open mobile sidebar');
          }}
        >
          Open Sidebar
        </button>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Main content area. The sidebar overlay will appear on top when opened.</p>
        </div>
      </div>
      
      <Sidebar
        {...args}
        overlay={true}
        header={
          <div className="flex items-center gap-2">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="size-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">InvestPal</h1>
              <p className="text-xs text-muted-foreground">Mobile Menu</p>
            </div>
          </div>
        }
        items={financialNavItems}
        footer={
          <div className="space-y-1">
            {userNavItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                variant="ghost"
              />
            ))}
          </div>
        }
        onOverlayClick={() => console.log('Close overlay')}
      />
    </div>
  ),
  args: {},
};

// Right Position
export const RightPosition: Story = {
  render: (args) => (
    <SidebarWrapper>
      {({ isCollapsed, onToggle }) => (
        <div className="flex h-screen">
          <div className="flex-1 p-4 bg-muted/20">
            <h2 className="text-lg font-semibold mb-2">Main Content</h2>
            <p className="text-muted-foreground">
              This sidebar is positioned on the right side of the screen.
            </p>
          </div>
          <Sidebar
            {...args}
            position="right"
            isCollapsed={isCollapsed}
            onToggle={onToggle}
            header={
              <div className="flex items-center gap-2">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                  <Settings className="size-4 text-primary-foreground" />
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="font-semibold text-sm">Settings</h1>
                    <p className="text-xs text-muted-foreground">Configuration</p>
                  </div>
                )}
              </div>
            }
            items={userNavItems}
          />
        </div>
      )}
    </SidebarWrapper>
  ),
  args: {},
};

// Without Toggle
export const WithoutToggle: Story = {
  render: (args) => (
    <Sidebar
      {...args}
      showToggle={false}
      header={
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="size-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">InvestPal</h1>
            <p className="text-xs text-muted-foreground">Fixed Sidebar</p>
          </div>
        </div>
      }
      items={financialNavItems.slice(0, 4)}
    />
  ),
  args: {},
};

// Custom Content
export const CustomContent: Story = {
  render: (args) => (
    <SidebarWrapper>
      {({ isCollapsed, onToggle }) => (
        <Sidebar
          {...args}
          isCollapsed={isCollapsed}
          onToggle={onToggle}
          header={
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                <Calculator className="size-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-semibold text-sm">Custom Sidebar</h1>
                  <p className="text-xs text-muted-foreground">With custom content</p>
                </div>
              )}
            </div>
          }
        >
          <div className="p-4 space-y-4">
            {!isCollapsed && (
              <>
                <div>
                  <h3 className="font-medium text-sm mb-2">Portfolio Value</h3>
                  <div className="text-2xl font-bold text-green-600">$124,567.89</div>
                  <div className="text-xs text-green-600">+2.4% today</div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Top Holdings</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>AAPL</span>
                      <span className="text-green-600">+1.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TSLA</span>
                      <span className="text-red-600">-0.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NVDA</span>
                      <span className="text-green-600">+3.1%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Market Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="size-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Markets Open</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Sidebar>
      )}
    </SidebarWrapper>
  ),
  args: {},
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: (args) => (
    <SidebarWrapper>
      {({ isCollapsed, onToggle }) => (
        <div className="flex h-screen">
          <Sidebar
            {...args}
            isCollapsed={isCollapsed}
            onToggle={onToggle}
            header={
              <div className="flex items-center gap-2">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="size-4 text-primary-foreground" />
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="font-semibold text-sm">InvestPal</h1>
                    <p className="text-xs text-muted-foreground">Try collapsing me!</p>
                  </div>
                )}
              </div>
            }
            items={financialNavItems}
            footer={
              <div className="space-y-1">
                {userNavItems.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    isCollapsed={isCollapsed}
                    variant="ghost"
                  />
                ))}
              </div>
            }
          />
          
          <div className="flex-1 p-8 bg-muted/10">
            <h2 className="text-xl font-semibold mb-4">Interactive Sidebar Demo</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Click the toggle button to collapse/expand the sidebar.</p>
              <p>Hover over collapsed items to see tooltips.</p>
              <p>Click on items with children to expand nested navigation.</p>
              <p>Notice how badges and active states are preserved in both expanded and collapsed modes.</p>
            </div>
          </div>
        </div>
      )}
    </SidebarWrapper>
  ),
  args: {},
};