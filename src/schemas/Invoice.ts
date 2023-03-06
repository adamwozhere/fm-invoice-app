import { z } from 'zod';

export const Invoice = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  paymentDue: z.string().datetime(),
  description: z.string(),
  paymentTerms: z.number(),
  clientName: z.string(),
  clientEmail: z.string().email(),
  status: z.enum(['draft', 'pending', 'paid']),
  senderAddress: z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
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
});

export type InvoiceSchema = z.infer<typeof Invoice>;
