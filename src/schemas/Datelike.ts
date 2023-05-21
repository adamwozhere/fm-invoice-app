import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

export const Datelike = z
  .union([z.instanceof(Date), z.instanceof(Timestamp)])
  .transform((val) => {
    if ('toDate' in val) {
      return val.toDate();
    }
    return val;
  });
