# FerrumEngine Project

A comprehensive full-stack web application built with modern technologies and best practices.

## � Documentation

**Start here for complete guides:**
- ⭐ [**QUICK_REFERENCE.md**](QUICK_REFERENCE.md) - 5-minute overview & setup
- 📚 [**DOCUMENTATION.md**](DOCUMENTATION.md) - Index of all guides
- 🛠️ [**SETUP.md**](SETUP.md) - Complete setup instructions- 🚀 [**SUPABASE_SETUP.md**](SUPABASE_SETUP.md) - PostgreSQL database setup- 📁 [**PROJECT_ORGANIZATION.md**](PROJECT_ORGANIZATION.md) - Folder structure & architecture
- 🔌 [**API_GUIDE.md**](API_GUIDE.md) - Creating API endpoints
- ⚙️ [**.env.example**](.env.example) - Environment variables template

## �🚀 Features

- **Next.js Framework** - Fast, production-ready React framework with server-side rendering
- **TypeScript** - Type-safe development with full type checking
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Prisma ORM** - Type-safe database access with automatic migrations
- **Turbo Monorepo** - Efficient monorepo management with optimized builds
- **ESLint & Prettier** - Code quality and formatting standards
- **Multiple Micro-services** - Scalable architecture with mini-services
- **WebSocket Support** - Real-time communication capabilities

## 📋 Project Structure

```
FerrumEngine-project/
├── ferrum-platform/          # Main monorepo with packages
│   ├── packages/            # Shared packages and modules
│   └── pnpm-workspace.yaml  # PNPM workspace configuration
├── src/                     # Source code
│   ├── app/                # Next.js app (Frontend + Backend API)
│   │   ├── page.tsx       # Homepage
│   │   ├── api/           # Backend API routes
│   │   └── layout.tsx     # Root layout
│   ├── components/         # React UI components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── prisma/                # Database (SQLite)
│   └── schema.prisma
├── public/                # Static assets
├── download/              # Sample images
└── scripts/              # Automation scripts
```

For detailed structure, see [PROJECT_ORGANIZATION.md](PROJECT_ORGANIZATION.md)

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

### Quick Setup (5 minutes)
```bash
# 1. Install dependencies
pnpm install

# 2. Create environment file
cp .env.example .env.local

# 3. Initialize database
pnpm exec prisma migrate dev --name init

# 4. Start dev server
pnpm dev
```

**⚠️ Important:** See [SETUP.md](SETUP.md) for complete configuration guide including required environment variables.

### Prerequisites
- Node.js 18+ or higher
- PNPM 8+
- Git

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

## 🌐 API & Services

### WebSocket Support
Real-time communication examples available in `examples/websocket/`

### Micro-services Architecture
Mini-services located in `mini-services/` directory for scalable functionality

## 📚 Database

**Type:** PostgreSQL via Supabase (scalable, production-ready)  
**ORM:** Prisma (type-safe database access)  
**Setup:** https://supabase.com (free tier)  
**Schema:** `prisma/schema.prisma`

### Database Commands
```bash
# Deploy migrations to Supabase
pnpm exec prisma migrate deploy

# Push schema changes
pnpm exec prisma db push

# View GUI dashboard
pnpm exec prisma studio

# Generate types
pnpm exec prisma generate
```

### Models
- **User** - User accounts with email, name
- **Post** - Blog posts with title, content, author

Supabase PostgreSQL works for both development and production. [See SETUP.md](SETUP.md) for configuration.

## 🔧 Configuration Files

- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **eslint.config.mjs** - ESLint configuration
- **postcss.config.mjs** - PostCSS configuration
- **Caddyfile** - Caddy web server configuration
- **pnpm-workspace.yaml** - PNPM workspace setup
- **turbo.json** - Turbo build configuration

## 🔐 Environment Variables

**Setup:** See [SETUP.md](SETUP.md) for complete guide

### Required
```env
DATABASE_URL="postgresql://user:password@db.supabase.co:5432/postgres"  # Supabase
NODE_ENV="development"
```

### Optional (For Features)
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"        # Authentication
STRIPE_SECRET_KEY="your-key"         # Payments
```

⚠️ **Security:** Never commit `.env.local` - it's in `.gitignore`

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
