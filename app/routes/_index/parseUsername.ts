import z from "zod";
import zx from "zodix";

export const parseUsername = async (formData: FormData) => {
  return zx.parseFormSafe(formData, {
    username: z
      .string()
      .trim()
      .toLowerCase()
      .max(39)
      .nonempty("username must contain a least 1 character")
      .regex(/^[a-zA-Z0-9]+[a-zA-Z0-9-]*$/, "username must be alphanumeric"),
  });
};
