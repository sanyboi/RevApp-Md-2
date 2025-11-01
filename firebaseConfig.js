// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqTrQfBU8VCZZX2801lCNpN8eBqpCmdxc",
  authDomain: "revapp-4d147.firebaseapp.com",
  projectId: "revapp-4d147",
  storageBucket: "revapp-4d147.firebasestorage.app",
  messagingSenderId: "26598327907",
  appId: "1:26598327907:web:7b377e8fd438ae1a7f5a56",
  measurementId: "G-CCY4QDKVSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);