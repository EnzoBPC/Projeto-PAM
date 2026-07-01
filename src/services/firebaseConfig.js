// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkDkJRJpFiTsmxwqYZ8BmF4sJRDvQZqdE",
  authDomain: "pokedexdb-appmoveis.firebaseapp.com",
  projectId: "pokedexdb-appmoveis",
  storageBucket: "pokedexdb-appmoveis.firebasestorage.app",
  messagingSenderId: "368784377482",
  appId: "1:368784377482:web:b8855c3af624638a910f73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);