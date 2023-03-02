import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import JobLayout from "./UserSavedLayout";

const UserSavedHome = () => {
  const [shownChars, setShownChars] = useState(0)
  const [formStatus, setFormStatus] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setShownChars(c => c + 1)
    }, 0); //should be 32
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { // Smoother transition with form scrolling
    window.scrollTo(0, 0)
  }, [formStatus])

  const HeroPlaceholder = "Interested? You saved these jobs previously."

  return (
    <HeroWrapper>
      <Hero>
        <h1> {HeroPlaceholder.substring(0, shownChars)} </h1>
        {shownChars >= HeroPlaceholder.length + 10 && (
          <div>
            <ButtonWrapper>
              <Button onClick={() => { }}>Show me more</Button>
              {/* <Button onClick={() => {}}>Polish resume</Button>
                          <Button onClick={() => {}}>Write cover letter</Button> */}
            </ButtonWrapper>
            <JobLayout />
          </div>
        )}
      </Hero>
    </HeroWrapper >
  )
}

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
const Hero = styled.div`
    width: 100%;
  
    h1 {
    padding-bottom: 35px;
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

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Button = styled.div`
    box-shadow: inset 0 0 0 1px #FF5733;
    color: #FF5733;
    border-radius: 40px;
    transition-duration: 170ms;
    font-size: 23px;
    font-weight: 700;
    line-height: 40px;
    padding: 12px 40px;
    transition-duration: 500ms;
    text-align: center;
    max-width: 200px;
    animation: 1.9s ${fadeIn} ease-out;

  &:hover {
    text-decoration: none;
    transition-duration: 500ms;
    background-color: #FF5733;
    color: white;
    cursor: pointer;
  }
    `;

const Button2 = styled.div`
box-shadow: inset 0 0 0 1px #FF5733;
color: #FF5733;
border-radius: 40px;
transition-duration: 170ms;
font-size: 23px;
font-weight: 700;
line-height: 40px;
padding: 12px 40px;
transition-duration: 500ms;
text-align: center;
max-width: 200px;

&:hover {
text-decoration: none;
transition-duration: 500ms;
background-color: #FF5733;
color: white;
cursor: pointer;
}
`;

const ButtonClick = styled.div`
    box-shadow: inset 0 0 0 1px #FF5733;
    color: white;
    background-color: #FF5733;
    border-radius: 40px;
    transition-duration: 170ms;
    font-size: 23px;
    font-weight: 700;
    line-height: 40px;
    padding: 12px 40px;
    transition-duration: 500ms;
    text-align: center;
    max-width: 200px;

  &:hover {
    cursor: pointer;
  }
    `;

export default UserSavedHome;