import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import JobListing from "./JobListing";

const API_URL = "http://localhost:3001/"

// This controls the layout and mapping of jobs on a page

const JobLayout = ({user}) => {
  const [jobData, setJobData] = useState([])

  useEffect(() => {
    console.log("fetching")
    const requestOptions = {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({uid: user.uid})
    };

    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch(API_URL + "fetchJobs", requestOptions);
      const json = await data.json();
      console.log(json) // json data -> listings, id -> doc id in the collection
      setJobData(json)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  // let testJobs =
  //   [{
  //     jobID: 13242,
  //     company: "Apple",
  //     position: "SWE II",
  //     recruiter: "sandra@apple.com",
  //     description: `We are seeking a software engineer to join our team at Apple. As a software engineer, you will be responsible for developing and maintaining software applications for our flagship products, such as the iPhone, iPad, and Mac. You will work on a team of experienced software engineers, collaborating on projects from ideation to implementation.

  //         The ideal candidate will have experience in software development, and possess strong analytical and problem-solving skills. You should be familiar with multiple programming languages such as Java, Python, and C++. You will need to have experience with software design patterns and be able to create high-quality, scalable software solutions. A degree in computer science, software engineering or a related field is a must.
          
  //         At Apple, we value diversity and believe that diverse teams make for better products. We are looking for someone who is passionate about technology and who is dedicated to creating exceptional software products.`,
  //     skills: ["C++", "C#", "SQL", "FBLearner"],
  //     comp: 123000,
  //     posted: "12/4/2022"
  //   },
  //   {
  //     jobID: 22342,
  //     company: "Google",
  //     position: "SWE III",
  //     recruiter: "billhwang@google.recruiting",
  //     description: `We are looking for a UX designer to join our team at Google. As a UX designer, you will be responsible for designing user interfaces and user experiences for our digital products, such as Google Search, YouTube, and Google Maps. You will work on a team of talented designers, collaborating on projects from ideation to implementation.

  //         The ideal candidate will have experience in user research, wireframing, prototyping, and graphic design. You should be familiar with design tools such as Sketch, Figma, and Adobe Creative Suite. You will need to have experience with human-centered design principles and be able to create high-quality, intuitive user experiences. A degree in design or a related field is a must.
          
  //         At Google, we value diversity and believe that diverse teams make for better products. We are looking for someone who is passionate about design and who is dedicated to creating exceptional user experiences.`,
  //     skills: ["Go", "C++", "Laravel", "Vue"],
  //     comp: 2323000,
  //     posted: "6/5/2022"
  //   },
  //   {
  //     jobID: 35436,
  //     company: "Amazon",
  //     position: "Product Manager",
  //     recruiter: "alexj@amazonjobs.net",
  //     description: `Amazon is seeking an operations manager to oversee our fulfillment center operations. The ideal candidate will be responsible for managing and directing the day-to-day activities of our warehouse and distribution center. You will work on a team of experienced managers, collaborating on projects from ideation to implementation.

  //         The successful candidate will have experience in supply chain management, logistics, and operations. You should be familiar with Lean Six Sigma methodologies, and have experience with inventory management, quality assurance, and process improvement. You will need to have experience managing a large team of employees, and have excellent communication and leadership skills. A degree in operations management, business administration, or a related field is a must.
          
  //         At Amazon, we value diversity and believe that diverse teams make for better products. We are looking for someone who is passionate about operations management and who is dedicated to delivering exceptional customer experiences.`,
  //     skills: ["Javscript", "AWS EC2", "jQuery"],
  //     comp: 50000,
  //     posted: "3/5/2022"
  //   },
  //   {
  //     jobID: 434567,
  //     company: "Meta",
  //     position: "CEO",
  //     recruiter: "hillary@metanewgrad.recruiting",
  //     description: `We are looking for a data scientist to join our team at Meta (formerly Facebook). As a data scientist, you will be responsible for developing and deploying machine learning models to improve our products and services, such as the News Feed, Instagram, and WhatsApp. You will work on a team of experienced data scientists, collaborating on projects from ideation to implementation.

  //         The ideal candidate will have experience in statistics, machine learning, and data mining. You should be familiar with programming languages such as Python and R, and have experience with data visualization tools such as Tableau and Power BI. You will need to have experience with data preprocessing, feature engineering, and model selection. A degree in computer science, statistics, or a related field is a must.
          
  //         At Meta, we value diversity and believe that diverse teams make for better products. We are looking for someone who is passionate about data science and who is`,
  //     skills: ["Instagram", "Ruby on Rails", "Django"],
  //     comp: 5000000,
  //     posted: "4/5/2021"
  //   }]

  return (
    <JobWrapper>
      {jobData.map((jobData) => <JobListing key={jobData.id} jobInfo={jobData} />)}
    </JobWrapper>
  )
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const JobWrapper = styled.section`
  display: flex;
  align-content: start;
  flex-direction: column;

  /* min-height: 700px; */
  padding-bottom: 138px;
  padding-top: 400px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  margin: auto;
  animation: 1.9s ${fadeIn} ease-out;
  
  max-width: 1000px;
  float: left; // allows for boxes to be aligned left
  gap: 25px;

  /* margin-top: 30px; // buffer to show me more */

  /* @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  } */
`;

export default JobLayout;

