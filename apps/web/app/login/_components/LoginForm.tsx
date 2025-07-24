"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginFormType } from "../../../lib/types";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { handleLogin } from "../../../lib/auth";
import InputWithoutLabel from "../../../components/ui/InputWithoutLabel";
import { useToast } from "../../../contexts/ToastContext";
import Button from "../../../components/ui/Button";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    if (isSubmitting) return;
    if (!isValid) return;
    const response = await handleLogin(data);

    if(!response) {
      toast("Something went wrong, Please try again!", "error");
      return;
    }
    if(response.success){
      toast("Login successful!, redirecting...", "success");
      router.push(redirectTo);
    } else {
      if (response.errors) {
        // Iterate through each error field and set the error
        Object.entries(response.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages?.length > 0) {
            // Only set error if field exists in our signup form
            if (["email", "password"].includes(field)) {
              setError(field as keyof LoginFormType, {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-3"
    >
      <div className="mb-3">
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email address is required!",
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

      <div className="mb-3">
        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required!",
          }}
          render={({ field, fieldState }) => (
            <InputWithoutLabel
              field={field}
              error={fieldState.error}
              placeholder="Enter your password"
              type="password"
            />
          )}
        />
      </div>

      <div className="text-right mb-3">
        <Link href={"/"} className="text-sm text-[var(--primary)] hover:underline font-medium">
          Forgot Password?
        </Link>
      </div>

      <Button isSubmitting={isSubmitting} type="submit">
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
