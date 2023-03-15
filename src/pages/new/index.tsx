import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import TextField from '@/components/TextField';

import useInvoice from '@/context/InvoiceContext';
import { InvoiceSchema, InvoiceValidator } from '@/schemas/InvoiceSchema';

export default function NewInvoice() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InvoiceSchema>({ resolver: zodResolver(InvoiceValidator) });

  const { dispatch } = useInvoice();

  const onSubmit = (data: InvoiceSchema) => {
    console.log('dispatching CREATE');
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

        <button type="submit">Create</button>
      </form>
      <Link href="/">Back</Link>
    </div>
  );
}
