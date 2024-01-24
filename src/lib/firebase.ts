import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../../firebase.config.ts";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
