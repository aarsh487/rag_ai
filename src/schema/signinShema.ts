import { z } from 'zod';

export const signinSchema = z.object({
    email: z.string().email("enter valid email address"),
    password: z.string().min(6, "password must be at least 6 characters long")
});