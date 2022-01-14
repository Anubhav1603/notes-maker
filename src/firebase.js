import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBqAcgXHLOQxArJLNn9PbIHpfnKbvk8bDA",
  authDomain: "notes-taking-app-bb967.firebaseapp.com",
  projectId: "notes-taking-app-bb967",
  storageBucket: "notes-taking-app-bb967.appspot.com",
  messagingSenderId: "995655530118",
  appId: "1:995655530118:web:78cda13556e1e7451b0307",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
