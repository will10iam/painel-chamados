import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyB7ms9bR4kykSTmFQEfKiP_1UQKZQT4xyI",
    authDomain: "ticke-60122.firebaseapp.com",
    projectId: "ticke-60122",
    storageBucket: "ticke-60122.appspot.com",
    messagingSenderId: "643133470925",
    appId: "1:643133470925:web:6967cd62322ac6a5265184",
    measurementId: "G-TW8K0DJ1WZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };