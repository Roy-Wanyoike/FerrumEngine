# FerrumEngine Project

A comprehensive full-stack web application built with modern technologies for AI-powered services and intelligent workflows.

## 🚀 Features

- **Next.js Framework** - Fast, production-ready React framework with server-side rendering
- **TypeScript** - Type-safe development with full type checking
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Prisma ORM** - Type-safe database access with automatic migrations
- **Turbo Monorepo** - Efficient monorepo management with optimized builds
- **ESLint & Prettier** - Code quality and formatting standards
- **Multiple Micro-services** - Scalable architecture with mini-services
- **AI Integration** - Support for AI-powered features and workflows
- **WebSocket Support** - Real-time communication capabilities

## 📋 Project Structure

```
FerrumEngine-project/
├── ferrum-platform/          # Main monorepo with packages
│   ├── packages/            # Shared packages and modules
│   └── pnpm-workspace.yaml  # PNPM workspace configuration
├── src/                     # Source code (components, pages, utilities)
├── prisma/                  # Database schema and migrations
│   └── schema.prisma
├── scripts/                 # Automation and utility scripts
│   ├── Python scripts for data processing
│   ├── ferrum_ai_body.py   # AI-related functionality
│   └── generate-roycss.py  # Style generation
├── skills/                  # AI skills and specialized modules
│   ├── coding-agent/       # Coding assistance
│   ├── image-generation/   # Image generation capabilities
│   ├── LLM/               # Language model integration
│   └── [many more skills...]
├── mini-services/          # Microservices architecture
├── public/                 # Static assets
│   └── ferrum-effects.css
├── download/              # Sample data and search results
├── examples/              # Example implementations
│   └── websocket/        # WebSocket examples
├── db/                    # Database files
└── upload/               # User upload directory
```

## 🛠 Tech Stack

### Frontend
- **Next.js** 14+ - React framework
- **React** - UI library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

### Backend & Database
- **Prisma** - ORM
- **Node.js** - Runtime
- **PNPM** - Package manager

### DevOps & Build Tools
- **Turbo** - Monorepo manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework
- **Caddy** - Web server

### Integration & Services
- **AI/LLM APIs** - Multiple AI service integrations
- **WebSocket** - Real-time communication
- **Python Scripts** - Data processing and automation

## 📦 Getting Started

### Prerequisites
- Node.js 18+ or higher
- PNPM 8+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FerrumEngine-project
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Set up the database**
```bash
pnpm exec prisma migrate dev
pnpm exec prisma generate
```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the project:
```bash
pnpm build
```

Start production server:
```bash
pnpm start
```

## 🧪 Testing

Run tests:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

## 📝 Scripts

Key scripts available in `package.json`:

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm type-check` - TypeScript type checking

## 🎨 Styling

The project uses **Tailwind CSS** for styling with custom configurations:
- Custom animations and effects in `ferrum-effects.css`
- Tailwind configuration in `tailwind.config.ts`
- PostCSS processing in `postcss.config.mjs`

## 🤖 AI & Skills System

The `skills/` directory contains specialized AI modules including:
- **coding-agent** - Code generation and analysis
- **image-generation** - AI image creation
- **image-search** - Image searching capabilities
- **LLM** - Language model integration
- **interview-prep** - Interview preparation tools
- **content-strategy** - Content planning and optimization
- And 20+ additional specialized skills

## 🌐 API & Services

### WebSocket Support
Real-time communication examples available in `examples/websocket/`

### Micro-services Architecture
Mini-services located in `mini-services/` directory for scalable functionality

## 📚 Database

Prisma ORM is used for database management:
- Schema defined in `prisma/schema.prisma`
- Automatic migrations with `prisma migrate`
- Type-safe database queries in application code

## 🔧 Configuration Files

- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **eslint.config.mjs** - ESLint configuration
- **postcss.config.mjs** - PostCSS configuration
- **Caddyfile** - Caddy web server configuration
- **pnpm-workspace.yaml** - PNPM workspace setup
- **turbo.json** - Turbo build configuration

## 📸 Screenshots

### Hero Section & Homepage
![Ferrum Hero](./download/ferrum-hero.png)
*Main hero showcase*

![Homepage Final](./download/homepage-final.png)
*Final homepage design*

![Hero Scroll Narrative](./download/hero-scroll-narrative.png)
*Interactive scroll experience*

### Design & Effects
![Effects Gallery](./download/effects-gallery.png)
*Beautiful animation effects gallery*

![Ferrum Why](./download/ferrum-why.png)
*Value proposition visualization*

### Components & UI
![MagicUI Components](./download/magicui-components.png)
*Component library showcase*

![MagicUI Aurora Text](./download/magicui-aurora-text.png)
*Aurora text effects*

![MagicUI Border Beam](./download/magicui-border-beam.png)
*Border beam animations*

### Navigation & Themes
![Navigation Platform Menu](./download/nav-platform-menu.png)
*Platform navigation menu*

![Navigation Dark Mode](./download/nav-dark-mode.png)
*Dark mode navigation*

![Theme Dropdown Dark](./download/theme-dropdown-dark.png)
*Theme selector - dark mode*

![Theme Dropdown Light](./download/theme-dropdown-light.png)
*Theme selector - light mode*

### Light Mode Showcase
![Light Mode Site](./download/light-mode-site.png)
*Full site in light theme*

### Documentation
![Getting Started Docs](./download/docs-getting-started.png)
*Getting started guide*

![Framework Docs](./download/docs-framework.png)
*Framework documentation*

![Performance Docs](./download/docs-performance.png)
*Performance optimization guide*

### Design System
![RoyCSS Entrance](./download/roycss-entrance.png)
*RoyCSS design system entrance*

![RoyCSS Hero](./download/roycss-hero.png)
*RoyCSS hero section*

![RoyCSS Screenshot](./download/roycss-screenshot.png)
*RoyCSS full page view*

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

### Code Quality Standards
- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting
- Type safety across all code

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or contributions:
1. Check existing issues and documentation
2. Create a new issue with detailed information
3. Follow the contribution guidelines

## 🎯 Roadmap

- [ ] Enhanced AI capabilities
- [ ] Performance optimizations
- [ ] Additional skill modules
- [ ] Improved documentation
- [ ] Community contributions

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Turbo Documentation](https://turbo.build/repo/docs)

---

**Last Updated:** 2026-07-24

For the latest updates and news about the project, check the [worklog.md](worklog.md)
