import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "kwayah-music.firebaseapp.com",
  projectId: "kwayah-music",
  storageBucket: "kwayah-music.appspot.com",
  messagingSenderId: "1081462926915",
  appId: `${process.env.REACT_APP_FIREBASE_ID}`,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
