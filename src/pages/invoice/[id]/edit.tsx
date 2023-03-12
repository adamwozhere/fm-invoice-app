import TextField from '@/components/TextField';
import useInvoice from '@/context/InvoiceContext';
import { ITestSchema, TestSchema } from '@/schemas/TestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

// pre-populate form with default useForm data
export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const { invoices, dispatch } = useInvoice();
  const values = invoices.find(
    (inv) => inv.id === (id as string)
  ) as ITestSchema;
  // console.log('values', values, 'id', id);

  const {
    handleSubmit,
    register,
    getFieldState,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ITestSchema>({
    resolver: zodResolver(TestSchema),
    defaultValues: values,
  });

  // const onSubmit = async (data: ITestSchema) => {
  //   const uid = generateUID();
  //   await setDoc(doc(db, 'test', uid), data);
  // };

  const onSubmit = (data: ITestSchema) => {
    // Object.entries(data).map(([key, value]) => {
    //   if ()
    // })
    console.log('dirtyFields', dirtyFields);
    const dirtyKeys = Object.keys(dirtyFields);
    const dirtyObjArr = Object.entries(data).filter(([key, value]) => {
      if (dirtyKeys.includes(key)) {
        return { [key]: value };
      }
    });

    const dirtyObj = Object.fromEntries(dirtyObjArr);

    console.log('dirtyObj', dirtyObj);
    if (Object.keys(dirtyObj).length === 0) {
      console.log('empty object, no edits made!');
    } else {
      dispatch({ type: 'UPDATE', id: id as string, data: dirtyObj });
    }
  };

  return (
    <div>
      <h1>Edit Invoice # {id}</h1>
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
        <TextField
          label="Nested.field"
          type="number"
          fieldProps={register('nested.field')}
          error={errors?.nested?.field?.message}
        />
        <button type="submit">Confirm</button>
      </form>
      <Link href="/">Back</Link>
    </div>
  );
}
