import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";  // Import Firebase Messaging
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyDUWdYOWbyKdl8TUsRIIw1pwt8AQXzT6LY",
  authDomain: "mentorme-aaa37.firebaseapp.com",
  databaseURL: "https://mentorme-aaa37-default-rtdb.firebaseio.com",
  projectId: "mentorme-aaa37",
  storageBucket: "mentorme-aaa37.appspot.com", 
  messagingSenderId: "131671305259",
  appId: "1:131671305259:web:d03a9db47d68e0c3618e6e",
  measurementId: "G-D7MXRJV2K9"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);  // Inisialisasi Firebase Messaging
const perf = getPerformance(app);

export { auth, db, messaging, getToken, deleteToken, perf };
