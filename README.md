# Deerwalk School Library Management System

A comprehensive school library management system built with modern web technologies, designed to handle book cataloging, student/librarian interactions, book borrowing/returning, and administrative tasks for educational institutions.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents

- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Brand Customization](#brand-customization)
- [Project Structure](#project-structure)
- [Implementation Guidelines](#implementation-guidelines)
- [Development Guidelines](#development-guidelines)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)
- [Open Source Contributions](#open-source-contributions)

## Architecture

### Clean Architecture with Domain-Driven Design

This project follows a modular architecture pattern with clear separation of concerns:

```
src/modules/
├── [FeatureModule]/
│   ├── domain/
│   │   ├── entities/          # Business entities and types
│   │   └── repositories/      # Repository interfaces
│   ├── application/            # Use cases and business logic
│   ├── infra/
│   │   └── repositories/      # Repository implementations
│   └── presentation/
│       └── components/        # UI components and presentation logic
```

### Core Architecture Layers

#### 1. Domain Layer (`domain/`)

Contains business entities, value objects, and repository interfaces. Defines the core business rules and contracts. Independent of external frameworks or libraries.

#### 2. Application Layer (`application/`)

Contains use cases that orchestrate domain objects. Handles business workflows and coordinates between repositories. Uses React Query for state management and caching.

#### 3. Infrastructure Layer (`infra/`)

Implements repository interfaces defined in the domain. Handles external concerns such as API calls and local storage. Contains concrete implementations of domain contracts.

#### 4. Presentation Layer (`presentation/`)

Contains React components and UI logic. Handles user interactions and presentation concerns. Consumes use cases from the application layer.

## Key Principles Used

### SOLID Principles

- **Single Responsibility**: Each class/module has one reason to change
- **Open/Closed**: Modules are open for extension but closed for modification
- **Liskov Substitution**: Repository implementations are interchangeable
- **Interface Segregation**: Clean interfaces with specific purposes
- **Dependency Inversion**: Depend on abstractions, not concretions

### Error Handling Strategy

```typescript
// Custom error types for different layers
export class BusinessLogicError extends Error {
  constructor(
    message?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "BusinessLogicError";
  }
}

export class RepositoryError extends Error {
  constructor(
    message?: string,
    public statusCode?: number,
  ) {
    super(message);
  }
}

export class UseCaseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UseCaseError";
  }
}
```

### Centralized Configuration

- Query keys management for React Query caching
- Error code standardization
- API endpoint configuration
- Authentication token handling

### Type Safety

- Comprehensive TypeScript interfaces
- Strict type checking across all layers
- API contract definitions

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form
- **HTTP Client**: Fetch API
- **Authentication**: JWT tokens with middleware

## Key Features

- **Book Management**: Catalog, search, and filter books
- **User Management**: Student and librarian account management
- **Book Borrowing**: Issue, return, and renew books
- **Overdue Tracking**: Monitor and manage overdue books
- **Dashboard Analytics**: Overview statistics for librarians and students
- **Profile Management**: User profile and reading history
- **Review System**: Book reviews and ratings
- **Bookmark System**: Save favorite books

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Geist, a new font family for Vercel.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run check` - Check code formatting

## Brand Customization

Each school can brand the app without touching the codebase by editing a single configuration file.

1. Update metadata and theme tokens in `src/config/school.config.json`. This controls site titles, Open Graph cards, favicon paths, and all color tokens used in Tailwind utilities.
2. (Optional) Replace assets referenced in the config (for example, `/assets/branding/og-image.png`) inside `public/assets/branding`.
3. Run `npm run dev` or `npm run build`. Both commands automatically execute `scripts/generate-theme.js`, which regenerates `src/config/generated-theme.css` from the JSON file.
4. If you tweak the config while the dev server is running, rerun `node scripts/generate-theme.js` (or restart the dev server) so the CSS variables refresh.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (authenticated)/   # Protected routes
│   └── globals.css        # Global styles
├── core/                  # Core utilities and configurations
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Core libraries and utilities
│   └── presentation/     # Shared presentation components
├── modules/              # Feature modules
│   ├── AllBooks/        # Book catalog feature
│   ├── Authentication/  # Login/signup functionality
│   ├── Librarian/       # Librarian-specific features
│   ├── Student/         # Student-specific features
│   └── [Feature]/       # Additional features
└── middleware.ts         # Authentication middleware
```

## Implementation Guidelines

### Implementation Flow

Components → Repository → Application → Route

### Detailed Implementation Flow

#### 1. Domain Layer First

Define business entities and contracts:

```typescript
// Define business entities and contracts
export interface BookEntity {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  // ... other properties
}

export interface IBookRepository {
  getBooks(filters?: BookFilters): Promise<BooksResponse>;
  createBook(book: CreateBookRequest): Promise<BookEntity>;
}
```

#### 2. Infrastructure Layer

Implement repository interfaces:

```typescript
// Implement repository interfaces
export class BookRepository implements IBookRepository {
  async getBooks(filters?: BookFilters): Promise<BooksResponse> {
    const response = await fetch("/api/books", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("authToken")}`,
        "Content-Type": "application/json",
      },
    });
    // ... implementation
  }
}
```

#### 3. Application Layer

Create use cases with React Query integration:

```typescript
// Create use cases with React Query integration
export class GetBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(filters?: BookFilters): Promise<BooksResponse> {
    try {
      return await this.bookRepository.getBooks(filters);
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new UseCaseError("Failed to fetch books");
      }
      throw error;
    }
  }
}

