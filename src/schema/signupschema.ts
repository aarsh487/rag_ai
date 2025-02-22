import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(2).max(20),
    email: z.string().email("enter valid email address"),
    password: z.string().min(6, "password must be at least 6 characters long")
});