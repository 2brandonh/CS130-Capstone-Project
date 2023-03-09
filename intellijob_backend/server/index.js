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
  // const company = req.body.company;
  // const position = req.body.position;
  // const description = req.body.description;
  // const location = req.body.location;
  // const skills = req.body.skills;
  // const comp = req.body.comp;
  // const user_id = req.body.userID;

  // TODO: DaVinci -> Brandon

  const data = req.body
  const response = await Jobs.add({data})

  res.send(response)

  // request.post({ headers: {'content-type' : 'application/json'}, url: url, body: req.body }, 
  //   (error, response, body) => {
  //      console.log(body);
  //   });

  // res.send('Success');
});

// TODO add this to request?
const MAX_FETCH_JOBS = 10;

app.post('/fetchJobs', async (req, res) => {
  // request will have the user id (uid)
  // from this we can retrieve the interests and skills of the user (reading from the Jobseeker collection, with the specific uid)
  console.log('got fetch jobs request')

  const user_id = req.body.userID;
  const tags_res = await Jobseekers.doc(user_id).get();
  const tags = tags_res.data().tags;

  var relevance = {};
  var id_to_data = {};

  const response = await Jobs.where("skills", "array-contains-any", tags).get();
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
