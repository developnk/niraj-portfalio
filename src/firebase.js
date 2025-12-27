import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD64LIBZa4M77uB8-qMMge_0zRVDmPavVM",
  authDomain: "counter-efc28.firebaseapp.com",
  projectId: "counter-efc28",
  storageBucket: "counter-efc28.firebasestorage.app",
  messagingSenderId: "518443022602",
  appId: "1:518443022602:web:7105ea152ced64b9f862f3",
  measurementId: "G-4804E1ZKT7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
