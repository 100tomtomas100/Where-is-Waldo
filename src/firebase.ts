// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvAHmSELQMTeNuDWmN6fVaO54QVgqnsQc",
  authDomain: "where-is-waldo-9560c.firebaseapp.com",
  projectId: "where-is-waldo-9560c",
  storageBucket: "where-is-waldo-9560c.appspot.com",
  messagingSenderId: "523813033062",
  appId: "1:523813033062:web:06932fa08da6650c3989a7",
  measurementId: "G-8FNH760FK5",
  databaseURL: "https://where-is-waldo-9560c-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);
