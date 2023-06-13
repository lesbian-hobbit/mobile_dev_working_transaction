// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8F8XwuRVSkRL6y5jy2aqxnfCQMF_zN0U",
  authDomain: "fir-auth-3554c.firebaseapp.com",
  databaseURL: "https://fir-auth-3554c-default-rtdb.firebaseio.com/",
  projectId: "fir-auth-3554c",
  storageBucket: "fir-auth-3554c.appspot.com",
  messagingSenderId: "347728374225",
  appId: "1:347728374225:web:c0439bca26163e416258f0",
  measurementId: "G-J43XLHCKMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore};