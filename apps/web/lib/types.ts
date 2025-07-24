import { z } from "zod";

export type CustomFormState =
  | {
      success: true;
    }
  | {
      success: false;
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { error: "Full name is Required!" })
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
        error:
          "Name must contain only letters and a single space between words!",
      })
      .trim(),
    email: z
      .string()
      .min(1, { error: "Email is required!" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        error: "Invalid email address!",
      })
      .trim(),
    password: z
      .string()
      .min(8, { error: "Password must be 8 character long!" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        error:
          "Password must contain atleast one uppercase, lowercase, number, special character!",
      }),
    phoneNumber: z
      .string()
      .min(1, { error: "Phone number is required!" })
      .regex(/^(98|97)[0-9]{8}$/, { error: "Invalid phone number!" }),
    propertyAddress: z
      .string()
      .min(10, { error: "Property address must be at least 10 characters" }),
    citizenshipNumber: z
      .string()
      .min(1, { error: "Citizenship number is Required!" })
      .regex(/^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{5}$/, {
        error: "Citizenship number format: XX-XX-XX-XXXXX",
      }),
    isVerified: z.boolean({ error: "You must confirm ownership to proceed" }),
  })
  .strict();

export type SignupFormType = z.infer<typeof SignupFormSchema>;

export const LoginFormSchema = z
  .object({
    email: z.string().min(1, { error: "Email is required!" }).trim(),
    password: z.string().min(1, { error: "Password is required!" }),
  })
  .strict();

export type LoginFormType = z.infer<typeof LoginFormSchema>;

// Update CreateListingSchema to match frontend form structure
export const CreateListingSchema = z
  .object({
    // Basic Information - matches frontend form
    title: z
      .string()
      .min(1, { error: "Room title is required!" })
      .max(100, { error: "Title must be less than 100 characters!" }),
    description: z
      .string()
      .min(20, { error: "Description must be at least 20 characters!" }),
    address: z.string().min(5, { error: "Please enter a complete address!" }),
    city: z.string().min(1, { error: "City/Area is required!" }),
    district: z.string().min(1, { error: "District is required!" }),
    roomType: z.string().min(1, { error: "Room type is required!" }),
    bedrooms: z.number().min(1, { error: "At least 1 bedroom is required!" }),
    bathrooms: z.number().min(1, { error: "At least 1 bathroom is required!" }),
    floorArea: z.string().optional(),
    amenities: z.array(z.string()),
    extraAmenities: z.string().optional(),

    // Photos - URLs after upload (not File objects)
    photos: z
      .array(z.string().url({ error: "Invalid photo URL" }))
      .min(1, { error: "At least one photo is required" })
      .max(10, { error: "Maximum 10 photos allowed" }),

    // Pricing & Availability
    monthlyRent: z
      .number()
      .min(1000, { error: "Minimum rent should be Rs. 1,000" })
      .max(100000, { error: "Maximum rent should be Rs. 100,000" }),
    securityDeposit: z
      .number()
      .min(0, { error: "Security deposit cannot be negative" })
      .max(200000, { error: "Maximum security deposit should be Rs. 200,000" }),
    availableFrom: z
      .string()
      .min(1, { error: "Available from date is required" }),
    leaseDuration: z.string().min(1, { error: "Lease duration is required!" }),
    utilitiesIncluded: z
      .string()
      .min(1, { error: "Utilities option is required!" }),
    internetIncluded: z
      .string()
      .min(1, { error: "Internet option is required!" }),
    specialTerms: z.string().optional(),
    minimumStay: z.string().optional(),
    rules: z.string().optional(),
    preferences: z.string().optional(),
  })
  .strict();

export type CreateListingType = z.infer<typeof CreateListingSchema>;
