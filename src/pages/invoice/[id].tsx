import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>invoice: {id}</div>
      <Link href="/">Back</Link>
    </>
  );
}
