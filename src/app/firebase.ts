// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqCEwkdmeleHP_dTaX6gBA52YAwUJWNAs",
  authDomain: "booksummarist-3962d.firebaseapp.com",
  projectId: "booksummarist-3962d",
  storageBucket: "booksummarist-3962d.firebasestorage.app",
  messagingSenderId: "486167469807",
  appId: "1:486167469807:web:962c145ac4d4ec5b1ec51a",
  measurementId: "G-C1JG481QV6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);