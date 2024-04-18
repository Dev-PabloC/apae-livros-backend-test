import { z } from "zod";

export const bookZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  categoryId: z.string(),
});

export const updateBookZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  categoryId: z.string().optional(),
});