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
  };

//   {
//     first: "",
//     last: "",
//     industry: "",
//     yoe: "",
//     description: "",
//     email: "",
//     pass: "",
//     pass2: ""
//   }

  const registerJobseekerWithEmailAndPassword = async (first, last, industry, yoe, description, email, pass) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const user = res.user;
      await addDoc(collection(db, "Jobseekers"), {
        uid: user.uid,
        first, 
        last,
        industry,
        yoe,
        description,
        authProvider: "local",
        email,
      }).then(() => {
        updateProfile(auth.currentUser, {
          displayName: first,
        })
      });
      
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    finally {
      console.log("done")
    }
  };

  const registerEmployerWithEmailAndPassword = async (first, last, company, industry, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "Employers"), {
        uid: user.uid,
        first, 
        last,
        company,
        industry,
        authProvider: "local",
        email,
      }).then(() => {
        updateProfile(auth.currentUser, {
          displayName: first,
        })
      });
      
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

//   const sendPasswordReset = async (email) => {
//     try {
//       await sendPasswordResetEmail(auth, email);
//       alert("Password reset link sent!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

  const logout = () => {
    signOut(auth)
  };

  export {
    getAuth,
    auth,
    db,
    logInWithEmailAndPassword,
    registerJobseekerWithEmailAndPassword,
    registerEmployerWithEmailAndPassword,
    // sendPasswordReset,
    logout,
  };