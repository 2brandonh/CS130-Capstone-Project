import styled, { keyframes } from "styled-components";
import { useState, useEffect} from "react";
import EmployerListing from "./EmployerListing";
const API_URL = "http://localhost:3001/"

// This controls the layout and mapping of jobs on a page

const EmployerLayout = ({user}) => {
  const getJobs = async () => {
    try {
      const requestOptions = {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({uid: user.uid})
      }
      try {
        const res = await fetch(API_URL + 'fetchCreatedJobs', requestOptions)
        const json = await res.json()
        console.log(json)
        setCreatedJobs(json)
        }
        catch (err){
          console.log(err)
        }
      }
      catch (err){
        console.log(err)
      }
  }

  useEffect(() => {
    getJobs();
  },[])
  const [createdJobs, setCreatedJobs] = useState([])
    return(
        <JobWrapper>
            {createdJobs.map((jobData) => <EmployerListing jobInfo={jobData} user={user} createdJobs={createdJobs} setCreatedJobs={setCreatedJobs}/>)}
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

export default EmployerLayout;

