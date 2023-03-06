const express = require("express");
const cors = require("cors");
const {Jobs, Employers, Jobseekers} = require("./config");
const dotenv = require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("working fine");
});

const PORT = process.env.PORT || 8080; // Use this instead of hardcoding it like before

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post('/createJob', async (req, res) => {
  console.log(req)
  const company = req.body.company;
  const position = req.body.position;
  const description = req.body.description;
  const location = req.body.location;
  const skills = req.body.skills;
  const comp = req.body.comp;
  const user_id = req.body.userID;

  // TODO any preprocessing??

  const data = req.body
  const response = await Jobs.add({data})

  res.send(response)

  // request.post({ headers: {'content-type' : 'application/json'}, url: url, body: req.body }, 
  //   (error, response, body) => {
  //      console.log(body);
  //   });

  // res.send('Success');
});

app.get('/fetchJobs', async (req, res) => {
  console.log('got fetch jobs request')
  const response = await Jobs.get()
  console.log(response.docs.map(doc => doc.data()))
  res.send(response.docs.map(doc => doc.data())) // this returns all the docs for jobs
})

app.post('/deleteJob', (req, res) => {
  res.send('Hello World!')
});

app.get('/fetchBookmarkedJobs', (req, res) => {
  res.send('TODO')
});

app.get('/fetchCreatedJobs', async (req, res) => {
  // gets jobs created by an employer
  // const data = req.body
  const response = await Jobs.get()
  res.send(response)
});

app.get('/fetchRecommendedJobs', (req, res) => {
  res.send('TODO')
});
