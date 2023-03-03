import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { getAuth, logInWithEmailAndPassword } from "../firebase";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate(); 
  const [shownChars, setShownChars] = useState(0)
  const [form, setForm] = useState( //We use an object for state tracking due to the large number of form parameters
    {
      email: "",
      pass: "",
    }
  )
  console.log(getAuth().currentUser)
  const editForm = (e, key) => {
    e.preventDefault();

    const updatedForm = {
      ...form,
      [key]: e.target.value,
    };
    setForm(updatedForm)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setShownChars(c => c + 1)
    }, 22); //should be 40
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logInWithEmailAndPassword(form.email, form.pass).then(() => {
        navigate("/saved");
      })
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  const HeroPlaceholder = "We're glad to have you back with us."

  return (
    <HeroWrapper>
      <Hero>
        <h1> {HeroPlaceholder.substring(0, shownChars)} </h1>
        {shownChars >= HeroPlaceholder.length + 10 &&
          <StyledForm onSubmit={handleSubmit}>
            <InputWrapper>
              <StyledInput type="text" value={form.email} placeholder={"Email"} onChange={e => editForm(e, "email")} />
              <StyledInput type="password" value={form.pass} placeholder={"Password"} onChange={e => editForm(e, "pass")} />

              <StyledButton type="submit">Sign In</StyledButton>
            </InputWrapper>
          </StyledForm>
        }
      </Hero>
    </HeroWrapper>
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const StyledForm = styled.form`
/* padding-top: 30px; */
animation: 1.1s ${fadeIn} ease-out;
max-width: 800px;
`

const InputWrapper = styled.div`
  max-width: 500px;
`

const StyledInput = styled.input`
width: 100%;
margin-top: 15px;
padding: 12px;

padding-left: 15px;

border: 1px solid #ccc;
border-radius: 35px;
background-color: #121212;
height: 30px;
font-size: 16px;
font-weight: 500;
color: white;
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

export default Login;