import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBUhbEEiUdtRGu9oezdrO9tnkZnkqDo4TY",
    authDomain: "winkingcrm.firebaseapp.com",
    databaseURL: "https://winkingcrm.firebaseio.com",
    projectId: "winkingcrm",
    storageBucket: "winkingcrm.appspot.com",
    messagingSenderId: "922442110936"
};

firebase.initializeApp(config);

export default firebase;