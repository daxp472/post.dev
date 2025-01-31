import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1dj-RIBu3qgvaeOm93tdqmJgQXCTnENY",
  authDomain: "post-dev-f1393.firebaseapp.com",
  projectId: "post-dev-f1393",
  storageBucket: "post-dev-f1393.firebasestorage.app",
  messagingSenderId: "475505172183",
  appId: "1:475505172183:web:4d02af8d714a9ccd93da92",
  measurementId: "G-V0GWLN76RK"
};

// Initialize Firebase
export const firebaseAppConfig = initializeApp(firebaseConfig);