// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import { getAuth,createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// import { getDatabase,ref,set,  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
// Your web app's Firebase configuration
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupbutton = document.getElementById("signupbutton");
const username = document.getElementById("username");
const email = document.getElementById("emailId");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");

signupbutton.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userDetails) => {
      const userId = userDetails.user.uid;
      console.log(userId);
      localStorage.setItem(userId,username.value);
      alert("userAdded Successfully(:><:)");
      writeInDb(userId,username.value)
      username.value = "";
      email.value = "";
      password.value = "";
      confirmpassword.value = "";
      
      alert("added");
      window.location.href = "../profile/profile.html";
    })
    .catch((error) => {
      console.log(error.message);
    });
});

function validation() {
  if (
    username.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmpassword.value === ""
  ) {
    alert("check credentials");
  }
  if (password.value !== confirmpassword.value) {
    alert("passwords dont match!");
  }
}

function writeInDb(userId,username){
  const db = getDatabase();
  set(ref(db,'users/'+userId),{
    name:username,
    email:email.value,
  });
  const userDetails = {
    name:username,
    email:email.value,
      
  }
  localStorage.setItem(username.value,JSON.stringify(userDetails));
}