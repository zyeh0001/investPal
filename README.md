# InvestPal - Stock Analysis Frontend MVP

A modern React/Next.js stock analysis application with AI insights and real-time data visualization.

## 🚀 Quick Start

From this directory (`/Users/charles.yeh/Documents/Charles/InvestPal/`), you can use these commands:

### NPM Scripts (Recommended)
```bash
# Start development server
npm run dev
# or
npm start

# Build the application
npm run build

# Build all libraries
npm run build:libs

# Setup/Install dependencies
npm run setup
```

### Shell Scripts (Alternative)
```bash
# Start development
./dev.sh

# Build application  
./build.sh
```

## 📁 Project Structure

```
InvestPal/
├── investPal/              # Nx workspace
│   ├── web/               # Next.js frontend app
│   ├── ui/                # Custom Design System Library
│   ├── shared-types/      # TypeScript interfaces
│   ├── data-access/       # API and data utilities
│   └── web-e2e/          # E2E tests
├── dev.sh                # Quick development script
├── build.sh              # Quick build script
└── package.json          # Parent package.json with convenience scripts
```

## 🛠 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build web application |
| `npm run build:libs` | Build all libraries |
| `npm run setup` | Install all dependencies |
| `npm run test` | Run tests |
| `npm run typecheck` | Type check code |
| `npm run clean` | Clean Nx cache |
| `npm run graph` | Show dependency graph |

## 🔧 Development

The development server will start at `http://localhost:4200`

## 📚 Tech Stack

- **Nx Monorepo** - Workspace management
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Custom Design System** - Reusable UI components

## 🎯 Next Steps

Ready for Step 1.2: Install Core Dependencies (React Query, Zustand, TradingView charts)