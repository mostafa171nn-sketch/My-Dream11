// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSjj2fhJ8TXgcGa9-6Mzb3h17T3bNXWmI",
  authDomain: "my-dream-academy-8cf12.firebaseapp.com",
  projectId: "my-dream-academy-8cf12",
  storageBucket: "my-dream-academy-8cf12.firebasestorage.app",
  messagingSenderId: "427586116952",
  appId: "1:427586116952:web:fda2391260386e905b992d",
  measurementId: "G-6NQQ2338JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
