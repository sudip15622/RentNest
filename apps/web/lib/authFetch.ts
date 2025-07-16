import { deleteSession, getSession } from "./session";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {},
  currentPath?: string
) => {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    // Use provided path or try to detect from headers
    let redirectPath = currentPath;

    if (!redirectPath) {
      const headersList = await headers();
      const referer = headersList.get("referer");
      const pathname = headersList.get("x-pathname");

      if (pathname) {
        redirectPath = pathname;
      } else if (referer) {
        redirectPath = new URL(referer).pathname;
      } else {
        redirectPath = "/";
      }
    }

    if (!session?.refreshToken) {
      redirect(`/login?redirectTo=${encodeURIComponent(redirectPath)}`);
    }

    const refreshUrl = `/api/auth/refresh-session?redirectTo=${encodeURIComponent(redirectPath)}`;
    redirect(refreshUrl);
  }

  return response;
};

// Helper function for specific pages
export const createPageAuthFetch = (pagePath: string) => {
  return (url: string | URL, options: FetchOptions = {}) => {
    return authFetch(url, options, pagePath);
  };
};
