# 🚀 RentNest API - NestJS Backend

The backend API for RentNest, a comprehensive room rental platform built with NestJS, Prisma, and PostgreSQL.

## 🌟 Features

### 🔐 **Authentication & Authorization**
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for users
- **Phone Number Verification**: Enhanced security with OTP (planned)
- **Password Hashing**: Secure password storage with bcrypt

### 🏠 **Listing Management**
- **CRUD Operations**: Complete listing management system
- **Soft Delete**: Listings can be hidden/restored without permanent deletion
- **Status Management**: Active/inactive status with toggle functionality
- **Image Upload**: Multiple image support with Cloudinary integration
- **Advanced Filtering**: Search by location, price, room type, amenities

### 💬 **Inquiry System**
- **Direct Communication**: Tenants can inquire about properties
- **Inquiry Management**: Property owners can view and respond to inquiries
- **Status Tracking**: Track inquiry status (pending, responded, closed)
- **Email Notifications**: Automated notifications (planned)

### 📊 **Analytics & Reporting**
- **Dashboard Statistics**: User listing counts, inquiry metrics
- **Performance Tracking**: Listing views, inquiry rates
- **Data Export**: Export data for analysis (planned)

## 🛠️ Tech Stack

- **Framework**: NestJS (Node.js framework)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma with generated client
- **Authentication**: JWT + Passport strategies
- **Validation**: Zod schema validation
- **File Upload**: Cloudinary integration
- **Documentation**: Swagger/OpenAPI (planned)

## 🏗️ Project Structure

```
apps/api/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── decorators/       # Custom decorators
│   │   ├── guards/           # Auth guards
│   │   ├── pipes/           # Validation pipes
│   │   ├── strategies/       # Passport strategies
│   │   └── types/           # Auth types
│   ├── listing/             # Listing management module
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── listing.controller.ts
│   │   ├── listing.service.ts
│   │   └── listing.module.ts
│   ├── inquiry/             # Inquiry management module
│   ├── user/                # User management module
│   ├── prisma/              # Prisma service module
│   ├── app.module.ts        # Root module
│   └── main.ts              # Application entry point
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── generated/
│   └── prisma/              # Generated Prisma client
├── test/                    # Test files
└── package.json             # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Cloudinary account for image uploads

### Environment Setup

Create `.env` file in the root of this app:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rentnest"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# App Configuration
PORT=4000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL="http://localhost:3000"
```

### Installation & Development

```bash
# Install dependencies (from monorepo root)
npm install

# Setup database
npx prisma migrate dev --name init
npx prisma generate

# Start development server
npm run dev:api

# Or run from root
npm run dev
```

