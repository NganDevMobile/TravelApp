import * as firebase from 'firebase';
var Config = {
    apiKey: "AIzaSyC1kVqlcdllyt7StDEBMILV7sn1BdhnvLM",
    authDomain: "assignment-45175.firebaseapp.com",
    databaseURL: "https://assignment-45175-default-rtdb.firebaseio.com/",
    projectId: "assignment-45175",
    storageBucket: "assignment-45175.appspot.com",
    messagingSenderId: "187518036435",
    appId: "1:187518036435:web:e3bb40138a7d3d3fca6726",
    measurementId: "G-GKLST2PV5W"
};
export default (firebaseConfig = firebase.initializeApp(Config));