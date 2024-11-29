// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA3UjgfwSAEBIdulKLNTJIraTkzyXVLuFQ",
    authDomain: "yoga-98562.firebaseapp.com",  
    databaseURL: "https://yoga-98562-default-rtdb.firebaseio.com",
    projectId: "yoga-98562",
    storageBucket: "yoga-98562.appspot.com", 
    messagingSenderId: "833494437404",
    appId: "1:833494437404:android:cbda76f430e52e0eee59d9" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
