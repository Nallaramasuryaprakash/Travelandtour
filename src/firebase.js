// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQncXN0K6nRhdg1TwwXZE7CJkzKGkgCzE",
  authDomain: "travel-login-cab8a.firebaseapp.com",
  projectId: "travel-login-cab8a",
  storageBucket: "travel-login-cab8a.appspot.com",
  messagingSenderId: "10525341752",
  appId: "1:10525341752:web:d52f10595702100a630ecd",
  measurementId: "G-HLFKTQHGPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
