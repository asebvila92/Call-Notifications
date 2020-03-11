import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase...
const firebaseConfig = {
    apiKey: "AIzaSyD6MgRXvByBXZ26BN1teq2aNaJDwXbJ81Y",
    authDomain: "notificallamados.firebaseapp.com",
    databaseURL: "https://notificallamados.firebaseio.com",
    projectId: "notificallamados",
    storageBucket: "notificallamados.appspot.com",
    messagingSenderId: "555592183255",
    appId: "1:555592183255:web:3dc61d8ab67497342caf92"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;