"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import { LoginFormType } from "../../../lib/types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { handleLogin } from "../../../lib/auth";
import Input from "../../../components/ui/Input";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
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
      console.log(response?.message);
    }
    console.log(data);
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
        render={({ field }) => (
          <Input field={field} error={errors.email} label="Email Address" type="email"/>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required!",
        }}
        render={({ field }) => (
          <Input field={field} error={errors.password} label="Password" type="password"/>
        )}
      />
      <Link href={"/"} className="underline text-[var(--blue)] ml-3">
        Forgot Password?
      </Link>
      <Button
        // disabled={!isValid || isSubmitting}
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#7266ff",
          color: "#f2f1ed",
          "&:hover": {
            backgroundColor: "#5849fc", // a darker shade for hover effect
          },
        }}
        fullWidth
      >
        {isSubmitting ? <ScaleLoader height={21} color="#f2f1ed"/> : "Log In"}
      </Button>
    </form>
  );
}
