import z from "zod";

export const UpdateUserSchema = z
  .object({
    name: z.string().min(1, {message: "Full name is Required!"}).regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {message: "Name must contain only letters and a single space between words!"}).optional(),
    email: z.string().min(1, {message: "Email is required!"}).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email address!"}).optional(),
    image: z.string().optional(),
    phoneNumber: z.string().min(1, {error: "Phone number is required!"}).regex(/^(98|97)[0-9]{8}$/, {error: "Invalid phone number!"}).optional(),
    propertyAddress: z.string().min(10, {error: "Property address must be at least 10 characters"}).optional(),
    citizenshipNumber: z.string().min(1, {error: "Citizenship number is Required!"}).regex(/^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{5}$/, {error: "Citizenship number format: XX-XX-XX-XXXXX"}).optional(),
  })
  .strict();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;