import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2CCcWkNISRpLWz2UED6NtWsCBljdEnEk",
  authDomain: "final-cfcca.firebaseapp.com",
  projectId: "final-cfcca",
  storageBucket: "final-cfcca.appspot.com",
  messagingSenderId: "458410502006",
  appId: "1:458410502006:web:0a79b7e5371d57ed747c57",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);