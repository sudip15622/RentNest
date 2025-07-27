import z from "zod";
import { RoomType } from "generated/prisma";

export const FilterListingSchema = z
  .object({
    // search text
    searchText: z.string().optional(),
    // Location filters
    city: z.string().optional(),
    district: z.string().optional(),

    // Property filters
    roomType: z.enum(RoomType).optional(),
    minBedrooms: z.coerce.number().min(1).optional(),
    maxBedrooms: z.coerce.number().min(1).optional(),
    minBathrooms: z.coerce.number().min(1).optional(),
    maxBathrooms: z.coerce.number().min(1).optional(),

    // Price filters
    minRent: z.coerce.number().min(0).optional(),
    maxRent: z.coerce.number().min(0).optional(),
    
    // Amenities filter
    amenities: z.preprocess(
      (val) => {
        if (typeof val === 'string') {
          return val.split(',').map(item => item.trim()).filter(item => item.length > 0);
        }
        return val;
      },
      z.array(z.string()).optional()
    ), // Array of amenity names
    
    // Utilities filters
    utilitiesIncluded: z.coerce.boolean().optional(),
    internetIncluded: z.coerce.boolean().optional(),

    // Availability filters
    availableFrom: z.string().optional(), // Date string
    
    // Pagination
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    
    // Sorting
    sortBy: z.enum(['createdAt', 'monthlyRent', 'viewCount']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict();

export type FilterListingDto = z.infer<typeof FilterListingSchema>;
