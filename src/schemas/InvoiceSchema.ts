import { z } from 'zod';
import { generateUID } from '@/utils/generateUID';

export const calculateTotal = (amount: number, quantity: number) =>
  amount * quantity;

export const InvoiceValidator = z
  .object({
    id: z.string().default(generateUID()),
    clientName: z.string().trim().nonempty(),
    status: z.enum(['draft', 'pending', 'paid']).default('pending'),
    senderAddress: z.object({
      street: z.string().trim().nonempty(),
      //city: z.string().min(1),
    }),
    items: z
      .array(
        z
          .object({
            name: z.string().nonempty(),
            quantity: z.coerce.number().min(1),
            price: z.coerce.number(),
          })
          .transform((val) => {
            console.log('transforming total');
            return {
              ...val,
              total: calculateTotal(val.price, val.quantity),
            };
          })
      )
      .nonempty(),
  })
  .transform((values) => {
    let total = 0;
    values.items.forEach((item) => (total += item.total));
    return {
      ...values,
      total,
    };
  });

export type InvoiceSchema = z.infer<typeof InvoiceValidator>;
