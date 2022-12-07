import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDVIXK-9y4OuAm2FtYIj3bbeHhdYUe8p2I",
  authDomain: "badger-clone.firebaseapp.com",
  projectId: "badger-clone",
  storageBucket: "badger-clone.appspot.com",
  messagingSenderId: "357285243423",
  appId: "1:357285243423:web:fef24c53cb9d3674fa032a",
  measurementId: "G-MRWPF9SK02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
