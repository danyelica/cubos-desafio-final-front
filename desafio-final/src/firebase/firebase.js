// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjvkaOkPXGx-nw_r6YryjBOy5PedcqSgc",
    authDomain: "desafio-final-vingacodes.firebaseapp.com",
    projectId: "desafio-final-vingacodes",
    storageBucket: "desafio-final-vingacodes.appspot.com",
    messagingSenderId: "688475045336",
    appId: "1:688475045336:web:6a1936c2c73fac1bbd86ad",
    measurementId: "G-R6TLZ2C2LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);