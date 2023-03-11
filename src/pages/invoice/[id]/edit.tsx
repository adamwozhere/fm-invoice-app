import { useRouter } from 'next/router';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  // pre-populate form with default useForm data
  return (
    <div>
      <h1>Edit Invoice # {id}</h1>
      <form></form>
    </div>
  );
}
