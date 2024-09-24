'use client'

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBTjL5a1hPbKBvA0AU1gjSak8vi8j9aswg",
    authDomain: "catpcha-3bfe9.firebaseapp.com",
    projectId: "catpcha-3bfe9",
    storageBucket: "catpcha-3bfe9.appspot.com",
    messagingSenderId: "580813706921",
    appId: "1:580813706921:web:7659b976b6c4ba8aa93bb8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const updateLeaderboard = async (name: string, score: number) => {
    const docRef = await addDoc(collection(db, "leaderboard"), {
        name: name,
        score: score
    });
}


export const fetchLeaderboard = async () => {
    const querySnapshot = await getDocs(collection(db, "leaderboard"));
    const entries = querySnapshot.docs.map((doc) => doc.data());

    return entries
}