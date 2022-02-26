
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDu1qySi5cQaadqIUvPtWsgNBuiXHwl0lQ",
    authDomain: "projectmgmt-a05b6.firebaseapp.com",
    projectId: "projectmgmt-a05b6",
    storageBucket: "projectmgmt-a05b6.appspot.com",
    messagingSenderId: "346707017604",
    appId: "1:346707017604:web:95b19102247aeac7ec27d1"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };