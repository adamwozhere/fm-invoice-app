import TextField from '@/components/TextField';
import useInvoice from '@/context/InvoiceContext';
import { InvoiceSchema, InvoiceValidator } from '@/schemas/InvoiceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';

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
    watch,
    control,
    formState: { errors, dirtyFields },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(InvoiceValidator),
    defaultValues: values,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  });

  const watchItems = watch('items');

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
        <button type="submit">Confirm</button>
      </form>
      <Link href="/">Back</Link>
    </div>
  );
}
