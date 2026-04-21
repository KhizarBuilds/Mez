import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt6I5DA8pV2l_Hh9pccX5tfjwTvNOjqgg",
  authDomain: "mezz-46e54.firebaseapp.com",
  databaseURL: "https://mezz-46e54-default-rtdb.firebaseio.com",
  projectId: "mezz-46e54",
  storageBucket: "mezz-46e54.firebasestorage.app",
  messagingSenderId: "634165947874",
  appId: "1:634165947874:web:accfba238684a418e95dbb",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);