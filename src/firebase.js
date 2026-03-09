import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECTID,
  storageBucket: import.meta.env.FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SERVICE,
  appId: import.meta.env.FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