export const useBooks = (filters?: BookFilters) => {
  return useQuery({
    queryKey: [QueryKeys.BOOKS, filters],
    queryFn: () => new GetBooksUseCase(new BookRepository()).execute(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
```

#### 4. Presentation Layer

Create React components:

```typescript
// Create React components
export const BookList: React.FC = () => {
  const { data: books, isLoading, error } = useBooks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {books?.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
```

#### 5. API Routes

Create API endpoints:

```typescript
// Create API endpoints
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const backendUrl = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`);
  backendUrl.searchParams.append("page", page);

  const response = await fetch(backendUrl, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status ${response.status}`);
  }

  const data = await response.json();
  return NextResponse.json(data);
}
```

### Best Practices for New Features

#### Module Structure

```
src/modules/[NewFeature]/
├── domain/
│   ├── entities/
│   │   ├── [feature]Entity.ts
│   │   └── [feature]Request.ts
│   └── repositories/
│       └── I[Feature]Repository.ts
├── application/
│   └── [feature]UseCase.ts
├── infra/
│   └── repositories/
│       └── [feature]Repository.ts
└── presentation/
    └── components/
        ├── [Feature]List.tsx
        ├── [Feature]Form.tsx
        └── [Feature]Card.tsx
```

#### Naming Conventions

- **Use case classes**: `GetBooksUseCase`, `CreateBookUseCase`
- **Repository interfaces**: `IBookRepository`, `IUserRepository`
- **React Query hooks**: `useBooks`, `useCreateBook`
- **Components**: `BookList`, `BookCard`, `BookForm`

#### Error Handling

- Use appropriate error types for each layer
- Provide meaningful error messages
- Handle errors gracefully in UI components

#### State Management

- Use React Query for server state
- Implement proper loading and error states
- Utilize query invalidation for cache management

#### Authentication and Authorization

- Implement middleware for route protection
- Use JWT tokens for API authentication
- Handle token refresh and expiration

#### Component Design

- Create reusable, composable components
- Use TypeScript for prop validation
- Implement proper loading and error states
- Follow accessibility best practices

## Development Guidelines

### File Organization Tips

- Group related functionality in the same module
- Keep components small and focused on single responsibilities
- Use index files for clean imports
- Separate concerns between business logic and presentation
- Implement proper error boundaries for better error handling

### Code Quality

- Follow TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Maintain comprehensive error handling
- Implement proper loading states

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Open Source Contributions

We welcome fixes and enhancements! To contribute:

- Fork the repository and create a feature branch (`git checkout -b feature/your-change`).
- Keep changes focused; add tests or updates to the config docs when relevant.
- Run `npm run format` (and `npm run lint` once ESLint is configured) before opening a pull request.
- Explain the motivation and testing in your PR description so reviewers can validate behavior quickly.

For larger ideas, please open an issue first so we can collaborate on the approach.

> Built by Deerwalk R&D :))
