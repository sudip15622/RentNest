# 🌐 RentNest Frontend - Next.js Application

The frontend application for RentNest, a modern room rental platform built with Next.js 15, TypeScript, and Material-UI.

## 🚀 Features

### 🏠 **Core Functionality**
- **Property Listings**: Browse and search room listings with advanced filters
- **User Authentication**: Secure login/registration with JWT
- **Listing Management**: Complete CRUD operations for property owners
- **Inquiry System**: Direct communication between tenants and property owners
- **Responsive Design**: Mobile-first approach with excellent UX

### 🎨 **UI/UX Features**
- **Material-UI Components**: Consistent, professional design system
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth user experience with proper loading indicators
- **Form Validation**: Real-time validation with React Hook Form
- **Image Upload**: Drag-and-drop photo upload with preview

### 📱 **Pages & Routes**
- **`/`** - Homepage with featured listings
- **`/login`** - User authentication
- **`/signup`** - User registration
- **`/dashboard`** - User dashboard with tabs
- **`/listings`** - Browse all listings with filters
- **`/listings/[id]`** - Individual listing details
- **`/list-room/create`** - Create new listing (multi-step form)
- **`/list-room/edit/[id]`** - Edit existing listing

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + Material-UI
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API
- **HTTP Client**: Fetch API with auth wrapper
- **Image Upload**: Cloudinary integration
- **Icons**: React Icons (FontAwesome)

## 🏗️ Project Structure

```
apps/web/
├── app/                    # Next.js App Router
│   ├── api/               # API route handlers
│   ├── dashboard/         # Dashboard pages & components
│   ├── list-room/         # Listing creation/editing
│   ├── listings/          # Listing browsing & details
│   ├── login/             # Authentication pages
│   ├── signup/            
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── homepage/         # Homepage-specific components
│   ├── Footer.tsx        # Global footer
│   └── Navbar.tsx        # Global navigation
├── contexts/             # React contexts
│   └── ToastContext.tsx  # Toast notification system
├── lib/                  # Utilities & configurations
│   ├── actions.ts        # Server actions & API calls
│   ├── auth.ts           # Authentication utilities
│   ├── authFetch.ts      # Authenticated fetch wrapper
│   ├── constants.ts      # App constants
│   ├── session.ts        # Session management
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   ├── images/           # Image assets
│   └── favicon.ico
├── middleware.ts         # Next.js middleware for auth
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn
- Running backend API (see `../api/README.md`)

### Environment Setup

Create `.env.local` in the root of this app:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# App Configuration
NEXT_PUBLIC_APP_NAME=RentNest
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation & Development

```bash
# Install dependencies (from monorepo root)
npm install

# Start development server
npm run dev

# Or start only frontend
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

## 🔧 Key Components & Features

### Authentication System
```typescript
// lib/auth.ts - Authentication utilities
export const login = async (credentials: LoginCredentials)
export const register = async (userData: RegisterData)
export const logout = async ()

// middleware.ts - Route protection
export default function middleware(request: NextRequest)
```

### API Integration
```typescript
// lib/authFetch.ts - Authenticated API calls
export const authFetch = async (url: string, options?: RequestInit)

// lib/actions.ts - API action functions
export const getListings = async (filters: ListingFilters)
export const createListing = async (listingData: CreateListingData)
export const updateListing = async (id: string, data: UpdateListingData)
```

### Form Handling
```typescript
// React Hook Form with validation
const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(validationSchema)
})
```

### Toast Notifications
```typescript
// contexts/ToastContext.tsx
const { toast } = useToast()
toast("Success message!", "success")
toast("Error message!", "error")
```

### Image Upload System
```typescript
// Cloudinary integration with drag-and-drop
const uploadToCloudinary = async (files: FileList)
// Preview, validation, and progress tracking
```

## 🎨 UI Component Library

### Custom Components (`components/ui/`)
- **InputWithoutLabel** - Material-UI text input wrapper
- **SelectWithoutLabel** - Material-UI select wrapper  
- **TextareaWithoutLabel** - Material-UI textarea wrapper
- **Button** - Customized button component
- **Card** - Reusable card component

### Usage Example
```typescript
import InputWithoutLabel from '@/components/ui/InputWithoutLabel'

<Controller
  name="title"
  control={control}
  rules={{ required: "Title is required" }}
  render={({ field }) => (
    <InputWithoutLabel
      field={field}
      error={errors.title}
      placeholder="Enter listing title"
    />
  )}
/>
```

## 🔐 Authentication Flow

1. **Registration**: User submits form → API creates account → Auto-login
2. **Login**: Credentials → JWT token → HTTP-only cookie
3. **Protected Routes**: Middleware checks token → Redirect if unauthorized
4. **Session Management**: Token refresh on API calls

## 📱 Responsive Design

- **Mobile-first approach** with breakpoints
- **Tailwind CSS utilities** for responsive design
- **Material-UI Grid system** for layouts
- **CSS Modules** for component-specific styles

## 🔄 State Management

### Context Providers
- **ToastContext**: Global toast notifications
- **AuthContext**: User authentication state (planned)

### Local State
- **React Hook Form**: Form state management
- **useState/useEffect**: Component-level state
- **URL State**: Search parameters for filters

## 🚨 Error Handling

### API Error Handling
```typescript
try {
  const result = await apiCall()
  if (!result.success) {
    toast(result.message, "error")
  }
} catch (error) {
  toast("An unexpected error occurred", "error")
}
```

### Form Validation
```typescript
// Real-time validation with React Hook Form
rules={{
  required: "Field is required",
  minLength: { value: 5, message: "Minimum 5 characters" }
}}
```

## 🔧 Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic with Next.js App Router
- **Static Generation**: For public pages where possible
- **Lazy Loading**: For components and images
- **Caching**: API responses with appropriate cache headers

## 🧪 Testing (Planned)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Component tests
npm run test:components
```

## 🚀 Deployment

### Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables for Production
- Update `NEXT_PUBLIC_API_URL` to production API URL
- Configure Cloudinary for production
- Set secure cookie settings

## 🔗 Related Documentation

- [Backend API Documentation](../api/README.md)
- [UI Components](./components/ui/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)

---

**Built with ❤️ using Next.js and TypeScript**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
