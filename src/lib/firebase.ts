import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase.config.ts";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(app);

export { auth, fireStore, googleProvider, facebookProvider };
