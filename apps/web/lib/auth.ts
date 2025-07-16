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
import { treeifyError } from "zod";
import { createSession } from "./session";

export async function handleSignup(
  details: SignupFormType,
  redirectTo?: string,
): Promise<CustomFormState> {
  const validRedirect = redirectTo ? redirectTo : "/login";
  const validationFields = SignupFormSchema.safeParse(details);

  if (!validationFields.success) {
    const treefied = treeifyError(validationFields.error);
    return {
      errors: {
        name: treefied.properties?.name?.errors,
        email: treefied.properties?.email?.errors,
        password: treefied.properties?.password?.errors,
      },
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
    redirect(validRedirect);
  } else {
    return {
      message:
        response.status === 409 ? "User already exists!" : response.statusText || "Something went wrong!",
    };
  }
}

export async function handleLogin(
  details: LoginFormType,
  redirectTo?: string,
): Promise<CustomFormState> {
  const validRedirect = redirectTo ? redirectTo : "/";
  const validationFields = LoginFormSchema.safeParse(details);

  if (!validationFields.success) {
    const treefied = treeifyError(validationFields.error);
    return {
      errors: {
        email: treefied.properties?.email?.errors,
        password: treefied.properties?.password?.errors,
      },
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
        role: result.role,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });

    redirect(validRedirect);
  } else {
    return {
      message:
        response.status === 401 ? "Invalid Credentails!" : response.statusText || "Something went wrong!",
    };
  }
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const { accessToken, refreshToken } = await response.json();
    return { accessToken, refreshToken };
  } catch (error) {
    return null;
  }
};
