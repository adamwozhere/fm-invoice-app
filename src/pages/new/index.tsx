import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useFieldArray, useForm } from 'react-hook-form';
import TextField from '@/components/TextField';

import useInvoice from '@/context/InvoiceContext';
import { InvoiceSchema, InvoiceValidator } from '@/schemas/InvoiceSchema';

export default function NewInvoice() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(InvoiceValidator),
    defaultValues: {
      items: [{ name: '', quantity: 1, price: 0, total: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  });

  const watchItems = watch('items');

  const { dispatch } = useInvoice();

  const onSubmit = (data: InvoiceSchema) => {
    console.log('dispatching CREATE with data', data);
    // const uid = generateUID();
    dispatch({ type: 'CREATE', data: data });
    router.push('/');
  };

  return (
    <div>
      <h1>Create new Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Client Name"
          fieldProps={register('clientName')}
          error={errors?.clientName?.message}
        />
        <TextField
          label="Street"
          type="text"
          fieldProps={register('senderAddress.street')}
          error={errors?.senderAddress?.street?.message}
        />

        <>
          {fields.map((field, index) => {
            const total = watchItems[index].price * watchItems[index].quantity;

            return (
              <section key={field.id}>
                <TextField
                  label="Name"
                  fieldProps={register(`items.${index}.name` as const)}
                />
                <TextField
                  label="Quantity"
                  type="number"
                  fieldProps={register(`items.${index}.quantity` as const)}
                />
                <TextField
                  label="Price"
                  type="number"
                  fieldProps={register(`items.${index}.price` as const)}
                />
                <label>Total</label>
                <input type="text" value={total} disabled={true} />

                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </section>
            );
          })}
          {errors.items?.message}
        </>

        <button
          type="button"
          onClick={() => append({ name: '', quantity: 1, price: 0, total: 0 })}
        >
          Add
        </button>
        <button type="submit">Create</button>
      </form>
      <Link href="/">Back</Link>
    </div>
  );
}
