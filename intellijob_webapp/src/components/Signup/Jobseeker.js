import { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";
import { useNavigate } from "react-router-dom";
import { registerJobseekerWithEmailAndPassword } from "../firebase";
import JobseekerHome from "../Jobseeker/JobseekerHome";

const Jobseeker = () => {

    let navigate = useNavigate();
    const [form, setForm] = useState( //We use an object for state tracking due to the large number of form parameters
        {
            first: "",
            last: "",
            industry: "",
            yoe: "",
            description: "",
            email: "",
            pass: "",
            pass2: ""
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate password and set passwordInvalid state accordingly
        if (form.pass !== form.pass2) {
          alert("Passwords must match");// setPasswordInvalid(true);
        } else {
            try {
              await registerJobseekerWithEmailAndPassword(form.first, form.last, form.industry, form.yoe, form.description, form.email, form.pass).then((result) => {
                if (result)
                  navigate("/");
              })
              
            } catch (error) {
              console.log(error)
              alert(error.message)
            }
         }  
      
    }

    const editForm = (e, key) => {
        e.preventDefault();

        const updatedForm = {
            ...form,
            [key]: e.target.value,
        };
        setForm(updatedForm)
    }

    useEffect(() => {
        console.log(form)
    }, [form]);

    return (
        <StyledForm onSubmit={handleSubmit}>
                <InputWrapper>
                    <StyledInput type="text" value={form.first} placeholder={"First Name"} onChange={e => editForm(e, "first")}/>
                    <StyledInput type="text" value={form.last} placeholder={"Last Name"} onChange={(e) => editForm(e, "last")} />

                    <StyledRow>
                        <StyledInput type="text" value={form.yoe} placeholder={"YOE"} onChange={e => editForm(e, "yoe")}/>
                        <StyledInput type="text" value={form.industry} placeholder={"Industry"} onChange={e => editForm(e, "industry")} />
                    </StyledRow>

                    <StyledInput type="text" value={form.email} placeholder={"Email"} onChange={(e) => editForm(e, "email")} />
                    <StyledInput type="password" value={form.pass} placeholder={"Password"} onChange={e => editForm(e, "pass")}/>
                    <StyledInput type="password" value={form.pass2} placeholder={"Confirm Password"} onChange={e => editForm(e, "pass2")} />
                    <StyledDesc type="text " value={form.description} placeholder={"What is your ideal job? What past experiences have led you to this point?"} onChange={e => editForm(e, "description")} />

                    <StyledButton type="submit">Find your next job</StyledButton>
                </InputWrapper>
        </StyledForm>
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


const StyledForm = styled.form`
  padding-top: 50px;
  animation: 1.1s ${fadeIn} ease-out;
  max-width: 800px;
`

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 530px;
    gap: 10px;
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

export default Jobseeker;