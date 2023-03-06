import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/"

const CreateJob = ({ user, name }) => {
  const [shownChars, setShownChars] = useState(0)
  const [form, setForm] = useState( //We use an object for state tracking due to the large number of form parameters
    {
      company: "",
      position: "",
      description: "",
      location: "",
      skills: "",
      comp: "",
      user_id: ""
    }
  )

  let navigate = useNavigate();

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
    }, 30); //should be 40
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({...form, user_id: user.uid})

    const requestOptions = {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...form, user_id: user.uid}) //using destructuring
    };

    try {
    const res = await fetch(API_URL + 'createJob', requestOptions)
    console.log(res)
    const json = await res.json()
    console.log(json)
    }
    catch (err){
      console.log(err)
    }
      // .then(response => console.log(response.json()))
      // .then(data => console.log(data));
  }
  // validate email and password



const HeroPlaceholder = name + ", we're excited for you to tell us about your new position."

return (
  <HeroWrapper>
    <Hero>
      <h1> {HeroPlaceholder.substring(0, shownChars)} </h1>
      {shownChars >= HeroPlaceholder.length + 10 &&
        <StyledForm onSubmit={handleSubmit}>
          <InputWrapper>
            <StyledInput type="text" value={form.email} placeholder={"Position"} onChange={e => editForm(e, "position")} />
            <StyledInput type="text" value={form.skills} placeholder={"Skills"} onChange={e => editForm(e, "skills")} />
            <StyledInput type="text" value={form.comp} placeholder={"Compensation"} onChange={e => editForm(e, "comp")} />
            <StyledInput type="text" value={form.company} placeholder={"Company"} onChange={e => editForm(e, "company")} />
            <StyledInput type="text" value={form.location} placeholder={"Location"} onChange={e => editForm(e, "location")} />
            <StyledDesc type="text" value={form.description} placeholder={"Description"} onChange={e => editForm(e, "description")} />
            <StyledButton type="submit">Submit Job</StyledButton>
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

export default CreateJob;