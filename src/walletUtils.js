
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const deductCoins = async (uid, amount) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  const current = userSnap.data()?.campusCoins || 0;

  if (current < amount) throw new Error('Insufficient Campus Coins');

  const newBalance = current - amount;
  await setDoc(userRef, { campusCoins: newBalance }, { merge: true });

  return newBalance;
};
