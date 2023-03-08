import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Invoice, InvoiceSchema } from '@/schemas/Invoice';
import TextField from '@/components/TextField';

export default function InvoiceForm() {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(Invoice),
    mode: 'onTouched',
  });

  const onSubmit = (data: InvoiceSchema) => {
    console.log('submit', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>New Invoice</h2>
        <fieldset>
          <legend>Bill From</legend>
          <TextField
            label="Street Address"
            fieldProps={register('senderAddress.street')}
            error={errors.senderAddress?.street?.message}
          />
          <TextField
            label="City"
            fieldProps={register('senderAddress.city')}
            error={errors.senderAddress?.city?.message}
          />
          <TextField
            label="Post Code"
            fieldProps={register('senderAddress.postCode')}
            error={errors.senderAddress?.postCode?.message}
          />
          <TextField
            label="Country"
            fieldProps={register('senderAddress.country')}
            error={errors.senderAddress?.country?.message}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(getValues(), null, 2)}</pre>
    </div>
  );
}
