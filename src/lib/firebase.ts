// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDQCiezLzLfEUIu8TyIZ7lXnZCguwA2j4",
  authDomain: "acm-website-459ef.firebaseapp.com",
  projectId: "acm-website-459ef",
  storageBucket: "acm-website-459ef.firebasestorage.app",
  messagingSenderId: "1031361398430",
  appId: "1:1031361398430:web:640c75bab8e4890e571d8f",
  measurementId: "G-Z5LVR2ETCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;



// i hope this works becuse i have no idea what im doing
//         // Redirect or handle successful sign-in