// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUeoWCa3BcdChbmHEKVVH_6GgHGYjW12k",
  authDomain: "magazine-d0ec8.firebaseapp.com",
  projectId: "magazine-d0ec8",
  storageBucket: "magazine-d0ec8.appspot.com",
  messagingSenderId: "963881453225",
  appId: "1:963881453225:web:d5d280c059d651b6618bb8",
  measurementId: "G-4WSBPYSJ3X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
