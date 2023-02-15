import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAGuOgcSdTkTbdDlG8-L0N9EPGt6Ze66tA",
    authDomain: "chat-app-7eb1a.firebaseapp.com",
    projectId: "chat-app-7eb1a",
    storageBucket: "chat-app-7eb1a.appspot.com",
    messagingSenderId: "1019789854535",
    appId: "1:1019789854535:web:c07373bc338d3f55602e62",
    measurementId: "G-H0363BRJFQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080');
}
export { db, auth };
export default firebase;