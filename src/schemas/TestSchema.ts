import { generateUID } from '@/utils/generateUID';
import { z } from 'zod';

export const TestSchema = z
  .object({
    name: z.string().trim().min(1),
    age: z.coerce.number().min(1),
    nested: z
      .object({
        field: z.coerce.number().optional().default(22),
      })
      .optional(),
  })
  .transform((data) => {
    // think this now works, where generateUID will not be called on editing a document (that already has an id)
    // could alternatively create an Optional id field with default value of 'undefined' etc. then check for that value?
    // (perhaps this is more type-safe and legible ?)
    let uid: string;
    if ('id' in data) {
      uid = data.id as string;
    } else {
      uid = generateUID();
    }

    return {
      ...data,
      id: uid,
    };
  });

export type ITestSchema = z.infer<typeof TestSchema>;
