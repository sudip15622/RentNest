"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { SignupFormType } from "../../../lib/types";
import { handleSignup } from "../../../lib/auth";
import InputWithoutLabel from "../../../components/ui/InputWithoutLabel";
import { useToast } from "../../../contexts/ToastContext";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import {FaShieldAlt} from 'react-icons/fa';

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/login";
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      propertyAddress: "",
      citizenshipNumber: "",
      isVerified: false,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    if (isSubmitting) return;
    if (!isValid) return;
    const response = await handleSignup(data);

    if(!response) {
      toast("Something went wrong, Please try again!", "error");
      return
    }

    if(response.success) {
      toast("Signup successful!", "success");
      router.push(redirectTo);
    } else {
      if (response?.errors) {
        // Iterate through each error field and set the error
        Object.entries(response.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages?.length > 0) {
            // Only set error if field exists in our signup form
            if (["name", "email", "password", "phoneNumber", "propertyAddress", "citizenshipNumber", "isVerified"].includes(field)) {
              setError(field as keyof SignupFormType, {
                type: "server",
                message: messages[0], // Show the first error message
              });
            }
          }
        });

        return;
      }

      if (response.message) {
        toast(response.message, "error");
        return;
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-6 bg-white p-8 rounded-lg shadow-lg border border-[var(--border)]"
      >
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="border-b border-[var(--border)] pb-4">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Personal Information
            </h3>
            <p className="text-sm text-[var(--foreground-sec)]">
              Tell us about yourself
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Full name is required!",
                pattern: {
                  value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                  message:
                    "Name must contain only letters and a single space between words!",
                },
              }}
              render={({ field, fieldState }) => (
                <InputWithoutLabel
                  field={field}
                  error={fieldState.error}
                  placeholder="Enter your full name"
                  type="text"
                />
              )}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email address is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address!",
                },
              }}
              render={({ field, fieldState }) => (
                <InputWithoutLabel
                  field={field}
                  error={fieldState.error}
                  placeholder="your.email@example.com"
                  type="email"
                />
              )}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required!",
                pattern: {
                  value: /^(98|97)[0-9]{8}$/,
                  message: "Invalid phone number! Must start with 98 or 97 and be 10 digits",
                },
              }}
              render={({ field, fieldState }) => (
                <InputWithoutLabel
                  field={field}
                  error={fieldState.error}
                  placeholder="98XXXXXXXX"
                  type="tel"
                />
              )}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long!",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, number, and special character!",
                },
              }}
              render={({ field, fieldState }) => (
                <InputWithoutLabel
                  field={field}
                  error={fieldState.error}
                  placeholder="Create a strong password"
                  type="password"
                />
              )}
            />
          </div>
        </div>

        {/* Property Information Section */}
        <div className="space-y-6">
          <div className="border-b border-[var(--border)] pb-4">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Property & Verification
            </h3>
            <p className="text-sm text-[var(--foreground-sec)]">
              Property details and identity verification
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Property Address <span className="text-red-500">*</span>
            </label>
            <Controller
              name="propertyAddress"
              control={control}
              rules={{
                required: "Property address is required!",
                minLength: {
                  value: 10,
                  message: "Property address must be at least 10 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <InputWithoutLabel
                  field={field}
                  error={fieldState.error}
                  placeholder="Street, Ward, Municipality/VDC"
                  type="text"
                />
              )}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Citizenship Number <span className="text-red-500">*</span>
            </label>
            <Controller
              name="citizenshipNumber"
              control={control}
              rules={{
                required: "Citizenship number is required!",
                pattern: {
                  value: /^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{5}$/,
                  message: "Citizenship number format: XX-XX-XX-XXXXX",
                },
              }}
              render={({ field, fieldState }) => (
                <InputWithoutLabel
                  field={field}
                  error={fieldState.error}
                  placeholder="XX-XX-XX-XXXXX"
                  type="text"
                />
              )}
            />
          </div>

          {/* Verification Checkbox */}
          <div className="mb-6">
            <Controller
              name="isVerified"
              control={control}
              rules={{
                required: "You must confirm ownership to proceed",
              }}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="isVerified"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-1 h-4 w-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
                    />
                    <label htmlFor="isVerified" className="text-sm text-[var(--foreground)] leading-5">
                      I confirm that I am the legal owner of the property mentioned above and 
                      have the right to rent it out. I understand that providing false information 
                      may result in account termination.
                    </label>
                  </div>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-[var(--border)]">
          <Button 
            isSubmitting={isSubmitting} 
            type="submit"
          >
            {isSubmitting ? "Creating Account..." : "Become a Landlord"}
          </Button>
          
          <p className="flex items-center gap-x-2 mx-auto text-center w-fit text-sm text-[var(--primary)] mt-4 py-1 px-4 bg-[var(--primary-light)] rounded-full">
            <span className="flex items-center justify-center"><FaShieldAlt /></span>
            <span>Your data is encrypted.</span>
          </p>
          <p className="text-center text-sm text-[var(--foreground-sec)] mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--primary)] font-bold hover:text-[var(--primary-dark)] transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
