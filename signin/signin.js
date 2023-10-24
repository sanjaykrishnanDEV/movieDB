// const firebaseConfig = {
//   apiKey: "AIzaSyCioblfAsN0vL2weeRR1ul8278xzjBz2Rc",
//   authDomain: "movies-99135.firebaseapp.com",
//   databaseURL: "https://movies-99135-default-rtdb.firebaseio.com",
//   projectId: "movies-99135",
//   storageBucket: "movies-99135.appspot.com",
//   messagingSenderId: "981899759318",
//   appId: "1:981899759318:web:38e8de34df59aa06b44377"
// };
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkEgmgMAKS4tRbCaYR3MhHTlT11eKR4Aw",
  authDomain: "moviedb-48bbf.firebaseapp.com",
  databaseURL: "https://moviedb-48bbf-default-rtdb.firebaseio.com",
  projectId: "moviedb-48bbf",
  storageBucket: "moviedb-48bbf.appspot.com",
  messagingSenderId: "338786943064",
  appId: "1:338786943064:web:c51941f2e6e5e54b6c4a2d"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const email = document.getElementById("signInEmailId");
const password = document.getElementById("signInPassword");
const signInButton = document.getElementById("sbtn");



document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value !== "" && password.value !== "") {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userDetails) => {
        alert("success");
        window.location.href="../profile/profile.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

// signInButton.addEventListener("click", () => {
//   console.log("L");

// });
