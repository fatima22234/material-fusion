// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "material-fusion.firebaseapp.com",
  projectId: "material-fusion",
  storageBucket: "material-fusion.appspot.com",
  messagingSenderId: "131812348693",
  appId: "1:131812348693:web:58353f02b1369534584f1c",
  measurementId: "G-GQNHD4W9WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore= getFirestore(app)

export {firestore}