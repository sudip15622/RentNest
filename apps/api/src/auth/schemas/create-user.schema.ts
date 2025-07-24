import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    name: z.string().min(1, {message: "Full name is Required!"}).regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {message: "Name must contain only letters and a single space between words!"}),
    email: z.string().min(1, {message: "Email is required!"}).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email address!"}),
    image: z.string().optional(),
    password: z.string().min(8, {message: "Password must be 8 character long!"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {message: "Password must contain atleast one uppercase, lowercase, number, special character!"}),
    phoneNumber: z.string().min(1, {error: "Phone number is required!"}).regex(/^(98|97)[0-9]{8}$/, {error: "Invalid phone number!"}),
    propertyAddress: z.string().min(10, {error: "Property address must be at least 10 characters"}),
    citizenshipNumber: z.string().min(1, {error: "Citizenship number is Required!"}).regex(/^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{5}$/, {error: "Citizenship number format: XX-XX-XX-XXXXX"}),
    isVerified: z.boolean({error: "You must confirm ownership to proceed"}),
  })
  .strict();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
