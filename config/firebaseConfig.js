// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt6I5DA8pV2l_Hh9pccX5tfjwTvNOjqgg",
  authDomain: "mezz-46e54.firebaseapp.com",
  databaseURL: "https://mezz-46e54-default-rtdb.firebaseio.com",
  projectId: "mezz-46e54",
  storageBucket: "mezz-46e54.firebasestorage.app",
  messagingSenderId: "634165947874",
  appId: "1:634165947874:web:accfba238684a418e95dbb",
  measurementId: "G-RQFHBCEEMB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);