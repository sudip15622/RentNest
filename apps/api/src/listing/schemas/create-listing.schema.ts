import z from 'zod';
import { LeaseDuration, RoomType, ListingStatus } from 'generated/prisma';

export const CreateListingSchema = z
  .object({
    // Basic Information
    title: z
      .string()
      .min(1, { error: 'Room title is required!' })
      .max(100, { error: 'Title must be less than 100 characters!' }),
    description: z
      .string()
      .min(20, { error: 'Description must be at least 20 characters!' }),
    location: z.string().min(5, { error: 'Please enter a complete address!' }),
    roomType: z.enum(RoomType),
    bedrooms: z.number().min(1),
    bathrooms: z.number().min(1),
    floorArea: z.string().optional(), // eg: 120 sq ft
    amenities: z.array(z.string()),
    extraAmenities: z.string().optional(),

    // Photos - URLs from Cloudinary
    photos: z
      .array(z.string())
      .min(1, { error: 'At least one photo is required' }),
    mainPhotoIndex: z.number().int().min(0).default(0), // Added to match Prisma

    // Pricing & Availability
    monthlyRent: z
      .number()
      .min(1000, { error: 'Minimum rent should be Rs. 1,000' })
      .max(100000, { error: 'Maximum rent should be Rs. 100,000' }),
    securityDeposit: z
      .number()
      .min(0, { error: 'Security deposit cannot be negative' })
      .max(200000, { error: 'Maximum security deposit should be Rs. 200,000' }),
    availableFrom: z
      .string()
      .min(1, { error: 'Available from date is required' })
      .transform((str) => new Date(str)), // Convert string to DateTime for Prisma
    leaseDuration: z.enum(LeaseDuration),
    utilitiesIncluded: z.boolean().default(false), // Changed to boolean to match Prisma
    internetIncluded: z.boolean().default(false),  // Changed to boolean to match Prisma
    specialTerms: z.string().optional(),

    // Listing Status & Metadata (optional for create, will use defaults)
    status: z.enum(ListingStatus).default(ListingStatus.draft).optional(),
    isActive: z.boolean().default(true).optional(),
  })
  .strict();

export type CreateListingDto = z.infer<typeof CreateListingSchema>;
