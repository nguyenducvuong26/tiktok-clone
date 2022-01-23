import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAveB95rTSWZI1soejXaSrPgraInwy6x4M",
    authDomain: "tiktok-clone-project-1c2fa.firebaseapp.com",
    projectId: "tiktok-clone-project-1c2fa",
    storageBucket: "tiktok-clone-project-1c2fa.appspot.com",
    messagingSenderId: "576358126365",
    appId: "1:576358126365:web:abf0985530425614ce47f4",
    measurementId: "G-ZE0JGLQDW6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();

export { db, auth, storage };
