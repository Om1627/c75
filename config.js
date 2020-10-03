import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  
    apiKey: "AIzaSyAnkE26LVtIApwqUWNpNzc8Zn1VttwZXsg",
    authDomain: "storyhub2-3f612.firebaseapp.com",
    databaseURL: "https://storyhub2-3f612.firebaseio.com",
    projectId: "storyhub2-3f612",
    storageBucket: "storyhub2-3f612.appspot.com",
    messagingSenderId: "829646882732",
    appId: "1:829646882732:web:22ab34b848525dfc039c09"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();