import styled, { keyframes } from "styled-components";
import { useState, useEffect} from "react";
import JobListing from "./JobListing";

// This controls the layout and mapping of jobs on a page

const JobLayout = () => {

    let testJobs =
    [{
            jobID: 1,
            company: "Apple",
            positon: "SWE II",
            jobDesc: "Slavery",
            skills: ["C++", "C#"],
            comp: 123000
        },
        {
            jobID: 2,
            company: "Google",
            positon: "SWE III",
            jobDesc: "Rest and Vest",
            skills: ["Go", "C++"],
            comp: 2323000
        },
        {
            jobID: 3,
            company: "Amazon",
            positon: "Product Manager",
            jobDesc: "Bezos and Co",
            skills: ["Javscript", "AWS EC2"],
            comp: 50000
        },
        {
            jobID: 4,
            company: "Meta",
            positon: "New CEO",
            jobDesc: "Place where Kev and Brandon got rejected",
            skills: ["Instagram"],
            comp: 5000000
        }]

    return(
        <JobWrapper>
            {testJobs.map((jobData) => <JobListing key={jobData.jobID} jobInfo={jobData}/>)}
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
  
  max-width: 975px;
  float: left; // allows for boxes to be aligned left
  gap: 25px;

  /* margin-top: 30px; // buffer to show me more */

  /* @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  } */
`;

export default JobLayout;

