import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqB_P0PubsAyLVomW_PEvZMlu1NHg93M0",
  authDomain: "panther-hub-2e47f.firebaseapp.com",
  projectId: "panther-hub-2e47f",
  storageBucket: "panther-hub-2e47f.firebasestorage.app",
  messagingSenderId: "236535049562",
  appId: "1:236535049562:web:db69e783129b46beae9763",
  measurementId: "G-113W6LVXF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };