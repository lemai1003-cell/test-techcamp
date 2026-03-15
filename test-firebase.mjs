import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBjv43edl5DwCqu78gFDW-vXjkVPWwWFQ", 
    authDomain: "test-techcamp.firebaseapp.com",
    projectId: "test-techcamp",
    storageBucket: "test-techcamp.firebasestorage.app",
    messagingSenderId: "780762284438",
    appId: "1:780762284438:web:9714fc25c9cdec51295db7",
    measurementId: "G-XGKW71LSZF",
    databaseURL: "https://test-techcamp-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, 'quiz_results');

console.log("Pushing to Firebase...");
push(dbRef, { test: "data", ts: new Date().toISOString() })
    .then(() => {
        console.log("Success!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Firebase error details:", err);
        process.exit(1);
    });

setTimeout(() => {
    console.error("Timed out after 10s");
    process.exit(1);
}, 10000);
