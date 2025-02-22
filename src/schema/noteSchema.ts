import { z } from 'zod';

export const noteSchema = z.object({
   title: z.string().min(1, "Please provide a valid title"),
   note: z.string().max(200, "Word limit exceeded for content, Keep it under 200").optional(),
   link: z.string().optional()
});