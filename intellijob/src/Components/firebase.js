import { initializeApp } from "firebase/app";
import {
getAuth,
updateProfile,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
} from "firebase/auth";
import {
getFirestore,
collection,
addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXWLj6v2CfBEb9UuqCZvb98Sq-Ni6FULg",
    authDomain: "intellijob-83a96.firebaseapp.com",
    projectId: "intellijob-83a96",
    storageBucket: "intellijob-83a96.appspot.com",
    messagingSenderId: "531277038841",
    appId: "1:531277038841:web:9d7945a38acd9988410e28",
    measurementId: "G-T0MEXNBVWE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    return true
  };

  //const getSnapshot = async
  const addToAdminPool = async (firstName, lastName, email, password) => {
    console.log(firstName)
    try {
      await addDoc(collection(db, "potentialAdmins"), {
        firstName, 
        lastName,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
      return
    }
    alert("Applied to be an Admin");
  };

  const registerWithEmailAndPassword = async (firstName, lastName, accountType, email, password, setDisplayName) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      setDisplayName(firstName)
      await addDoc(collection(db, "allUsers"), {
        uid: user.uid,
        firstName, 
        lastName,
        accountType,
        authProvider: "local",
        email,
      }).then(() => {
        updateProfile(auth.currentUser, {
          displayName: firstName,
        })
      });
      
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    return true;
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth)
  };

  export {
    auth,
    db,
    addToAdminPool,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };