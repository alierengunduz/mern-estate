// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-227a0.firebaseapp.com",
  projectId: "mern-estate-227a0",
  storageBucket: "mern-estate-227a0.appspot.com",
  messagingSenderId: "713430804014",
  appId: "1:713430804014:web:3d13c24f9c5ec433e561bf"
};

export const app = initializeApp(firebaseConfig);