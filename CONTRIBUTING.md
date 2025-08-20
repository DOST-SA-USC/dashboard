# Contributing to DOST SA USC Tracker

Thank you for your interest in contributing to the DOST SA USC Tracker! This guide will help you get started.

## Development Setup

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
   # Fill in the required environment variables
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Code Quality Standards

This project uses several tools to maintain code quality:

- **ESLint** - For code linting
- **Prettier** - For code formatting
- **TypeScript** - For type safety
- **Husky** - For pre-commit hooks
- **Jest** - For testing

### Before committing:

```bash
npm run lint          # Check for linting errors
npm run format        # Format code with Prettier
npm run type-check    # Check TypeScript types
npm run test          # Run tests
```

## Pull Request Process

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following the coding standards
3. **Add tests** for any new functionality
4. **Update documentation** if needed
5. **Submit a pull request** using the PR template

### PR Checklist

- [ ] Code follows the project's coding standards
- [ ] Tests pass locally
- [ ] Documentation has been updated if necessary
- [ ] PR description clearly describes the changes
- [ ] Self-review of the code has been completed

## Commit Convention

We use conventional commits for better project history:

```
type(scope): description

Examples:
feat(auth): add login functionality
fix(ui): resolve button spacing issue
docs(readme): update setup instructions
```

## Issue Reporting

When reporting issues, please:

1. Use the provided issue templates
2. Include reproduction steps
3. Provide environment details
4. Add screenshots if applicable

## Development Guidelines

### File Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── stores/        # State management (Zustand)
└── types/         # TypeScript type definitions
```

### Component Guidelines

- Use TypeScript for all components
- Follow the established naming conventions
- Include proper prop types
- Add JSDoc comments for complex functions

### Testing

- Write tests for new features
- Maintain existing test coverage
- Use descriptive test names
- Group related tests with `describe` blocks

## Getting Help

If you need help, you can:

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Contact the maintainers directly

Thank you for contributing to the DOST SA USC Tracker!
