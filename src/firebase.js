import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore/lite";
import { getMessaging } from "firebase/messaging/sw";
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
export const auth = getAuth(app);
export const messaging = getMessaging(app);
