# Contributing Guidelines

Thank you for wanting to contribute to our CRM project! This document describes the process and standards for contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Conventions](#commit-message-conventions)
- [Code Style Guide](#code-style-guide)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

We are committed to a respectful and inclusive environment. All contributions must respect the following core values:

- ✅ **Respect**: Treat all members with courtesy and professionalism
- ✅ **Inclusion**: Welcome perspectives from diverse backgrounds
- ✅ **Constructiveness**: Provide helpful and factual feedback
- ✅ **Transparency**: Be open about your challenges and ideas

Violations can be reported to [contact@marco-lenschau.de].

---

## How Can I Contribute?

### 1. Report Bugs

Found a bug? Open an **Issue** with the following information:

```
Title: [BUG] Brief description

Description:
- What is the expected behavior?
- What is the actual behavior?
- How can it be reproduced?

Environment:
- Node.js Version: [e.g., 18.17.0]
- npm Version: [e.g., 9.6.7]
- Browser: [if relevant]
- OS: [Linux/Windows/macOS]

Screenshots/Logs:
[If relevant]
```

### 2. Suggest Features

Have a great idea? Create an Issue with the label `enhancement`:

```
Title: [FEATURE] Description of the feature

Motivation:
Why is this feature important?

Description:
What exactly should be implemented?

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2

Additional Context:
[Screenshots, links, references, etc.]
```

### 3. Contribute Code

Follow this process:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/CRM.git`
3. **Create a branch** (see [Branch Naming Conventions](#branch-naming-conventions))
4. **Make changes** and commit
5. **Write/run tests**
6. **Format code** with ESLint & Prettier
7. **Push** to your fork
8. **Open a Pull Request**

---

## Development Setup

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.6.7
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/MarcoLenschau/CRM.git
cd CRM

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Create production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

---

## Branch Naming Conventions

We follow this branch naming schema for organization and clarity:

### Format

```
<type>/<feature-name>
```

### Types

| Type | Usage | Example |
|------|-------|----------|
| `feature/` | New feature | `feature/user-authentication` |
| `bugfix/` | Bug fix | `bugfix/login-error` |
| `refactor/` | Code restructuring | `refactor/api-middleware` |
| `docs/` | Documentation | `docs/api-documentation` |
| `test/` | Add tests | `test/customer-service` |
| `chore/` | Dependencies, build, etc. | `chore/update-dependencies` |
| `hotfix/` | Critical production fixes | `hotfix/security-patch` |

### Naming Rules

- **Lowercase**: `feature/my-feature` ✅ (not `feature/MyFeature` ❌)
- **Hyphens instead of underscores**: `feature/my-feature` ✅ (not `feature/my_feature` ❌)
- **Descriptive**: `feature/customer-detail-page` ✅ (not `feature/page-update` ❌)

### Examples

```bash
git checkout -b feature/calendar-integration
git checkout -b bugfix/event-creation-error
git checkout -b refactor/customer-api
git checkout -b docs/setup-guide
```

---

## Commit Message Conventions

We follow the **Conventional Commits** standard:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Components

#### Type (required)

| Type | Meaning |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no feature/bug change) |
| `docs` | Documentation |
| `style` | Code formatting (ESLint, Prettier) |
| `test` | Add/change tests |
| `chore` | Build, dependencies, etc. |
| `perf` | Performance improvements |

#### Scope (optional)

Affected module:
- `api`
- `auth`
- `customer`
- `event`
- `ui`
- `db`
- etc.

#### Subject (required)

- Imperative, present tense: "add" not "added" or "adds"
- No period at the end
- Max. 50 characters
- Lowercase

#### Body (optional)

- Explain **what** and **why**, not **how**
- Line break after subject
- Max. 72 characters per line
- Use `-` or `*` for lists

#### Footer (optional)

- Issue references: `Fixes #123`, `Closes #123`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

```bash
# Simple feature
git commit -m "feat(customer): add customer search functionality"

# With body
git commit -m "fix(auth): resolve JWT token expiration issue

- Token now refreshes automatically on page reload
- Added token validation middleware
- Increased token lifetime to 24 hours

Fixes #145"

# Breaking change
git commit -m "refactor(api)!: restructure customer endpoints

BREAKING CHANGE: GET /api/customer/:id now requires authentication token"
```

---

## Code Style Guide

### TypeScript/JavaScript

#### Formatting with Prettier

```bash
# Auto-format all files
npm run format

# Check only (no changes)
npm run format:check
```

**Prettier Config** (`package.json`):
- Indent: 2 spaces
- Line Length: 80 characters
- Trailing Commas: es5
- Semicolons: true
- Single Quotes: false

#### Linting with ESLint

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint -- --fix
```

**ESLint Rules** (`eslint.config.mjs`):
- Use `const` and `let`, not `var`
- No `any` types without good reason
- No unused variables
- Consistent error handling

### SCSS/CSS

- Use SCSS for stylesheets
- BEM Methodology for class names: `.component__element--modifier`
- Variables for colors and spacing
- Mobile-first approach

```scss
// ✅ Good
.customer-card__header {
  padding: var(--spacing-md);
}

.customer-card__header--active {
  background: var(--color-primary);
}

// ❌ Bad
.customerCardHeader {
  padding: 16px;
}

.customerCardHeader_active {
  background: #007bff;
}
```

### React/Next.js

- Functional components with hooks
- Props TypeScript-typed
- Descriptive component names
- One component per file (except small UI components)

```typescript
// ✅ Good
interface CustomerCardProps {
  customerId: string;
  onDelete?: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customerId,
  onDelete,
}) => {
  // ...
};

// ❌ Bad
export const CC = ({ id, onDel }) => {
  // ...
};
```

### File Structure

```
app/
├── components/
│   ├── CustomerCard/
│   │   ├── CustomerCard.tsx
│   │   └── CustomerCard.scss
│   └── Header/
├── api/
│   └── customer/
├── utils/
│   └── api.ts
└── interfaces/
    └── customer.interface.ts
```

---

## Pull Request Process

### 1. Create a PR

```bash
# Make sure your branch is up-to-date
git fetch origin
git rebase origin/main

# Push to your fork
git push origin feature/my-feature
```

### 2. PR Description

Use the following template:

```markdown
## Description
Brief description of what changes.

## Type of Change
- [ ] New Feature
- [ ] Bug Fix
- [ ] Breaking Change
- [ ] Documentation Update

## Related Issues
Fixes #(issue)

## How Has This Been Tested?
- [ ] Unit Tests
- [ ] Manual Testing in Browser
- [ ] API Testing

## Testing Instructions
Step-by-step to test:
1. ...
2. ...

## Screenshots (if relevant)
[Add screenshots here]

## Checklist
- [ ] Code follows the style guidelines
- [ ] ESLint/Prettier has been run
- [ ] Tests are written and passing
- [ ] Documentation has been updated
- [ ] No new warnings in the console

## Breaking Changes
Describe breaking changes here.
```

### 3. Review Process

- ✅ At least 1 approval from maintainer
- ✅ All checks must be green
- ✅ Conflicts must be resolved
- ✅ Code will be auto-formatted

### 4. Merge

After approval:
- Squash commits (if many small commits)
- Add meaningful merge commit message
- Delete your branch

---

## Testing

### Write Unit Tests

```typescript
// ✅ Example
describe('CustomerService', () => {
  it('should fetch customer by ID', async () => {
    const result = await getCustomerById('123');
    expect(result.id).toBe('123');
  });
});
```

### Run Tests

```bash
npm run test           # All tests
npm run test -- --watch # Watch mode
npm run test:coverage  # Coverage report
```

---

## Reporting Bugs

### Bug Report Issue Template

```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
What should happen?

## Actual Behavior
What happens instead?

## Environment
- Node.js: [Version]
- npm: [Version]
- Browser: [Browser + Version]
- OS: [OS]

## Logs/Screenshots
```

---

## Feature Requests

### Feature Request Issue Template

```markdown
## Is your feature request related to a problem?
Describe the problem.

## Describe the solution you'd like
How should it be solved?

## Describe alternatives you've considered
Other possible solutions?

## Additional context
Screenshots, links, etc.
```

---

## FAQs

**Q: Why isn't my PR being merged?**
A: Common reasons:
- ESLint/Prettier errors → `npm run format && npm run lint`
- Tests failed → `npm run test`
- Documentation not updated
- No meaningful commit message

**Q: How long until my PR is reviewed?**
A: Usually 2-5 business days. Please don't use `@` mentions.

**Q: Can I work directly on the `main` branch?**
A: No, always use a feature branch.

**Q: What if there are merge conflicts?**
A: Rebase on `main` and resolve conflicts:
```bash
git fetch origin
git rebase origin/main
# Resolve conflicts...
git rebase --continue
git push --force-with-lease
```

---

## Support

- 📧 Email: [contact@marco-lenschau.de]
- 💬 Discussions: [GitHub Discussions]
- 📚 Docs: [./docs](./docs)

---

## License

By contributing, you agree that your code will be published under the project's license.

**Thank you for your support! 🚀**
