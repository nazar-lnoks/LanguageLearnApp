import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoN47bRgYEaqRQWUkTIVGijdZ26F6Bycg",
  authDomain: "languageapp-e6151.firebaseapp.com",
  projectId: "languageapp-e6151",
  storageBucket: "languageapp-e6151.appspot.com",
  messagingSenderId: "476427076777",
  appId: "1:476427076777:web:b0d65b813515c9eb5cd5b8"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
