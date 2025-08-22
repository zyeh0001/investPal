import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from '../../../utils'

const sidebarVariants = cva(
  "flex flex-col bg-background border-r transition-all duration-300 ease-in-out h-full overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-border",
        glass: "bg-background/80 backdrop-blur-sm border-border/50",
        dark: "bg-secondary border-secondary",
      },
      state: {
        expanded: "w-64",
        collapsed: "w-16",
        overlay: "fixed top-0 left-0 z-50 w-64 h-screen shadow-lg",
      },
      position: {
        left: "left-0",
        right: "right-0",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "expanded",
      position: "left",
    },
  }
)

const sidebarHeaderVariants = cva(
  "flex items-center justify-between p-4 border-b border-border min-h-[64px]",
  {
    variants: {
      state: {
        expanded: "px-4",
        collapsed: "px-2 justify-center",
        overlay: "px-4",
      },
    },
    defaultVariants: {
      state: "expanded",
    },
  }
)

const sidebarContentVariants = cva(
  "flex-1 overflow-y-auto overflow-x-hidden",
  {
    variants: {
      state: {
        expanded: "px-2",
        collapsed: "px-1",
        overlay: "px-2",
      },
    },
    defaultVariants: {
      state: "expanded",
    },
  }
)

const sidebarItemVariants = cva(
  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 relative group cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
        active: "bg-primary text-primary-foreground shadow-sm",
      },
      state: {
        expanded: "justify-start",
        collapsed: "justify-center px-2",
        overlay: "justify-start",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "expanded",
    },
  }
)

const sidebarToggleVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors p-2 h-8 w-8",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground hover:bg-accent",
        ghost: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Types
export interface SidebarNavigationItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  href?: string
  badge?: string | number
  isActive?: boolean
  children?: SidebarNavigationItem[]
  onClick?: () => void
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sidebarVariants> {
  isCollapsed?: boolean
  onToggle?: () => void
  showToggle?: boolean
  header?: React.ReactNode
  items?: SidebarNavigationItem[]
  footer?: React.ReactNode
  overlay?: boolean
  onOverlayClick?: () => void
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sidebarHeaderVariants> {
  children?: React.ReactNode
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sidebarContentVariants> {
  children?: React.ReactNode
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof sidebarItemVariants> {
  item: SidebarNavigationItem
  isCollapsed?: boolean
  asChild?: boolean
}

interface SidebarToggleProps extends React.HTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof sidebarToggleVariants> {
  isCollapsed?: boolean
  onToggle?: () => void
}

// Sidebar Component
function Sidebar({
  className,
  variant,
  state,
  position,
  isCollapsed = false,
  onToggle,
  showToggle = true,
  header,
  items = [],
  footer,
  overlay = false,
  onOverlayClick,
  children,
  ...props
}: SidebarProps) {
  const sidebarState = React.useMemo(() => {
    if (overlay) return "overlay"
    return isCollapsed ? "collapsed" : "expanded"
  }, [isCollapsed, overlay])

  return (
    <>
      {overlay && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onOverlayClick}
        />
      )}
      <div
        className={cn(sidebarVariants({ variant, state: sidebarState, position, className }))}
        {...props}
      >
        {/* Header */}
        <SidebarHeader state={sidebarState}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {header}
          </div>
          {showToggle && !overlay && (
            <SidebarToggle isCollapsed={isCollapsed} onToggle={onToggle} />
          )}
        </SidebarHeader>

        {/* Content */}
        <SidebarContent state={sidebarState}>
          {children || (
            <nav className="space-y-1 py-2">
              {items.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  state={sidebarState}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          )}
        </SidebarContent>

        {/* Footer */}
        {footer && (
          <div className={cn(
            "border-t border-border p-4",
            isCollapsed && "px-2"
          )}>
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

// Sidebar Header Component
function SidebarHeader({
  className,
  state,
  children,
  ...props
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(sidebarHeaderVariants({ state, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

// Sidebar Content Component
function SidebarContent({
  className,
  state,
  children,
  ...props
}: SidebarContentProps) {
  return (
    <div
      className={cn(sidebarContentVariants({ state, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

// Sidebar Item Component
function SidebarItem({
  className,
  variant,
  state,
  item,
  isCollapsed = false,
  asChild = false,
  ...props
}: SidebarItemProps) {
  const Comp = asChild ? Slot : "div"
  const IconComponent = item.icon
  const hasChildren = item.children && item.children.length > 0
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleClick = React.useCallback(() => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
    if (item.onClick) {
      item.onClick()
    }
  }, [hasChildren, isExpanded, item])

  return (
    <>
      <Comp
        className={cn(sidebarItemVariants({ 
          variant: item.isActive ? "active" : variant, 
          state, 
          className 
        }))}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        {...props}
      >
        {IconComponent && (
          <IconComponent className={cn(
            "shrink-0",
            isCollapsed ? "size-5" : "size-4"
          )} />
        )}
        
        {!isCollapsed && (
          <>
            <span className="truncate flex-1">{item.label}</span>
            
            {item.badge && (
              <span className={cn(
                "inline-flex items-center justify-center rounded-full text-xs font-medium",
                typeof item.badge === 'number' && item.badge > 0
                  ? "bg-primary text-primary-foreground h-5 min-w-5 px-1.5"
                  : "bg-muted text-muted-foreground h-5 px-2"
              )}>
                {item.badge}
              </span>
            )}
            
            {hasChildren && (
              <ChevronRight className={cn(
                "size-4 transition-transform",
                isExpanded && "rotate-90"
              )} />
            )}
          </>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {item.label}
            {item.badge && (
              <span className="ml-2 text-xs text-muted-foreground">
                {item.badge}
              </span>
            )}
          </div>
        )}
      </Comp>

      {/* Nested items */}
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="ml-4 space-y-1 border-l border-border pl-4 mt-1">
          {item.children!.map((childItem) => (
            <SidebarItem
              key={childItem.id}
              item={childItem}
              state={state}
              isCollapsed={isCollapsed}
              variant="ghost"
            />
          ))}
        </div>
      )}
    </>
  )
}

// Sidebar Toggle Component
function SidebarToggle({
  className,
  variant,
  isCollapsed = false,
  onToggle,
  ...props
}: SidebarToggleProps) {
  const Icon = isCollapsed ? ChevronRight : ChevronLeft

  return (
    <button
      className={cn(sidebarToggleVariants({ variant, className }))}
      onClick={onToggle}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      {...props}
    >
      <Icon className="size-4" />
    </button>
  )
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  SidebarToggle,
  sidebarVariants,
  sidebarHeaderVariants,
  sidebarContentVariants,
  sidebarItemVariants,
  sidebarToggleVariants,
}
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarItemProps,
  SidebarToggleProps,
}