import { z } from 'zod';

export const Invoice = z
  .object({
    id: z.string(),
    createdAt: z.string().datetime(),
    paymentDue: z.string().datetime(),
    description: z.string(),
    paymentTerms: z
      .union([z.literal(1), z.literal(7), z.literal(14), z.literal(30)])
      .default(30),
    clientName: z.string().trim().min(1),
    clientEmail: z.string().email(),
    status: z.enum(['draft', 'pending', 'paid']),
    senderAddress: z.object({
      street: z.string().trim().min(1),
      city: z.string(),
      postCode: z.string().trim().min(6),
      country: z.string(),
    }),
    clientAddress: z.object({
      street: z.string(),
      city: z.string(),
      postCode: z.string(),
      country: z.string(),
    }),
    items: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
        total: z.number(),
      })
    ),
    total: z.number(),
  })
  .transform((val) => ({
    ...val,
    [val.paymentDue]: val.createdAt + val.paymentTerms,
  }));

export type InvoiceSchema = z.infer<typeof Invoice>;
