"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import { SignupFormType } from "../../../lib/types";
import { handleSignup } from "../../../lib/auth";
import Input from "../../../components/ui/Input";

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
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
    const response = await handleSignup(data);
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
    console.log(data);
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
        render={({ field }) => (
          <Input field={field} error={errors.password} label="Full Name" type="text"/>
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
        render={({ field }) => (
          <Input field={field} error={errors.email} label="Email Address" type="email"/>
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
        render={({ field }) => (
          <Input field={field} error={errors.password} label="Password" type="password"/>
        )}
      />
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
        {isSubmitting ? <ScaleLoader height={21} color="#f2f1ed"/> : "Sign Up"}
      </Button>
    </form>
  );
}
