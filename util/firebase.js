import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO_MW-eFMcHXFmrF-XSz1lYA8u68bQi0s",
  authDomain: "missme-5d1b9.firebaseapp.com",
  projectId: "missme-5d1b9",
  storageBucket: "missme-5d1b9.appspot.com",
  messagingSenderId: "379720804415",
  appId: "1:379720804415:web:5d09d0a46650db5b5f308a",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

// authentication
const auth = getAuth(app);

export { db, auth };
