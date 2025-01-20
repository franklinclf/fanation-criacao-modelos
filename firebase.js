import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlMTX8tdgL3h--_yiu6v3LhMSF_ztkWNI",
  authDomain: "fanationapp.firebaseapp.com",
  projectId: "fanationapp",
  storageBucket: "fanationapp.firebasestorage.app",
  messagingSenderId: "144562480583",
  appId: "1:144562480583:web:b1ac4da71d75377e1ee5e2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)