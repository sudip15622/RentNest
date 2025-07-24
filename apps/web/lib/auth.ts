"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import {
  CustomFormState,
  SignupFormSchema,
  SignupFormType,
  LoginFormSchema,
  LoginFormType,
} from "./types";
import { createSession } from "./session";
import { formatZodErrors } from "./utils";

export async function handleSignup(
  details: SignupFormType,
): Promise<CustomFormState> {
  const validationFields = SignupFormSchema.safeParse(details);

  if (!validationFields.success) {
    return {
      success: false,
      errors: formatZodErrors(validationFields.error)
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    return {
      success: true
    }
  } else {
    return {
      success: false,
      message:
        response.status === 409 ? "User already exists!" : response.statusText || "Something went wrong!",
    };
  }
}

export async function handleLogin(
  details: LoginFormType,
): Promise<CustomFormState> {
  const validationFields = LoginFormSchema.safeParse(details);

  if (!validationFields.success) {
    return {
      success: false,
      errors: formatZodErrors(validationFields.error)
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    const result = await response.json();

    await createSession({
      user: {
        id: result.id,
        image: result.image,
      },
      accessToken: result.accessToken,
    });

    return {
      success: true
    }
  } else {
    return {
      success: false,
      message:
        response.status === 401 ? "Invalid Credentails!" : response.statusText || "Something went wrong!",
    };
  }
}
