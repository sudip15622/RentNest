"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginFormType } from "../../../lib/types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { handleLogin } from "../../../lib/auth";
import Input from "../../../components/ui/Input";
import { useToast } from "../../../contexts/ToastContext";
import Button from "../../../components/ui/Button";

export default function LoginForm() {
  const { toast } = useToast();
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
    const response = await handleLogin(data, redirectTo);
    if (response?.errors) {
      const fieldErrors = response.errors;

      // Iterate through each error field and set the error
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (messages?.length) {
          setError(field as keyof LoginFormType, {
            type: "server",
            message: messages[0], // Show the first error message
          });
        }
      });

      return;
    }

    if (response?.message) {
      toast(response.message, "error");
      return;
    }
    toast("Login Successful!", "success");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-5"
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email address is required!",
        }}
        render={({ field, fieldState }) => (
          <Input field={field} error={fieldState.error} label="Email Address" type="email"/>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required!",
        }}
        render={({ field, fieldState }) => (
          <Input field={field} error={fieldState.error} label="Password" type="password"/>
        )}
      />
      <Link href={"/"} className="underline text-[var(--primary)] ml-3">
        Forgot Password?
      </Link>
      <Button children={"Log In"} isSubmitting={isSubmitting} type="submit"/>
    </form>
  );
}
