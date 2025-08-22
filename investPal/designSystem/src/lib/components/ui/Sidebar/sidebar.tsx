
"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '../../../utils'

const sidebarVariants = cva(
  "flex h-full w-64 flex-col border-r bg-background transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        floating: "bg-card border-border shadow-lg rounded-lg m-2 h-[calc(100%-1rem)]",
        sidebar: "bg-sidebar border-sidebar-border",
      },
      size: {
        default: "w-64",
        sm: "w-52",
        lg: "w-72",
        xl: "w-80",
      },
      collapsible: {
        none: "",
        offcanvas: "fixed inset-y-0 left-0 z-50 shadow-lg lg:static lg:shadow-none",
        icon: "group data-[state=collapsed]:w-16",
      },
      side: {
        left: "",
        right: "border-l border-r-0 right-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      collapsible: "none",
      side: "left",
    },
  }
)

const sidebarHeaderVariants = cva(
  "flex flex-col gap-2 p-4",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebarContentVariants = cva(
  "flex flex-1 flex-col gap-2 overflow-y-auto p-2",
  {
    variants: {
      variant: {
        default: "",
        compact: "p-1 gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebarFooterVariants = cva(
  "p-4",
  {
    variants: {
      variant: {
        default: "border-t border-border",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebarGroupVariants = cva(
  "relative flex w-full flex-col gap-1 p-2",
  {
    variants: {
      variant: {
        default: "",
        collapsible: "group/collapsible",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebarGroupLabelVariants = cva(
  "flex h-8 shrink-0 items-center px-2 text-xs font-medium text-muted-foreground outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "",
        collapsible: "cursor-pointer hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sidebarMenuVariants = cva("flex flex-col gap-1")

const sidebarMenuItemVariants = cva("")

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex h-8 min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md px-2 text-left text-sm font-normal outline-none transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring active:bg-accent/50 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-input bg-background shadow-sm hover:bg-accent",
      },
      size: {
        default: "h-8 px-2",
        sm: "h-7 px-1.5 text-xs",
        lg: "h-10 px-3",
      },
      isActive: {
        true: "bg-accent font-medium text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isActive: false,
    },
  }
)

const sidebarMenuBadgeVariants = cva(
  "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs tabular-nums text-sidebar-foreground",
  {
    variants: {
      variant: {
        default: "bg-sidebar-accent text-sidebar-accent-foreground",
        secondary: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SidebarContextProps {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ defaultOpen = true, open: openProp, onOpenChange, children, ...props }, ref) => {
    const [openMobile, setOpenMobile] = React.useState(false)
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (onOpenChange) {
          onOpenChange(openState)
        } else {
          _setOpen(openState)
        }
      },
      [onOpenChange, open]
    )

    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile(!openMobile)
      } else {
        setOpen(!open)
      }
    }, [isMobile, openMobile, open, setOpen])

    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

interface SidebarProps extends React.ComponentProps<"div">, VariantProps<typeof sidebarVariants> {
  asChild?: boolean
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, variant, size, collapsible, side, asChild = false, ...props }, ref) => {
    const { state, openMobile, setOpenMobile, isMobile } = useSidebar()
    
    const Comp = asChild ? Slot : "div"

    if (collapsible === "offcanvas") {
      return (
        <>
          {isMobile && openMobile && (
            <div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => setOpenMobile(false)}
            />
          )}
          <Comp
            ref={ref}
            className={cn(
              sidebarVariants({ variant, size, collapsible, side }),
              isMobile ? (openMobile ? "translate-x-0" : "-translate-x-full") : "",
              className
            )}
            data-state={state}
            data-collapsible={collapsible}
            data-variant={variant}
            data-side={side}
            {...props}
          />
        </>
      )
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          sidebarVariants({ variant, size, collapsible, side }),
          className
        )}
        data-state={state}
        data-collapsible={collapsible}
        data-variant={variant}
        data-side={side}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

interface SidebarTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()
    
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:size-4",
          className
        )}
        onClick={toggleSidebar}
        {...props}
      />
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

interface SidebarInsetProps extends React.ComponentProps<"main"> {
  asChild?: boolean
}

const SidebarInset = React.forwardRef<HTMLElement, SidebarInsetProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "main"

    return (
      <Comp
        ref={ref}
        className={cn(
          "relative flex min-h-svh flex-1 flex-col bg-background",
          "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarInset.displayName = "SidebarInset"

interface SidebarHeaderProps extends React.ComponentProps<"div">, VariantProps<typeof sidebarHeaderVariants> {
  asChild?: boolean
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarHeaderVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

interface SidebarContentProps extends React.ComponentProps<"div">, VariantProps<typeof sidebarContentVariants> {
  asChild?: boolean
}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarContentVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
SidebarContent.displayName = "SidebarContent"

interface SidebarFooterProps extends React.ComponentProps<"div">, VariantProps<typeof sidebarFooterVariants> {
  asChild?: boolean
}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarFooterVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

interface SidebarGroupProps extends React.ComponentProps<"div">, VariantProps<typeof sidebarGroupVariants> {
  asChild?: boolean
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarGroupVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
SidebarGroup.displayName = "SidebarGroup"

interface SidebarGroupLabelProps extends React.ComponentProps<"div">, VariantProps<typeof sidebarGroupLabelVariants> {
  asChild?: boolean
}

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarGroupLabelVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

interface SidebarGroupContentProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn("flex flex-1 flex-col gap-1", className)}
        {...props}
      />
    )
  }
)
SidebarGroupContent.displayName = "SidebarGroupContent"

interface SidebarMenuProps extends React.ComponentProps<"ul"> {
  asChild?: boolean
}

const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "ul"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarMenuVariants(), className)}
        {...props}
      />
    )
  }
)
SidebarMenu.displayName = "SidebarMenu"

interface SidebarMenuItemProps extends React.ComponentProps<"li"> {
  asChild?: boolean
}

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "li"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarMenuItemVariants(), className)}
        {...props}
      />
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps extends React.ComponentProps<"button">, VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ReactNode
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, variant, size, isActive, asChild = false, tooltip, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const button = (
      <Comp
        ref={ref}
        className={cn(sidebarMenuButtonVariants({ variant, size, isActive }), className)}
        data-active={isActive}
        {...props}
      />
    )

    if (tooltip) {
      return (
        <div className="group relative">
          {button}
          {typeof tooltip === "string" ? (
            <div className="absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 rounded bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md group-hover:block">
              {tooltip}
            </div>
          ) : (
            <div className="absolute left-full top-1/2 z-50 ml-2 hidden -translate-y-1/2 group-hover:block">
              {tooltip}
            </div>
          )}
        </div>
      )
    }

    return button
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

