import { customAlphabet } from 'nanoid';

// note: does not check for collisions
export function generateUID() {
  const letters = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 2);
  const numbers = customAlphabet('0123456789', 4);

  const uid = letters().toString() + numbers().toString();
  console.log(uid);
  return uid;
}
