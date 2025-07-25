import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyClVVqZQd2N1mEcfLmqVIn0v4r0gE6-b_w",
  authDomain: "campushustle91.firebaseapp.com",
  projectId: "campushustle91",
  storageBucket: "campushustle91.appspot.com", 
  databaseURL: 'https://campushustle91-default-rtdb.asia-southeast1.firebasedatabase.app', 
  messagingSenderId: "711593646304",
  appId: "1:711593646304:web:899838ecaf25b2fdd9d885",
  measurementId: "G-BKMQ0VJRMV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, googleProvider, db, realtimeDb };

