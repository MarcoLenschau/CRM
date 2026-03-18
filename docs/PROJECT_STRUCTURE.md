# Project Structure

A short overview of the repository layout.

```
CRM/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── event/             # Event management endpoints
│   │   ├── customer/          # Customer management endpoints
│   │   ├── user/              # User management endpoints
│   │   └── log/               # Audit log endpoints
│   ├── components/             # React components
│   ├── models/                 # MongoDB models
│   ├── interfaces/             # TypeScript interfaces
│   ├── enums/                  # Enumeration types
│   ├── utils/                  # Utility functions
│   ├── calendar/               # Calendar page
│   ├── customers/              # Customers page
│   ├── dashboard/              # Dashboard page
│   ├── users/                  # Users management page
│   ├── log/                    # Audit log page
│   ├── settings/               # Settings page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── db.ts                   # Database initialization
│   └── globals.scss            # Global styles
├── public/                      # Static assets
├── .env.local                   # Environment variables (DO NOT COMMIT)
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── next.config.ts               # Next.js configuration
├── middleware.ts                # Next.js middleware
├── docker-compose.yml           # Docker Compose configuration
└── README.md                    # This file
```

For more details about API routes, authentication, and models, see the other docs in this folder.