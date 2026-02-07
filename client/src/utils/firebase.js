// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-project-bc175.firebaseapp.com",
  projectId: "taskmanager-project-bc175",
  storageBucket: "taskmanager-project-bc175.firebasestorage.app",
  messagingSenderId: "254764480913",
  appId: "1:254764480913:web:5aba32a34a6cf26100c230"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);