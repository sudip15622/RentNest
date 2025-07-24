import { treeifyError } from "zod";

/**
 * Formats Zod validation errors into a structured object
 * @param zodError - The Zod error object from safeParse
 * @returns Object with field names as keys and error arrays as values
 */
export const formatZodErrors = (zodError: any) => {
  const treefied = treeifyError(zodError);
  const properties = (treefied as any).properties || {};
  
  return Object.entries(properties).reduce((acc, [key, value]: [string, any]) => {
    acc[key] = value?.errors;
    return acc;
  }, {} as Record<string, string[]>);
};
