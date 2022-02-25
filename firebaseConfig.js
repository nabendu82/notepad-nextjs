import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxiI6ds0ddgEl9mMaIttigMeBm0SVgmvA",
    authDomain: "notepadclone-nextjs.firebaseapp.com",
    projectId: "notepadclone-nextjs",
    storageBucket: "notepadclone-nextjs.appspot.com",
    messagingSenderId: "1093461718078",
    appId: "1:1093461718078:web:8393d1be7855888a39cd6f"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);