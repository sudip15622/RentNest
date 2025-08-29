# 🏠 RentNest - Room Rental Service Platform

A modern, full-stack room rental platform built with Next.js, NestJS, and Prisma. RentNest connects property owners with potential tenants through a user-friendly interface with advanced search, inquiry management, and comprehensive listing features.

## 🌟 Features

### 🏡 **For Property Owners**
- **Complete Listing Management**: Create, edit, pause/activate, and delete room listings
- **Rich Media Support**: Upload multiple photos with drag-and-drop functionality
- **Advanced Pricing Options**: Set monthly rent, security deposits, and lease terms
- **Inquiry Management**: Receive and respond to tenant inquiries
- **Dashboard Analytics**: Track listing performance and inquiries
- **Listing Status Control**: Activate/deactivate listings as needed

### 🔍 **For Tenants**
- **Advanced Search & Filtering**: Search by location, price range, room type, and amenities
- **Interactive Listings**: View detailed photos, amenities, and property information
- **Direct Inquiry System**: Contact property owners directly through the platform
- **Responsive Design**: Seamless experience across desktop and mobile devices

### 🔐 **Authentication & Security**
- **JWT-based Authentication**: Secure login and registration system
- **Role-based Access Control**: Separate features for owners and tenants
- **Phone Number Verification**: Enhanced security with OTP verification
- **Session Management**: Persistent login sessions

### 🎨 **Modern UI/UX**
- **Material-UI Components**: Consistent, professional design system
- **Responsive Layout**: Mobile-first design approach
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth user experience with proper loading indicators

## 🏗️ Architecture

This is a **Turborepo monorepo** containing:

### 📁 Apps
- **`apps/web`** - Next.js 15 frontend application (Port 3000)
- **`apps/api`** - NestJS backend API (Port 4000)

### 📦 Packages
- **`packages/ui`** - Shared React component library
- **`packages/typescript-config`** - Shared TypeScript configurations
- **`packages/eslint-config`** - Shared ESLint configurations

## 🛠️ Tech Stack

### Frontend (`apps/web`)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + Material-UI
- **Forms**: React Hook Form with validation
- **State Management**: React Context API
- **Image Upload**: Cloudinary integration
- **Authentication**: JWT with HTTP-only cookies

### Backend (`apps/api`)
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Passport strategies
- **Validation**: Zod schema validation
- **File Upload**: Cloudinary integration
- **API Documentation**: Swagger (planned)

### Database & Infrastructure
- **Database**: PostgreSQL
- **ORM**: Prisma with generated client
- **Cloud Storage**: Cloudinary for image management
- **Development**: Turborepo for monorepo management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Cloudinary account for image uploads

### 1. Clone & Install
```bash
git clone https://github.com/sudip15622/RentNest.git
cd "Room Rental Service"
npm install
```

### 2. Environment Setup

Create `.env` files in both `apps/web` and `apps/api`:

**`apps/api/.env`**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/rentnest"
JWT_SECRET="your-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### 3. Database Setup
```bash
cd apps/api
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Start Development
```bash
# Install dependencies
npm install

# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:web    # Frontend only (localhost:3000)
npm run dev:api    # Backend only (localhost:4000)
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Database Studio**: `npx prisma studio` (from apps/api)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start all apps in development mode
npm run dev:web      # Start frontend only
npm run dev:api      # Start backend only

# Building
npm run build        # Build all apps for production
npm run build:web    # Build frontend only
npm run build:api    # Build backend only

# Database
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint on all packages
npm run type-check   # Run TypeScript type checking
```

## 🗂️ Project Structure

```
Room Rental Service/
├── apps/
│   ├── web/                 # Next.js Frontend
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── lib/           # Utilities and actions
│   │   └── public/        # Static assets
│   └── api/                # NestJS Backend
│       ├── src/           # Source code
│       ├── prisma/        # Database schema & migrations
│       └── generated/     # Generated Prisma client
├── packages/
│   ├── ui/                # Shared UI components
│   ├── typescript-config/ # Shared TypeScript configs
│   └── eslint-config/     # Shared ESLint configs
├── turbo.json             # Turborepo configuration
└── package.json           # Root package.json
```

## 🔧 Key Features Implementation

### Listing Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **Soft Delete**: Listings can be hidden/restored without permanent deletion
- **Status Management**: Active/inactive status with toggle functionality
- **Image Upload**: Multiple image support with Cloudinary integration

### Search & Filtering
- **Location-based Search**: Search by city, district, or address
- **Price Range Filtering**: Min/max price filtering
- **Room Type Filtering**: Single, double, studio, shared rooms
- **Amenity Filtering**: WiFi, parking, kitchen access, etc.

### User Authentication
- **Registration/Login**: Email and phone number based registration
- **JWT Authentication**: Secure token-based authentication
- **Session Management**: Persistent login sessions
- **Role-based Access**: Different permissions for owners and tenants

### Inquiry System
- **Direct Communication**: Tenants can inquire about properties
- **Inquiry Management**: Property owners can view and respond to inquiries
- **Status Tracking**: Track inquiry status (pending, responded, closed)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Sudip** - *Initial work* - [sudip15622](https://github.com/sudip15622)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NestJS team for the powerful backend framework
- Prisma team for the excellent ORM
- Material-UI for the component library
- Cloudinary for image management services

---

**Happy Renting! 🏠✨**

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
