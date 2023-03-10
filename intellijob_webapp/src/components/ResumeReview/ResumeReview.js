import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const API_URL = "http://localhost:3001/"

const ResumeReview = ({ name, user }) => {
    const [resume, setResume] = useState('')
    //const [recs, setRecs] = useState('')
    const [shownChars, setShownChars] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const HeroPlaceholder = "Receive an AI-Powered Resume Review."

    useEffect(() => {
        const interval = setInterval(() => {
            setShownChars(c => c + 1)
        }, 30); //should be 40
        return () => clearInterval(interval);
    }, []);

    const editForm = (e) => { //update the value of the inputted resume or the recommendations from ChatGPT
        e.preventDefault();
        const updatedForm = e.target.value
        setResume(updatedForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)

        const requestOptions = {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*'
            },
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({resume: resume, uid: user.uid})
          };

          try {
            const res = await fetch(API_URL + 'resumeReview', requestOptions)
            console.log(res)
            const json = await res.json()
            console.log(json)
            }
            catch (err){
              console.log(err)
            }
    }


    useEffect(() => {
        console.log(resume)
    }, [resume]);

    return (
        <Wrapper>
            <HeroWrapper>
                <Hero>
                    <h1>{HeroPlaceholder.substring(0, shownChars)}</h1>
                    {shownChars >= HeroPlaceholder.length + 10}
                    <StyledForm>
                        <InputWrapper>
                            <StyledDesc type="text" value={resume} placeholder={"Paste your resume here"} onChange={e => editForm(e)} />
                            <StyledButton onClick={handleSubmit} type="submit">Submit </StyledButton>
                        </InputWrapper>
                    </StyledForm>
                </Hero>
            </HeroWrapper>
            <RecommendationWrapper>
                <Recommendation>
                    <div>
                        <h2> {isSubmitting ? 'Generating recommendations...' : ''} </h2>


                    </div>
                </Recommendation>
            </RecommendationWrapper>
        </Wrapper>
    )

}

const Wrapper = styled.div`
  padding: 0px;
`;

const HeroWrapper = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 400px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1100px;
  align-items: center;
  margin: auto;
  
  /* @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  } */
`;

const RecommendationWrapper = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 400px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1100px;
  align-items: center;
  margin: auto;
`;

const Recommendation = styled.div`
width: 100%;
h1 {
padding-bottom: 0;
font-size: 80px;
color: white;
font-weight: 500;
line-height: 100px;
text-align: left;
}
`;

const Hero = styled.div`
    width: 100%;
  
    h1 {
    padding-bottom: 0;
    font-size: 80px;
    color: white;
    font-weight: 500;
    line-height: 100px;
    text-align: left;
    /* @media (max-width: 768px) {
      font-size: 20px;
      width: 100%;
      line-height: 2;
    } */
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`


const StyledForm = styled.form`
  padding-top: 50px;
  animation: 1.1s ${fadeIn} ease-out;
  max-width: 800px;
`

const InputWrapper = styled.div`
    max-width: 800px;
`

const StyledDesc = styled.textarea`
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #121212;
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  height: 200px;
  font-family: Arial;
`

const StyledButton = styled.button`
text-align: left;
float: left;

border: 1px solid #ccc;
border-radius: 35px;
background-color: #121212;
color: #FF5733;
border-color: #FF5733;
padding: 15px;
margin-top: 15px;
cursor: pointer;

font-size: 16px;
height: 50px;
transition-duration: 500ms;

&:hover {
  text-decoration: none;
  transition-duration: 500ms;
  background-color: #FF5733;
  color: white;
  cursor: pointer;
  }

`


export default ResumeReview;