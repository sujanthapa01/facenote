// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzcQbdL8j7QpXzGmwB_zQaANzx5oGKWow",
  authDomain: "facenote-5f73a.firebaseapp.com",
  projectId: "facenote-5f73a",
  storageBucket: "facenote-5f73a.firebasestorage.app",
  messagingSenderId: "303595775612",
  appId: "1:303595775612:web:e49997c8b99c02c4738bf9",
  measurementId: "G-9HYYMF92DF"
};


// auth

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);