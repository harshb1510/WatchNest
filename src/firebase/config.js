import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCG6fEk43oPzcXeElKbjuXCBJvVKvX10BM",
    authDomain: "watchnest.firebaseapp.com",
    projectId: "watchnest",
    storageBucket: "watchnest.appspot.com",
    messagingSenderId: "828742012652",
    appId: "1:828742012652:web:e739b680f40adf68c35fc9",
    measurementId: "G-LSKX33C68L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
