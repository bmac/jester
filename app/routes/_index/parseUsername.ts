import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .max(39)
    .min(1, "username must contain a least 1 character")
    .regex(/^[a-zA-Z0-9]+[a-zA-Z0-9-]*$/, "username must be alphanumeric"),
});

export const parseUsername = async (formData: FormData) => {
  return schema.safeParseAsync(Object.fromEntries(formData));
};
