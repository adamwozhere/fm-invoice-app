import { db } from '@/firebase/firebaseConfig';
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDocs,
  QuerySnapshot,
  DocumentData,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';

export default function FirestoreTest() {
  const [data, setData] = useState<DocumentData>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());
    try {
      await addDoc(collection(db, 'tasks'), values);
      //onClose();
      console.log('doc created');
    } catch (err) {
      alert(err);
    }

    await addDoc(collection(db, 'test', 'myID'), {
      name: 'test',
      addres: 'bobtown',
    });

    // create a specific doc with invoice num (works BUT you must have created a collection in firestore to actually see it -- even though the data is actually populated!!)
    await setDoc(doc(db, 'invoices', 'XD569983'), {
      id: 'XD569983',
      address: {
        street: '40',
        postCode: 'HJ150DW',
        city: 'Barrytown',
      },
      amount: 99.99,
    });

    // Add a new document in collection "cities"
    await setDoc(doc(db, 'cities', 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    });

    // retrieve docs
    getAllDocs();
  };

  const getAllDocs = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const newData = [];
    querySnapshot.forEach((doc) => newData.push(doc.data()));
    console.log('newData:', newData);
    setData(newData);
    console.log('data:', data);
  };

  useEffect(() => {
    getAllDocs();
  }, []);

  const deleteItem: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await deleteDoc(doc(db, 'tasks', '4a0FNjfj1A5PkI9eFeH8'));
    getAllDocs();
  };
  return (
    <div>
      <form id="myForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="Name" id="name" />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="age">Age</label>
        <input type="number" name="age" id="age" />
        <button type="submit">Submit</button>
      </form>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {data?.map((item, i) => (
          <span key={i}>
            {item.name} {item.username} {item.age}
            <button onClick={deleteItem}>X</button>
          </span>
        ))}
      </div>
    </div>
  );
}
