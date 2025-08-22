import * as React from "react"
import { useTheme } from "../ThemeProvider"
import { Button } from "../Button"

interface ThemeToggleProps extends React.ComponentProps<typeof Button> {
  className?: string
}

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️"
      case "dark":
        return "🌙"
      case "system":
        return "💻"
      default:
        return "☀️"
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light theme"
      case "dark":
        return "Dark theme"
      case "system":
        return "System theme"
      default:
        return "Toggle theme"
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
      {...props}
    >
      <span className="text-lg">{getThemeIcon()}</span>
      <span className="sr-only">{getThemeLabel()}</span>
    </Button>
  )
}

interface ThemeToggleDropdownProps {
  className?: string
}

export function ThemeToggleDropdown({ className }: ThemeToggleDropdownProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className={className}>
      <div className="flex flex-col gap-1 p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("light")}
          className={`justify-start ${theme === "light" ? "bg-accent" : ""}`}
        >
          <span className="mr-2">☀️</span>
          Light
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("dark")}
          className={`justify-start ${theme === "dark" ? "bg-accent" : ""}`}
        >
          <span className="mr-2">🌙</span>
          Dark
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("system")}
          className={`justify-start ${theme === "system" ? "bg-accent" : ""}`}
        >
          <span className="mr-2">💻</span>
          System
        </Button>
      </div>
    </div>
  )
}