import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIRESBASE_AUTH_DOMAIN,
  projectId: "netflix-clone-app-f6fa8",
  storageBucket: process.env.REACT_APP_FIRESBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-TSV38GTY2Z"
};


// Initialize Firebasek
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);