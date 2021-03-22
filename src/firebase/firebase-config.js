import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA1PziTbQFbFDqQuGPCuMXTgXGGB_L6_ZI",
    authDomain: "react-app-cursos-5c221.firebaseapp.com",
    projectId: "react-app-cursos-5c221",
    storageBucket: "react-app-cursos-5c221.appspot.com",
    messagingSenderId: "881518191472",
    appId: "1:881518191472:web:e969d8944d5ed7182125b5",
    measurementId: "G-KCB1QNMQG3"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}
