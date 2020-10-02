import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDqmdD1n9boanCiVAvKFsqLaLn9UvrxCNE",
  authDomain: "think-piece-live-ae6c2.firebaseapp.com",
  databaseURL: "https://think-piece-live-ae6c2.firebaseio.com",
  projectId: "think-piece-live-ae6c2",
  storageBucket: "think-piece-live-ae6c2.appspot.com",
  messagingSenderId: "804616588947",
  appId: "1:804616588947:web:7ffe77bd653c6043a50766",
  measurementId: "G-V8EPHDYM8P",
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
