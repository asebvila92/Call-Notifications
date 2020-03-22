import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { apiKey, appId } from './credentials';

// Initialize Firebase...
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "notificallamados.firebaseapp.com",
    databaseURL: "https://notificallamados.firebaseio.com",
    projectId: "notificallamados",
    storageBucket: "notificallamados.appspot.com",
    messagingSenderId: "555592183255",
    appId: appId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;