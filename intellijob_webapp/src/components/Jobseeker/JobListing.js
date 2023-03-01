import styled, { keyframes } from "styled-components";
import { useState, useEffect} from "react";

// This is the individual listing for a job

const JobListing = ({jobInfo}) => {

    return(
        <ListingWrapper>
            <a style={{color: "white"}}> Test JOB 
                {jobInfo.company}
                {jobInfo.positon}
                {jobInfo.jobDesc}
                {jobInfo.skills}
                {jobInfo.comp}
            </a>
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
    text-align: center;

    width: 100%;
    height: 250px;
`

export default JobListing