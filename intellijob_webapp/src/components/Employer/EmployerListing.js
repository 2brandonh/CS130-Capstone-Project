import styled, { keyframes } from "styled-components";
import { useState, useEffect} from "react";
const API_URL = "http://localhost:3001/"
// This is the individual listing for a job

const EmployerListing = ({jobInfo, user, createdJobs, setCreatedJobs}) => {
    const deleteJob = async (action) => {
        const url = API_URL + 'deleteJob'
        const requestOptions = {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*'
            },
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({jobid: jobInfo.id, uid: user.uid})
          };
          try {
            const res = await fetch(url, requestOptions)
            console.log(res)
            const newJobs = createdJobs.filter(job => job.id !== jobInfo.id)
            setCreatedJobs(newJobs)
            }
            catch (err){
                console.log(err)
            }
    }
    return(
        <ListingWrapper>
            <InnerWrapper>
                <Header>
                    <a style={{float: "left", color: "white"}}>{jobInfo.position}</a>
                    <a style={{float: "right", color: "#FF5733", "font-weight": "500"}}>${jobInfo.comp.toLocaleString("en-US")}</a>
                </Header>

                {/* 
                
                Job company info and recruiter is unnecessary for employee page, instead show id

                <Company>
                    <a> {jobInfo.company}</a>
                    <a> {jobInfo.recruiter}</a>
                </Company> */}

                <Company>
                    <a> Position ID • {jobInfo.jobID}</a>
                    <a> Posted on {jobInfo.posted}</a>
                </Company>

                <Company>
                    <a style={{float: "left", color: "#ca3f5f"}}>{
                    jobInfo.skills.join('  •  ') 
                    }</a>
                </Company>

                <Description>
                    <a>{jobInfo.description}</a>
                </Description>

                <ButtonWrapper>
                    <Button onClick={() => {deleteJob()}}>Remove Position</Button>
                    {/* <Button onClick={() => { }}>Cover Letter</Button> */}
                </ButtonWrapper>

            </InnerWrapper>
            {/* <a style={{color: "white"}}> Test JOB 
                {jobInfo.company}
                {jobInfo.positon}
                {jobInfo.jobDesc}
                {jobInfo.skills}
                {jobInfo.comp}
            </a> */}
        </ListingWrapper>
    )
}

const ListingWrapper = styled.section`
    box-shadow: inset 0 0 0 1px #0e9094;
    color: #0e9094;
    border-radius: 20px;
    transition-duration: 170ms;
    font-size: 23px;
    font-weight: 700;
    line-height: 40px;
    padding: 12px 40px;
    transition-duration: 500ms;

    width: 100%;
    height: 100%;
`
const InnerWrapper = styled.section`
    align-content: left;
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: 50;

    text-align: left;

    flex-direction: column;
    display: flex;
`

const Header = styled.section`
    font-size: 30px;
`

const Company = styled.section`
    font-size: 20px;
    flex-direction: column;
    display: flex;
    margin-top: 13px;

    & > a {
        line-height: 1.5;
    }

`

const Description = styled.section`
    margin-top: 30px;
    font-size: 20px;
    line-height: 1.5;
    color: #cfcfcf;
    white-space: pre-line;
`


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`


const ButtonWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    gap: 15px;
`;


const Button = styled.div`
    box-shadow: inset 0 0 0 1px #FF5733;
    color: #FF5733;
    border-radius: 40px;
    transition-duration: 170ms;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    padding: 12px 20px;
    transition-duration: 500ms;
    text-align: center;
    max-width: 250px;
    animation: 1.9s ${fadeIn} ease-out;

  &:hover {
    text-decoration: none;
    transition-duration: 500ms;
    background-color: #FF5733;
    color: white;
    cursor: pointer;
  }
`;

export default EmployerListing