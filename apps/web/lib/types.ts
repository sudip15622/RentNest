
import {z} from 'zod';

export type CustomFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
} | undefined;

export const SignupFormSchema = z
  .object({
    name: z.string().min(1, {message: "Full name is Required!"}).regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {message: "Name must contain only letters and a single space between words!"}).trim(),
    email: z.string().min(1, {message: "Email is required!"}).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email address!"}).trim(),
    password: z.string().min(8, {message: "Password must be 8 character long!"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {message: "Password must contain atleast one uppercase, lowercase, number, special character!"}),
  })
  .strict();

export type SignupFormType = z.infer<typeof SignupFormSchema>;

export const LoginFormSchema = z
  .object({
    email: z.string().min(1, {message: "Email is required!"}).trim(),
    password: z.string().min(1, {message: "Password is required!"}),
  })
  .strict();

export type LoginFormType = z.infer<typeof LoginFormSchema>;