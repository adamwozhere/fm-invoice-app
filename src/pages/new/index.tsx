import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useFieldArray, useForm } from 'react-hook-form';
import TextField from '@/components/TextField';

import useInvoice from '@/context/InvoiceContext';
import {
  InvoiceSchema,
  InvoiceValidator,
  PaymentTermsProperties,
} from '@/schemas/InvoiceSchema';
import SelectField from '@/components/SelectField';
import DatePicker from '@/components/DatePicker';

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
    <div className="new-invoice">
      <h1>New Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Bill From</legend>
          <TextField
            label="Street Address"
            type="text"
            fieldProps={register('senderAddress.street')}
            error={errors?.senderAddress?.street?.message}
          />
          <div className="inline-inputs">
            <TextField
              label="City"
              type="text"
              fieldProps={register('senderAddress.city')}
              error={errors?.senderAddress?.city?.message}
            />
            <TextField
              label="Post Code"
              type="text"
              fieldProps={register('senderAddress.postCode')}
              error={errors?.senderAddress?.postCode?.message}
            />
            <TextField
              label="Country"
              type="text"
              fieldProps={register('senderAddress.country')}
              error={errors?.senderAddress?.country?.message}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Bill To</legend>
          <TextField
            label="Client's Name"
            fieldProps={register('clientName')}
            error={errors?.clientName?.message}
          />
          <TextField
            label="Client's Email"
            type="email"
            fieldProps={register('clientEmail')}
            error={errors?.clientEmail?.message}
          />
          <TextField
            label="Street Address"
            type="text"
            fieldProps={register('clientAddress.street')}
            error={errors?.clientAddress?.street?.message}
          />
          <div className="inline-inputs">
            <TextField
              label="City"
              type="text"
              fieldProps={register('clientAddress.city')}
              error={errors?.clientAddress?.city?.message}
            />
            <TextField
              label="Post Code"
              type="text"
              fieldProps={register('clientAddress.postCode')}
              error={errors?.clientAddress?.postCode?.message}
            />
            <TextField
              label="Country"
              type="text"
              fieldProps={register('clientAddress.country')}
              error={errors?.clientAddress?.country?.message}
            />
          </div>
          <div className="inline-inputs">
            <TextField
              label="Invoice Date"
              type="text"
              fieldProps={register('invoiceDate')}
              error={errors?.invoiceDate?.message}
            />
            <DatePicker />
            {/* <TextField
              label="Payment Terms"
              type="text"
              fieldProps={register('paymentTerms')}
              error={errors?.paymentTerms?.message}
            /> */}
            <SelectField
              label="Payment Terms"
              options={PaymentTermsProperties}
              fieldProps={register('paymentTerms')}
              defaultValue={30}
            />
          </div>
          <TextField
            label="Project Description"
            fieldProps={register('description')}
            error={errors?.description?.message}
          />
        </fieldset>
        <h2>Item List</h2>
        <>
          {fields.map((field, index) => {
            const total = watchItems[index].price * watchItems[index].quantity;

            return (
              <div className="inline-inputs" key={field.id}>
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
              </div>
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
        <button type="submit">Save & Send</button>
      </form>
      <Link href="/">Discard</Link>
    </div>
  );
}
