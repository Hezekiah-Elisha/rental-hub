// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "rentalhub-4af31.firebaseapp.com",
  projectId: "rentalhub-4af31",
  storageBucket: "rentalhub-4af31.firebasestorage.app",
  messagingSenderId: "282183106554",
  appId: "1:282183106554:web:9e51bff89b6eaaf668ee43",
  measurementId: "G-TL2BY6BMXG",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export { app };
