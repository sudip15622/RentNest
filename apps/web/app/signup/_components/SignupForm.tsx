"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { SignupFormType } from "../../../lib/types";
import { handleSignup } from "../../../lib/auth";
import Input from "../../../components/ui/Input";
import { useToast } from "../../../contexts/ToastContext";
import { useSearchParams } from "next/navigation";
import Button from "../../../components/ui/Button";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const {toast} = useToast();
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
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    if (isSubmitting) return;
    if (!isValid) return;
    const response = await handleSignup(data, redirectTo);
    if (response?.errors) {
      const fieldErrors = response.errors;

      // Iterate through each error field and set the error
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages?.length) {
          setError(field as keyof SignupFormType, {
            type: "server",
            message: messages[0], // Show the first error message
          });
        }
      });

      return;
    }
    if(response?.message) {
      toast(response.message, "error");
    }
    toast("Signup Successful!", "success");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-5"
    >
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
          <Input field={field} error={fieldState.error} label="Full Name" type="text"/>
        )}
      />
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
          <Input field={field} error={fieldState.error} label="Email Address" type="email"/>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required!",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            message:
              "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long!",
          },
        }}
        render={({ field, fieldState }) => (
          <Input field={field} error={fieldState.error} label="Password" type="password"/>
        )}
      />
      <Button children={"Sign Up"} isSubmitting={isSubmitting} type="submit"/>
    </form>
  );
}
