// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFpmbsZFU0fRnDsizyye-_3lI1j8_sVOw",
  authDomain: "seagrove-a771a.firebaseapp.com",
  projectId: "seagrove-a771a",
  storageBucket: "seagrove-a771a.firebasestorage.app",
  messagingSenderId: "837088026581",
  appId: "1:837088026581:web:c6a4a11baabc56287b275c",
  measurementId: "G-HCZQ4WJV94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
