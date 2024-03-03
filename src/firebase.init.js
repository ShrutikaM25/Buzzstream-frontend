import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDvfSa24mKgW63rY-mSho0OX2dD0Y-kzf4",
  authDomain: "twitter-clone-62b3d.firebaseapp.com",
  projectId: "twitter-clone-62b3d",
  storageBucket: "twitter-clone-62b3d.appspot.com",
  messagingSenderId: "350105507380",
  appId: "1:350105507380:web:e5a9fd53f1012e41ff9c61",
  measurementId: "G-9D6FV17H6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;