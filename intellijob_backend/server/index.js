import express from "express";
import cors from "cors";
import request from "request";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("working fine");
});

import dotenv from "dotenv"; // Add to import list

dotenv.config(); // Configure dotenv to access the env variables

const PORT = process.env.PORT || 8080; // Use this instead of hardcoding it like before

const api_key = process.env.REACT_APP_FIREBASE_API_KEY;
const auth_domain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const project_id = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storage_bucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messaging_sender_id = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const app_id = process.env.REACT_APP_FIREBASE_APP_ID;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post('/createJob', (req, res) => {
  company = req.body.company;
  position = req.body.position;
  description = req.body.description;
  skills = req.body.skills;
  comp = req.body.comp;
  user_id = req.body.userID;

  // TODO any preprocessing??

  // make POST request to jobs collection
  url = "https://firestore.googleapis.com/v1/projects/" + project_id + "/databases/(default)/documents/?&key=" + api_key;

  request.post({ headers: {'content-type' : 'application/json'}, url: url, body: req.body }, 
    (error, response, body) => {
       console.log(body);
    });

  res.send('Success');
});

app.post('/deleteJob', (req, res) => {
  res.send('Hello World!')
});

app.get('/fetchBookmarkedJobs', (req, res) => {
  res.send('TODO')
});

app.get('/fetchCreatedJobs', (req, res) => {
  res.send('TODO')
});

app.get('/fetchRecommendedJobs', (req, res) => {
  res.send('TODO')
});