The API will be available at [http://localhost:4000](http://localhost:4000)

## 📝 Available Scripts

```bash
# Development
npm run start:dev        # Start in development mode
npm run start:debug      # Start in debug mode
npm run start:prod       # Start in production mode

# Building
npm run build            # Build the application
npm run start            # Start built application

# Database
npx prisma migrate dev   # Run migrations
npx prisma generate      # Generate Prisma client
npx prisma studio        # Open Prisma Studio
npx prisma reset         # Reset database

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run end-to-end tests
npm run test:cov         # Run tests with coverage

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
```

## 🔧 API Endpoints

### 🔐 Authentication Routes

```http
POST   /auth/register     # User registration
POST   /auth/login        # User login
POST   /auth/logout       # User logout
GET    /auth/profile      # Get user profile
PUT    /auth/profile      # Update user profile
```

### 🏠 Listing Routes

```http
# Public Routes
GET    /listing/filter           # Get filtered listings
GET    /listing/featured         # Get featured listings
GET    /listing/:id              # Get listing by ID

# Protected Routes
POST   /listing/create           # Create new listing
GET    /listing/my-listings      # Get user's listings
GET    /listing/:id/edit         # Get listing for editing
PUT    /listing/:id              # Update listing
PUT    /listing/:id/toggle-status # Toggle listing status
PUT    /listing/:id/restore      # Restore deleted listing
DELETE /listing/:id              # Delete listing (soft/hard)
```

### 💬 Inquiry Routes

```http
POST   /inquiry/create           # Create inquiry
GET    /inquiry/my-inquiries     # Get user's inquiries
GET    /inquiry/listing/:id      # Get inquiries for listing
PUT    /inquiry/:id              # Update inquiry status
DELETE /inquiry/:id              # Delete inquiry
```

### 📊 User Routes

```http
GET    /user/profile             # Get user profile
PUT    /user/profile             # Update user profile
GET    /user/dashboard-stats     # Get dashboard statistics
```

## 📋 Request/Response Examples

### Create Listing
```http
POST /listing/create
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Spacious Single Room in Thamel",
  "description": "Beautiful room with mountain view...",
  "location": "Thamel, Kathmandu",
  "roomType": "single",
  "bedrooms": 1,
  "bathrooms": 1,
  "floorArea": "200 sq ft",
  "amenities": ["wifi", "parking", "kitchen"],
  "extraAmenities": "Balcony with mountain view",
  "photos": ["url1", "url2", "url3"],
  "monthlyRent": 15000,
  "securityDeposit": 30000,
  "availableFrom": "2024-01-15T00:00:00.000Z",
  "leaseDuration": "yearly",
  "utilitiesIncluded": true,
  "internetIncluded": true,
  "specialTerms": "No smoking, no pets"
}
```

### Response
```json
{
  "success": true,
  "message": "Listing created successfully",
  "data": {
    "id": "uuid-string",
    "title": "Spacious Single Room in Thamel",
    "ownerId": "owner-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    // ... other listing fields
  }
}
```

### Filter Listings
```http
GET /listing/filter?location=Kathmandu&minPrice=10000&maxPrice=25000&roomType=single&amenities=wifi,parking
```

## 🗄️ Database Schema

### Core Models

```prisma
model User {
  id                String   @id @default(uuid())
  name              String
  email             String   @unique
  password          String
  phoneNumber       String   @unique
  citizenshipNumber String
  propertyAddress   String
  isVerified        Boolean  @default(false)
  image             String   @default("/default_user.png")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  listings Listing[]
}

model Listing {
  id                String      @id @default(uuid())
  title             String
  description       String
  location          String
  roomType          RoomType
  bedrooms          Int
  bathrooms         Int
  floorArea         String?
  amenities         String[]
  extraAmenities    String?
  photos            String[]
  mainPhotoIndex    Int         @default(0)
  monthlyRent       Float
  securityDeposit   Float
  availableFrom     DateTime
  leaseDuration     LeaseDuration
  utilitiesIncluded Boolean     @default(false)
  internetIncluded  Boolean     @default(false)
  specialTerms      String?
  status            ListingStatus @default(active)
  isActive          Boolean     @default(true)
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  owner             User        @relation(fields: [ownerId], references: [id])
  ownerId           String
  inquiries         Inquiry[]
}

model Inquiry {
  id          String        @id @default(uuid())
  message     String
  phoneNumber String
  email       String
  name        String
  status      InquiryStatus @default(pending)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  listing     Listing       @relation(fields: [listingId], references: [id], onDelete: Cascade)
  listingId   String
}
```

## 🔐 Authentication & Security

### JWT Implementation
```typescript
// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

### Guards & Decorators
```typescript
// Public route decorator
@Public()
@Get('featured')
getFeaturedListings() { }

// Protected route (default)
@Get('my-listings')
getUserListings(@Request() req: any) { }
```

### Validation with Zod
```typescript
// Schema definition
export const CreateListingSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(20),
  monthlyRent: z.number().min(1000).max(500000),
  // ... other fields
});

// Usage in controller
@Post('create')
createListing(
  @Body(new ZodValidationPipe(CreateListingSchema)) 
  createListingDto: CreateListingDto
) { }
```

## 📊 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/listing/create"
}
```

### Common HTTP Status Codes
- **200** - Success
- **201** - Created
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **409** - Conflict (duplicate data)
- **500** - Internal Server Error

## 🔄 Data Flow

### Listing Creation Flow
1. **Frontend** sends listing data
2. **Validation** with Zod schema
3. **Authentication** check via JWT
4. **Image Upload** to Cloudinary
5. **Database** save via Prisma
6. **Response** with created listing

### Inquiry Flow
1. **Tenant** submits inquiry
2. **Validation** and spam checking
3. **Database** save inquiry
4. **Notification** to property owner (planned)
5. **Response** confirmation

## 🧪 Testing

### Unit Tests
```bash
npm run test              # Run all unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run with coverage report
```

### E2E Tests
```bash
npm run test:e2e          # Run end-to-end tests
```

### Test Structure
```
test/
├── unit/
│   ├── listing.service.spec.ts
│   ├── auth.service.spec.ts
│   └── inquiry.service.spec.ts
└── e2e/
    ├── auth.e2e-spec.ts
    ├── listing.e2e-spec.ts
    └── inquiry.e2e-spec.ts
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL="postgresql://prod-user:password@prod-host:5432/rentnest"
JWT_SECRET="super-secure-production-secret"
CLOUDINARY_CLOUD_NAME="production-cloud-name"
# ... other production configs
```

### Database Migration in Production
```bash
npx prisma migrate deploy
npx prisma generate
```

## 📈 Performance & Optimization

### Database Optimization
- **Indexing**: Optimized indexes for search queries
- **Connection Pooling**: Prisma connection pooling
- **Query Optimization**: Efficient Prisma queries

### Caching Strategy
- **Redis** for session storage (planned)
- **Query Caching** for frequently accessed data
- **CDN** for static assets

### Monitoring
- **Health Checks**: `/health` endpoint
- **Logging**: Structured logging with Winston (planned)
- **Metrics**: Performance monitoring (planned)

## 🔗 Related Documentation

- [Frontend Documentation](../web/README.md)
- [Database Schema](./prisma/schema.prisma)
- [NestJS Documentation](https://nestjs.com/)
- [Prisma Documentation](https://prisma.io/docs)

---

**Built with 🚀 using NestJS and TypeScript**
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
