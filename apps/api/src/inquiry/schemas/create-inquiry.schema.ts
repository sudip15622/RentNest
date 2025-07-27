import z from "zod";

export const CreateInquirySchema = z
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
    phoneNumber: z
      .string()
      .min(1, { error: "Phone number is required!" })
      .regex(/^(98|97)[0-9]{8}$/, { error: "Invalid phone number!" }),
    message: z
      .string()
      .min(10, { error: "Message must be at least 10 characters!" })
      .max(500, { error: "Message must be less than 500 characters!" }),
    listingId: z.string().min(1, { error: "Listing ID is required!" }),
  })
  .strict();

export type CreateInquiryDto = z.infer<typeof CreateInquirySchema>;