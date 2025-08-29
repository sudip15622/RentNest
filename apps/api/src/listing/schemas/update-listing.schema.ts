import z from 'zod';
import { LeaseDuration, RoomType, ListingStatus } from 'generated/prisma';

export const UpdateListingSchema = z
  .object({
    // Basic Information
    title: z
      .string()
      .min(1, { error: 'Room title is required!' })
      .max(100, { error: 'Title must be less than 100 characters!' })
      .optional(),
    description: z
      .string()
      .min(20, { error: 'Description must be at least 20 characters!' })
      .optional(),
    location: z.string().min(5, { error: 'Please enter a complete address!' }).optional(),
    roomType: z.enum(RoomType).optional(),
    bedrooms: z.number().min(1).optional(),
    bathrooms: z.number().min(1).optional(),
    floorArea: z.string().optional(),
    amenities: z.array(z.string()).optional(),
    extraAmenities: z.string().optional(),

    // Photos - URLs from Cloudinary
    photos: z
      .array(z.string())
      .min(1, { error: 'At least one photo is required' })
      .optional(),
    mainPhotoIndex: z.number().int().min(0).optional(),

    // Pricing & Availability
    monthlyRent: z
      .number()
      .min(1000, { error: 'Minimum rent should be Rs. 1,000' })
      .max(100000, { error: 'Maximum rent should be Rs. 100,000' })
      .optional(),
    securityDeposit: z
      .number()
      .min(0, { error: 'Security deposit cannot be negative' })
      .max(200000, { error: 'Maximum security deposit should be Rs. 200,000' })
      .optional(),
    availableFrom: z
      .string()
      .min(1, { error: 'Available from date is required' })
      .transform((str) => new Date(str))
      .optional(),
    leaseDuration: z.enum(LeaseDuration).optional(),
    utilitiesIncluded: z.boolean().optional(),
    internetIncluded: z.boolean().optional(),
    specialTerms: z.string().optional(),

    // Listing Status & Metadata
    status: z.enum(ListingStatus).optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export type UpdateListingDto = z.infer<typeof UpdateListingSchema>;
