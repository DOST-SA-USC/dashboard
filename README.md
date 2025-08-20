<img src="./public/logo.png" alt="logo" width="96">

# DOST SA USC Tracker

Official scholar portal for DOST SA USC scholars to track stipends, announcements, and academic progress.

[![CI](https://github.com/DOST-SA-USC/tracker/workflows/CI/badge.svg)](https://github.com/DOST-SA-USC/tracker/actions/workflows/ci.yml)
[![Code Quality](https://github.com/DOST-SA-USC/tracker/workflows/Code%20Quality/badge.svg)](https://github.com/DOST-SA-USC/tracker/actions/workflows/code-quality.yml)

## ✨ Features

- 📊 **Scholar Dashboard** - Track academic progress and stipend status
- 📢 **Announcements** - Stay updated with important notifications
- 👥 **User Management** - Role-based access control for students and administrators
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔐 **Secure Authentication** - Protected routes and secure user sessions

## 🛠️ Tech Stack

![Tech Stack](https://skills-icons.vercel.app/api/icons?i=nextjs,ts,tailwind,shadcnui,supabase,betterauth,drizzle,zustand)

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Better Auth
- **ORM**: Drizzle ORM
- **State Management**: Zustand
- **Testing**: Jest, React Testing Library

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DOST-SA-USC/tracker.git
   cd tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Supabase credentials and other required variables.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Code Quality

This project enforces code quality through:

- **Pre-commit hooks** with Husky and lint-staged
- **Automated formatting** with Prettier
- **Linting** with ESLint
- **Type checking** with TypeScript
- **Testing** with Jest and React Testing Library

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and commit: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📊 Project Status

- 🚧 **Development**: Active development
- 🧪 **Testing**: Automated testing setup
- 🚀 **CI/CD**: GitHub Actions workflows
- 📦 **Dependencies**: Automated updates with Dependabot

## 🔒 Security

- Automated security scanning with CodeQL
- Dependency vulnerability monitoring
- Regular security audits

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Maintained by the DOST SA USC development team.

---

<p align="center">Made with ❤️ for DOST SA USC scholars</p>
