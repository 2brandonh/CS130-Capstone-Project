import { initializeApp } from "firebase/app";
import {
getAuth,
updateProfile,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
browserSessionPersistence,
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

const API_URL = "http://localhost:3001/"

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const registerJobseekerWithEmailAndPassword = async (first, last, industry, yoe, description, email, pass) => {
    try {

      // Getting tagging
      const requestOptions = {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({industry: industry, description: description})
      };
      let jobseekerTags = []
      try {
        const res = await fetch(API_URL + 'jobseekerTagging', requestOptions)
        const json = await res.json()
        jobseekerTags = await JSON.parse(json)
        console.log(jobseekerTags)
        }
        catch (err){
          console.log(err)
        }

      // Creating the User Account
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
        tags: jobseekerTags,
      }).then(() => {
        updateProfile(auth.currentUser, {
          displayName: "Jobseeker: " + first,
        })
      });
      return true
    } catch (err) {
      console.error(err);
      alert(err.message);
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
          displayName: "Employer: "+ first,
        })
      });
      return true
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