// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClVVqZQd2N1mEcfLmqVIn0v4r0gE6-b_w",
  authDomain: "campushustle91.firebaseapp.com",
  projectId: "campushustle91",
  storageBucket: "campushustle91.firebasestorage.app",
  messagingSenderId: "711593646304",
  appId: "1:711593646304:web:899838ecaf25b2fdd9d885",
  measurementId: "G-BKMQ0VJRMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);