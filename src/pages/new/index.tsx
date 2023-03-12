import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { TestSchema, ITestSchema } from '@/schemas/TestSchema';
import { useForm } from 'react-hook-form';
import TextField from '@/components/TextField';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

import { generateUID } from '@/utils/generateUID';
import useInvoice from '@/context/InvoiceContext';

export default function NewInvoice() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITestSchema>({ resolver: zodResolver(TestSchema) });

  const { dispatch } = useInvoice();

  // const onSubmit = async (data: ITestSchema) => {
  //   const uid = generateUID();
  //   await setDoc(doc(db, 'test', uid), data);
  // };

  const onSubmit = (data: ITestSchema) => {
    console.log('dispatching CREATE');
    // const uid = generateUID();
    dispatch({ type: 'CREATE', data: data });
  };

  return (
    <div>
      <h1>Create new Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fieldProps={register('name')}
          error={errors?.name?.message}
        />
        <TextField
          label="Age"
          type="number"
          fieldProps={register('age')}
          error={errors?.age?.message}
        />
        <button type="submit">Create</button>
      </form>
      <Link href="/">Back</Link>
    </div>
  );
}
