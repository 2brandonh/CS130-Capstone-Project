import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { logout } from "../firebase";
import { useState } from "react";

const UserNavbar = ({name}) => {
    let navigate = useNavigate(); 
    let auth = getAuth();
    const user = auth.currentUser;
    const routeSignUp = () =>{ 
      let path = `signup`; 
      navigate(path);
    }

    const routeResume = () =>{ 
        let path = `resume`; 
        navigate(path);
      }

    const routeSaved = () =>{ 
        let path = `saved`; 
        navigate(path);
      }
    
    const logoutUser = () => {
        navigate("/");
        logout();
    }

    return(
        <Nav>
            <a href="/">
                <img src="/images/brand_logo.png" alt="" />
            </a>
            {/* {getAuth().currentUser !== null && <div>
                <Join >Hello {getAuth().currentUser.displayName}</Join>
                <Sign onClick={logoutUser}>Sign Out</Sign>
            </div>} */}
            <div>
                <Static> Welcome, {name} </Static>
                <Join onClick={routeSaved}>Saved Jobs</Join>
                <Join onClick={routeResume}>Resume Review</Join>
                <Sign onClick={logoutUser}>Sign Out</Sign>
            </div>
        </Nav>
    )
}

const Nav = styled.nav`
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

const Static = styled.a`
    font-size: 18px;
    padding: 10px 10px;
    text-decoration: none;
    border-radius: 4px;
    color: white;
    margin-right: 12px;
    transition-duration: 500ms;
`

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
    cursor: pointer;
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
    cursor: pointer;
  }
`;

export default UserNavbar;