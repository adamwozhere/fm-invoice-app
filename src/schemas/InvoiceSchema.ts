import { z } from 'zod';
import { generateUID } from '@/utils/generateUID';

export const InvoiceValidator = z
  .object({
    clientName: z.string().trim().min(1),
    status: z.enum(['draft', 'pending', 'paid']).default('pending'),
    senderAddress: z.object({
      street: z.string().trim().min(1),
      //city: z.string().min(1),
    }),
    items: z.array(
      z.object({
        name: z.string(),
        quantity: z.coerce.number().min(1),
        price: z.coerce.number(),
        //total: z.coerce.number(),
      })
    ),
    //total: z.coerce.number(),
  })
  .transform((data) => {
    // set invoice ID
    let uid: string;
    if ('id' in data) {
      uid = data.id as string;
    } else {
      uid = generateUID();
    }

    // set item prices
    //Object.defineProperty();

    return {
      ...data,
      id: uid,
    };
  });

export type InvoiceSchema = z.infer<typeof InvoiceValidator>;
