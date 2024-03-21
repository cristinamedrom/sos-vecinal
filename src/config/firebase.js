// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sos-vecinal-bd10b.firebaseapp.com",
  databaseURL: "https://sos-vecinal-bd10b-default-rtdb.firebaseio.com",
  projectId: "sos-vecinal-bd10b",
  storageBucket: "sos-vecinal-bd10b.appspot.com",
  messagingSenderId: "825357236296",
  appId: "1:825357236296:web:f55a1d90e4f3240bd9807d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  db,
  storage,
  auth,
}