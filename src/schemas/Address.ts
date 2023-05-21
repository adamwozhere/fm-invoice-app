import { z } from 'zod';

export const Address = z.object({
  street: z.string().trim().nonempty(),
  city: z.string().trim().nonempty(),
  postCode: z.string().trim().nonempty(),
  country: z.string().trim().nonempty(),
});
