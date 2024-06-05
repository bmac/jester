import z from 'zod';
import zx from 'zodix';

export const parseUsername = async (formData: FormData) => {
    return zx.parseForm(formData, {
        username: z.string()
            .trim()
            .toLowerCase()
            .max(39)
            .nonempty()
            .regex(/^[a-zA-Z0-9]+[a-zA-Z0-9-]*$/)
    });
};
