// Frontend filter types that match the backend FilterListingSchema
export interface ListingFilterState {
  // search text
  searchText?: string
  // Location filters
  city?: string;
  district?: string;

  // Property filters
  roomType?: "single" | "double" | "master" | "studio" | "shared";
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;

  // Price filters
  minRent?: number;
  maxRent?: number;
  
  // Amenities filter
  amenities?: string[];
  
  // Utilities filters
  utilitiesIncluded?: boolean;
  internetIncluded?: boolean;

  // Availability filters
  availableFrom?: string; // Date string
  
  // Pagination
  page?: number;
  limit?: number;
  
  // Sorting
  sortBy?: "createdAt" | "monthlyRent" | "viewCount";
  sortOrder?: "asc" | "desc";
}

// Room type options matching the backend enum
export const ROOM_TYPES = [
  { value: "single" as const, label: "Single Room" },
  { value: "double" as const, label: "Double Room" },
  { value: "master" as const, label: "Master Room" },
  { value: "studio" as const, label: "Studio" },
  { value: "shared" as const, label: "Shared Room" },
] as const;

// Sort options matching the backend schema
export const SORT_OPTIONS = [
  { id: "latest", value: "createdAt", order: "desc", label: "Latest" },
  { id: "price_low", value: "monthlyRent", order: "asc", label: "Price: Low to High" },
  { id: "price_high", value: "monthlyRent", order: "desc", label: "Price: High to Low" },
  { id: "popular", value: "viewCount", order: "desc", label: "Most Popular" },
] as const;

// Common amenities
export const AMENITIES = [
  { value: "wifi", label: "WiFi" },
  { value: "parking", label: "Parking" },
  { value: "tv", label: "TV" },
  { value: "ac", label: "AC/Heater" },
  { value: "kitchen", label: "Kitchen Access" },
  { value: "laundry", label: "Laundry" },
  { value: "furnished", label: "Furnished" },
  { value: "security", label: "Security" },
] as const;

// Major cities in Nepal
export const NEPAL_CITIES = [
  "Thamel",
  "Lakeside",
  "Bharatpur",
  "Butwal",
  "Biratnagar",
  "Janakpur",
  "Nepalgunj",
  "Dharan",
  "Hetauda",
  "Itahari",
] as const;
