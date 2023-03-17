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
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(InvoiceValidator),
    defaultValues: {
      items: [{ name: '', quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  });

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
            return (
              <section key={field.id}>
                <label htmlFor="">Name</label>
                <input {...register(`items.${index}.name`)} />
                <label htmlFor="">Quantity</label>
                <input {...register(`items.${index}.quantity`)} />
                <label htmlFor="">Price</label>
                <input {...register(`items.${index}.price`)} />
                <label htmlFor="">Total</label>
                <input {...register(`items.${index}.total`)} />
              </section>
            );
          })}
        </>
        <button type="submit">Create</button>
      </form>
      <Link href="/">Back</Link>
    </div>
  );
}
