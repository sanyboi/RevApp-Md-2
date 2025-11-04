// This file initializes the Firebase application with the provided credentials
// and exports the necessary services (like Auth) for use in the React components.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Required for the LoginScreen

// Your Firebase Web App's configuration details
// These are the actual keys provided by you, ensuring the app connects to your Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyBqTrQfBU8VCZZX2801lCNpN8eBqpCmdxc",
  authDomain: "revapp-4d147.firebaseapp.com",
  projectId: "revapp-4d147",
  storageBucket: "revapp-4d147.firebasestorage.app",
  messagingSenderId: "26598327907",
  appId: "1:26598327907:web:7b377e8fd438ae1a7f5a56",
  measurementId: "G-CCY4QDKVSQ"
};surementId: "G-CCY4QDKVSQ"


// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication Service
const auth = getAuth(app);

// Export the Firebase Auth instance
export { auth };
