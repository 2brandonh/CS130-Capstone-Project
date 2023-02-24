import styled, { keyframes } from "styled-components";
import { useState, useEffect} from "react";

const Login = (props) => {
    const [shownChars, setShownChars] = useState(0)
    const [index, setIndex] = useState(0);

    const HeroPlaceholder = "Welcome to the largest AI empowered professional community."

    const TEXTS = [
        "job search.",
        "hiring.",
        "resume.",
        "cover letters.",
        "candidate search.",
        "recruitment.",
        "offers.",
        "compensation.",
        "talent acquisiton."
    ]

    useEffect(() => {
      const interval = setInterval(() =>
        setIndex(index => index + 1),
        1000 // every 3 seconds
      );
      return () => clearTimeout(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setShownChars(c => c + 1)
          }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <Wrapper>
            <Navbar>
                <a href="/">
                    <img src="/images/brand_logo.png" alt="" />
                </a>
                <div>
                    <Join>Join Now</Join>
                    <Sign>Sign In</Sign>
                </div>
            </Navbar>
            
            <HeroWrapper>
                <Hero>
                    <h1>{HeroPlaceholder.substring(0, shownChars)}</h1>
                    {shownChars >= HeroPlaceholder.length + 10 &&
                        <div>
                            <Subtext>Find out how we can help you empower your {TEXTS[index % TEXTS.length]}</Subtext>
                            <Join2>Count Me In</Join2>
                        </div>
                    }
                </Hero>
            </HeroWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 0px;
`;

const Navbar = styled.nav`
    max-width: 1100px; // controls the width at which IntelliJob and Sign Up are
    margin: auto;
    padding: 12px 0 16px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    flex-wrap: nowrap;
    /* background-color: #181818; */ //background color of the navbar (does not stretch across)
    /* & > a {
    width: 150px;
    height: 34px;
    @media (max-width: 768px) {
        padding: 0 5px;
    }
    } */

    & > a > img {
    max-width: 200px;
    }
`;

const Join = styled.a`
    font-size: 18px;
    padding: 10px 10px;
    text-decoration: none;
    border-radius: 4px;
    color: white;
    margin-right: 12px;
    transition-duration: 500ms;

    &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: #FF5733;
    text-decoration: none;
    transition-duration: 500ms;
    }
`;

const Sign = styled.a`
    box-shadow: inset 0 0 0 1px #FF5733;
    color: #FF5733;
    border-radius: 24px;
    transition-duration: 170ms;
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    padding: 12px 30px;
    transition-duration: 500ms;

  &:hover {
    padding: 12px 50px;
    text-decoration: none;
    transition-duration: 500ms;
  }
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

const Subtext = styled.div`
    padding-top: 35px;
    padding-bottom: 35px;
    font-size: 30px;
    color: #FF5733;
    font-weight: 100;
    line-height: 100px;
    text-align: left;
    animation: 1.9s ${fadeIn} ease-out;
`;

const Join2 = styled.div`
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
    max-width:250px;
    padding: 12px 40px;
    text-decoration: none;
    transition-duration: 500ms;
  }
    `;

export default Login;