interface SidebarMenuActionProps extends React.ComponentProps<"button"> {
  asChild?: boolean
  showOnHover?: boolean
}

const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
          showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground sm:opacity-0",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarMenuAction.displayName = "SidebarMenuAction"

interface SidebarMenuBadgeProps extends React.ComponentProps<"div">, VariantProps<typeof sidebarMenuBadgeVariants> {
  asChild?: boolean
}

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, SidebarMenuBadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(sidebarMenuBadgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
SidebarMenuBadge.displayName = "SidebarMenuBadge"

interface SidebarMenuSkeletonProps extends React.ComponentProps<"div"> {
  showIcon?: boolean
}

const SidebarMenuSkeleton = React.forwardRef<HTMLDivElement, SidebarMenuSkeletonProps>(
  ({ className, showIcon = false, ...props }, ref) => {
    const width = React.useMemo(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`
    }, [])

    return (
      <div
        ref={ref}
        className={cn("flex h-8 items-center gap-2 px-2", className)}
        {...props}
      >
        {showIcon && <div className="size-4 rounded-sm bg-sidebar-accent" />}
        <div
          className="h-4 max-w-[--skeleton-width] flex-1 rounded-sm bg-sidebar-accent"
          style={{
            "--skeleton-width": width,
          } as React.CSSProperties}
        />
      </div>
    )
  }
)
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

interface SidebarMenuSubProps extends React.ComponentProps<"ul"> {
  asChild?: boolean
}

const SidebarMenuSub = React.forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "ul"

    return (
      <Comp
        ref={ref}
        className={cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", className)}
        {...props}
      />
    )
  }
)
SidebarMenuSub.displayName = "SidebarMenuSub"

interface SidebarMenuSubItemProps extends React.ComponentProps<"li"> {
  asChild?: boolean
}

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, SidebarMenuSubItemProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "li"

    return <Comp ref={ref} className={cn(className)} {...props} />
  }
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

interface SidebarMenuSubButtonProps extends React.ComponentProps<"button">, VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
}

const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, SidebarMenuSubButtonProps>(
  ({ className, variant, size, isActive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          sidebarMenuButtonVariants({ variant, size, isActive }),
          "h-7 min-w-0 px-2 text-sidebar-foreground shadow-none",
          className
        )}
        data-active={isActive}
        {...props}
      />
    )
  }
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  sidebarMenuButtonVariants,
}