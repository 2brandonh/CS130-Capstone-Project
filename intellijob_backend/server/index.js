const express = require("express");
const cors = require("cors");
const {Jobs, Employers, Jobseekers} = require("./config");
const { request } = require("express");
const Request = require("request/request");
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

  const promptWrapper = `
  The following is a job position written by a recruiter. 
  The passage describes the technical requirements and experience required of a candidate.
  Provide a detailed list of the key techncial skills and experience that a candidate should have for this job.
  Return this list as an array, with each skill written as a string using double quotes. 
  The array should be ordered from the most relevant to least relevant. 
  Each entry in the array should be at most two words.
  Return only the array in this format and not any other text.

  ${req.body.description}
  `
  let jobTag = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptWrapper,
    max_tokens: 1000,
    temperature: 0,
  });
  jobTag = jobTag.data.choices[0].text
  // console.log(JSON.parse(jobTag))

  let employers = await Employers.get() //gets all employers
  employers = employers.docs.map(doc => doc.data())

  const recruiter = employers.filter((employer) => employer.uid == payload.uid)[0] //filtering: gets the recruiter corresponding to the same uid
  console.log(recruiter)
  
  payload.company = recruiter.company
  payload.email = recruiter.email
  payload.tags = await JSON.parse(jobTag).map(word => word.toLowerCase())
  console.log(payload)

  const fb_res = await Jobs.add(payload)
  res.send(fb_res); // Successfully created the new job listing
});

app.post('/jobseekerTagging', async(req, res) => {
  console.log(req.body)
  console.log('received jobseeker tagging request')
  const promptWrapper = `
  The following is a passage written by a jobseeker in the ${req.body.industry} industry.
  The passage describes the jobseeker's ideal job and their background.
  Provide a detailed list of their key technical skills.
  Return this list as an array, with each skill written as a string using double quotes. The array should be ordered from the most relevant to least relevant. Each entry in the array should be at most two words.
  Return only the array in this format and not any other text.

  ${req.body.description}
  `

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptWrapper,
    max_tokens: 1000,
    temperature: 0,
  });
  let review = response.data.choices[0].text
  review = await JSON.parse(review).map(word => word.toLowerCase())
  console.log(review)

  res.send(JSON.stringify(review))
})


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

  ${req.body.description}
  `
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptWrapper,
    max_tokens: 1000,
    temperature: 0,
  });
  let review = response.data.choices[0].text

  res.send(JSON.stringify(review))
})

app.post('/coverLetter', async (req, res) => {

})

// TODO add this to request?
const MAX_FETCH_JOBS = 10;
const MAX_USER_TAGS = 10;

app.post('/fetchJobs', async (req, res) => {
  // request will have the "uid" (jobseeker)
  // from this we can retrieve the interests and skills of the user (reading from the Jobseeker collection, with the specific uid)
  console.log('got fetch jobs request')
  const user_id = req.body.uid;
  let jobseekers = await Jobseekers.get() //gets all users
  jobseekers = jobseekers.docs.map(doc => doc.data())
  const jobseeker = jobseekers.filter((jobseeker) => jobseeker.uid == req.body.uid)[0] //filtering: gets the jobseeker corresponding to the same uid
  const tags = jobseeker.tags.length > MAX_USER_TAGS ? jobseeker.tags.slice(0, MAX_USER_TAGS) : jobseeker.tags;

  console.log(tags);

  var relevance = {}; 
  var id_to_data = {};

  const response = await Jobs.where("tags", "array-contains-any", tags).get();
  response.docs.forEach(doc => {
    const data = doc.data();
    const id = doc.id;

    // TODO add weighting for each tag/skill based on order?
    var rel = 0;
    tags.forEach((user_tag) => {
      if (data.skills.includes(user_tag)) {
        rel++;
      }
    });

    if (id in relevance) {
      relevance[id] += rel;
    } else {
      relevance[id] = rel;
      id_to_data[id] = data;
    }
  });

  let sortable = [];
  for (var id in relevance) {
    sortable.push([id, relevance[id]]);
  }

  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });

  console.log(relevance);
  console.log(sortable);

  // return jobs sorted by relevance
  var output = sortable.map(x => id_to_data[x[0]]);

  if (output.length > MAX_FETCH_JOBS){
    output = output.slice(0, MAX_FETCH_JOBS);
  }

  console.log(output);
  res.send(output);
})

/*app.post('/fetchCreatedJobs', async (req, res) => {
  // request will have a "uid" (employer)
  // retrieve all jobs created by the employer
  const user_id = req.body.uid;

  const response = await Jobs.where("uid", "==", uid).get();
  const data = response.docs.map(doc => doc.data());
  console.log(data);
  res.send(data);
})*/

app.post('/deleteJob', async (req, res) => {
  console.log(req);
  const jobid = req.body.jobid;
  const uid = req.body.uid;

  const fb_res = await Jobs.doc(jobid).delete();
  console.log(fb_res);
  res.send(fb_res);
});

app.get('/fetchBookmarkedJobs', async (req, res) => {
  // req will have uid (jobseeker)

  // Fetch jobseeker matching given UID and get bookmarked jobs
  const jobseeker_id = req.body.uid;
  const response = await Jobseekers.where("uid", "==", jobseeker_id).get();
  // jobseeker becomes the bookmarked array (take first element since there should be 1 corresponding jobseeker to the given UID)
  const bookmarks = response.docs.map(doc => (doc.data().bookmarks))[0];

  // Fetch jobs and then filter by document ID if it exists in bookmarks array
  let jobs = await Jobs.where("__name__", "in", bookmarks).get();
  jobs = jobs.docs.map(doc => ({...doc.data(), id: doc.id}));
  
  // return the jobs that are bookmarked
  res.send(jobs);
});

app.get('/fetchCreatedJobs', async (req, res) => {
  // req will have uid (employer)
  const employer = req.body.uid;
  
  // return the jobs that the employer created
  const response = await Jobs.where("uid", "==", employer).get();
  const jobs = response.docs.map(doc => ({...doc.data(), id: doc.id}));
  res.send(jobs);
});