import { z } from 'zod';

export const TestSchema = z.object({
  name: z.string().trim().min(1),
  age: z.coerce.number().min(1),
  id: z.string(),
});

export type ITestSchema = z.infer<typeof TestSchema>;
