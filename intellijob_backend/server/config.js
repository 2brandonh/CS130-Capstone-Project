const firebase = require("firebase");
const dotenv = require("dotenv").config();

const api_key = process.env.REACT_APP_FIREBASE_API_KEY;
const auth_domain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const project_id = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storage_bucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messaging_sender_id = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const app_id = process.env.REACT_APP_FIREBASE_APP_ID;
const measurement_id = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID


const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messaging_sender_id,
  appId: app_id,
  measurementId: measurement_id,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Jobs = db.collection("Jobs");
const Employers = db.collection("Employers");
const Jobseekers = db.collection("Jobseekers");

module.exports = {Jobs, Employers, Jobseekers};