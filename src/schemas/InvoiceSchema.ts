import { z } from 'zod';
import { generateUID } from '@/utils/generateUID';

export const calculateTotal = (amount: number, quantity: number) =>
  amount * quantity;

export const PaymentTermsProperties = [
  { value: 1, label: 'Net 1 Day' },
  { value: 7, label: 'Net 7 Days' },
  { value: 14, label: 'Net 14 Days' },
  { value: 30, label: 'Net 30 Days' },
];

export const InvoiceValidator = z
  .object({
    id: z.string().default(generateUID()),
    invoiceDate: z.string().default('2023-04-25'),
    description: z.string().trim().nonempty(),
    paymentTerms: z.coerce.number(),
    clientName: z.string().trim().nonempty(),
    clientEmail: z.string().email(),
    status: z.enum(['draft', 'pending', 'paid']).default('pending'),
    senderAddress: z.object({
      street: z.string().trim().nonempty(),
      city: z.string().trim().nonempty(),
      postCode: z.string().trim().nonempty(),
      country: z.string().trim().nonempty(),
    }),
    clientAddress: z.object({
      street: z.string().trim().nonempty(),
      city: z.string().trim().nonempty(),
      postCode: z.string().trim().nonempty(),
      country: z.string().trim().nonempty(),
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
      paymentDue: '2023-05-25',
      ...values,
      total,
    };
  });

export type InvoiceSchema = z.infer<typeof InvoiceValidator>;
