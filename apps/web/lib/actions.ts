"use server";

import { BACKEND_URL } from "./constants";
import { Listing } from "./types";
import {
  CustomFormState,
  CreateListingType,
  CreateListingSchema,
  CreateInquiryType,
  CreateInquirySchema,
} from "./types";
import { formatZodErrors } from "./utils";
import { authFetch } from "./authFetch";

export const getProfile = async () => {
  const response = await authFetch(`${BACKEND_URL}/user/profile`);
  const result = await response.json();
  return result;
};

// Remove the uploadToCloudinary function and simplify createListing
export const createListing = async (
  details: CreateListingType
): Promise<CustomFormState> => {
  // Step 1: Validate using frontend schema structure
  const validationFields = CreateListingSchema.safeParse(details);

  if (!validationFields.success) {
    return {
      success: false,
      errors: formatZodErrors(validationFields.error),
    };
  }

  try {
    // Helper function to map lease duration labels to enum values
    const mapLeaseDuration = (leaseDuration: string): string => {
      const mapping: Record<string, string> = {
        "Monthly": "monthly",
        "Quarterly (3 months)": "quarterly", 
        "Biannually (6 months)": "biannually",
        "Yearly": "yearly",
        "Flexible": "flexible",
      };
      return mapping[leaseDuration] || "flexible";
    };

    // Helper function to map room type labels to enum values  
    const mapRoomType = (roomType: string): string => {
      const mapping: Record<string, string> = {
        "Single Room": "single",
        "Shared Room": "shared", 
        "Studio": "studio",
        "1BHK Apartment": "master",
        "Double Room": "double",
      };
      return mapping[roomType] || roomType.toLowerCase().replace(/\s+/g, "_");
    };

    // Step 2: Transform validated data to backend format
    const backendData = {
      title: validationFields.data.title,
      description: validationFields.data.description,
      location: `${validationFields.data.address}, ${validationFields.data.city}, ${validationFields.data.district}`, // Combine address fields
      roomType: mapRoomType(validationFields.data.roomType), // Use mapping function
      bedrooms: validationFields.data.bedrooms,
      bathrooms: validationFields.data.bathrooms,
      floorArea: validationFields.data.floorArea, // Keep as string to match expected type
      amenities: validationFields.data.amenities,
      extraAmenities: validationFields.data.extraAmenities,
      photos: validationFields.data.photos, // Already URLs from frontend
      mainPhotoIndex: 0, // Default to first photo
      monthlyRent: validationFields.data.monthlyRent,
      securityDeposit: validationFields.data.securityDeposit,
      availableFrom: validationFields.data.availableFrom,
      leaseDuration: mapLeaseDuration(validationFields.data.leaseDuration), // Use mapping function
      utilitiesIncluded:
        validationFields.data.utilitiesIncluded === "All utilities included" ||
        validationFields.data.utilitiesIncluded === "Some utilities included",
      internetIncluded:
        validationFields.data.internetIncluded === "Included in rent",
      specialTerms: [
        validationFields.data.specialTerms,
        validationFields.data.minimumStay
          ? `Minimum Stay: ${validationFields.data.minimumStay}`
          : "",
        validationFields.data.rules
          ? `Rules: ${validationFields.data.rules}`
          : "",
        validationFields.data.preferences
          ? `Preferences: ${validationFields.data.preferences}`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n"), // Combine extra fields
    };

    // Step 3: Send transformed data to backend
    const response = await authFetch(
      `${BACKEND_URL}/listing/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
      }
    );

    if (response.ok) {
      const result = await response.json();

      return {
        success: true
      }
    } else {
      return {
        success: false,
        message:
          response.status === 409
            ? "Listing already exists!"
            : response.statusText || "Something went wrong!",
      };
    }
  } catch (error) {
    console.error("Error creating listing:", error);
    
    // Handle authentication errors from clientAuthFetch
    if (error instanceof Error) {
      if (error.message.includes("No session found") || 
          error.message.includes("Please login")) {
        return {
          success: false,
          message: "Please login to create a listing",
        };
      }
      
      if (error.message.includes("Authentication failed") || 
          error.message.includes("Session expired")) {
        return {
          success: false,
          message: "Your session has expired. Please login again",
        };
      }
    }
    
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create listing",
    };
  }
};


export async function createInquiry(
  details: CreateInquiryType,
  listingId: string
): Promise<CustomFormState> {
  const validationFields = CreateInquirySchema.safeParse(details);

  if (!validationFields.success) {
    return {
      success: false,
      errors: formatZodErrors(validationFields.error)
    };
  }

  const response = await fetch(`${BACKEND_URL}/inquiry/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...validationFields.data,
      listingId: listingId
    }),
  });

  if (response.ok) {
    const result = await response.json();

    return {
      success: true
    }
  } else {
    return {
      success: false,
      message:
        response.status === 404 ? "Listing not found!" : response.statusText || "Something went wrong!",
    };
  }
}


export async function getFeaturedListings(): Promise<Listing[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/listing/featured?limit=6`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch featured listings:', response.statusText);
      return [];
    }
    const result = await response.json();
    // console.log(result);
    
    return result;
  } catch (error) {
    console.error('Error fetching featured listings:', error);
    return []; // Return empty array on error
  }
}