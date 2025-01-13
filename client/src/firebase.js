// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "buse-knitting.firebaseapp.com",
  projectId: "buse-knitting",
  storageBucket: "buse-knitting.firebasestorage.app",
  messagingSenderId: "1058002860909",
  appId: "1:1058002860909:web:87fd149ba5be861fb67864",
  measurementId: "G-7HC63P616B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

