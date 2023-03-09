const express = require("express");
const cors = require("cors");
const {Jobs, Employers, Jobseekers} = require("./config");
const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

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
  let payload = req.body
  payload.skills = payload.skills.split(',')
  // const company = req.body.company;
  // const position = req.body.position;
  // const description = req.body.description;
  // const location = req.body.location;
  // const skills = req.body.skills;
  // const comp = req.body.comp;
  // const uid = req.body.uid;

  // TODO: DaVinci -> Brandon

  let employers = await Employers.get() //gets all employers
  employers = employers.docs.map(doc => doc.data())

  const recruiter = employers.filter((employer) => employer.uid == payload.uid)[0] //filtering: gets the recruiter corresponding to the same uid
  console.log(recruiter)

  payload.company = recruiter.company
  payload.email = recruiter.email
  console.log(payload)
  const response = await Jobs.add(payload)
  res.send(response);
});

app.post('/resumeReview', async (req, res) => {
  let jobseekers = await Jobseekers.get() //gets all users
  jobseekers = jobseekers.docs.map(doc => doc.data())
  const jobseeker = jobseekers.filter((jobseeker) => jobseeker.uid == req.body.uid)[0] //filtering: gets the jobseeker corresponding to the same uid

  console.log(jobseeker)
  console.log('received resume review request')
  const promptWrapper = `
  The following is a resume created by a person who works in the ${jobseeker.industry} industry. 
  Please provide a detailed critique of their resume in addition to suggested improvements.
  Focus on the technical aspects and act supportively. If it helps, include bullet points and explicitly show what changes should be made.

  ${req.body.resume}
  `
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptWrapper,
    max_tokens: 1000,
    temperature: 0,
  });
  const review = response.data.choices[0].text

  res.send(JSON.stringify(review))
})

app.post('/coverLetter', async (req, res) => {

})

app.get('/fetchJobs', async (req, res) => {
  // TODO -> Syed
  // request will have the "uid" (jobseeker)
  // from this we can retrieve the interests and skills of the user (reading from the Jobseeker collection, with the specific uid)

  console.log('got fetch jobs request')
  const response = await Jobs.get()
  const jobs = response.docs.map(doc => ({...doc.data(), id: doc.id})) // this returns all the docs for jobs

  // TODO -> return jobs sorted by relevance

  // console.log(response.docs.map(doc => doc.data()))
  res.send(jobs) // this returns all the docs for jobs
})

app.get('/fetchCreatedJobs', async (req, res) => {
  // TODO
  // request will have a "uid" (employer)
  // retrieve all jobs created by the employer
})

app.post('/deleteJob', async (req, res) => {
  console.log(req);
  const job_id = req.body.jobID;
  const user_id = req.body.userID;

  const fb_res = await Jobs.doc(job_id).delete();
  console.log(fb_res);
  res.send(fb_res);
});

app.get('/fetchBookmarkedJobs', (req, res) => {
  // TODO -> Justin
  // req will have uid (jobseeker)
  // retrieve from the Users colelction the user, and their array of bookmarked jobs
  // return the jobs that are bookmarked
  res.send('TODO')
});

app.get('/fetchCreatedJobs', async (req, res) => {
  // TODO -> Justin
  // req will have uid (employer)
  // return the jobs that the employer created
  const response = await Jobs.get()
  res.send(response)
});
