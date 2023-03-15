import TextField from '@/components/TextField';
import useInvoice from '@/context/InvoiceContext';
import { InvoiceSchema, InvoiceValidator } from '@/schemas/InvoiceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const { invoices, dispatch } = useInvoice();
  // get field values for current invoice object
  const values = invoices.find(
    (inv) => inv.id === (id as string)
  ) as InvoiceSchema;

  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(InvoiceValidator),
    defaultValues: values,
  });

  const onSubmit = (data: InvoiceSchema) => {
    // get only edited (dirty) values
    const dirtyKeys = Object.keys(dirtyFields);
    const dirtyObjArr = Object.entries(data).filter(([key, value]) => {
      if (dirtyKeys.includes(key)) {
        return { [key]: value };
      }
    });

    // cast back to object
    const dirtyObj = Object.fromEntries(dirtyObjArr);

    // check if anything has actually changed (should check first?)
    console.log('dirtyObj', dirtyObj);
    if (Object.keys(dirtyObj).length === 0) {
      console.log('empty object, no edits made!');
    } else {
      dispatch({ type: 'UPDATE', id: id as string, data: dirtyObj });
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Edit Invoice # {id}</h1>
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
        <button type="submit">Confirm</button>
      </form>
      <Link href="/">Back</Link>
    </div>
  );
}
