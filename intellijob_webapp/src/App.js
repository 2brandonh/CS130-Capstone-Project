import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/DefaultNavbar';
import UserNavbar from './components/Navbar/UserNavbar';
import EmployerNavbar from './components/Navbar/EmployerNavbar';
import Home from "./components/Home";
import Signup from "./components/Signup/Signup";
import JobseekerHome from './components/Jobseeker/JobseekerHome';
import EmployerHome from './components/Employer/EmployerHome';
import UserSavedHome from './components/UserSaved/UserSavedHome';
import Login from './components/Login/Login';
import { auth } from './components/firebase.js';

// TODO: redirect home based on user auth
// TODO: pass in props to Navbar based on auth

const App = () => {

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const update = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        setUser(authUser);
        setRole(authUser.displayName.split(":")[0])
        setName(authUser.displayName.split(":")[1])
      } else { // log out
        setUser(null);
        setRole(null)
        setName(null)
      }
    });
  }, []);

  const Homepage = () => {
    if (role === null){
      return <Home/>
    }
    else if (role === "Jobseeker"){
      return <JobseekerHome name={name} user={user}/>
    }
    else if (role === "Employer"){
      return <EmployerHome name={name} user={user}/>
    }
  }

  const getNavbar = () => {
    if (role === null) {
      return <Navbar />
    }
    else if (role === "Jobseeker") {
      return <UserNavbar name={name}/>
    }
    else if (role === "Employer") {
      return <EmployerNavbar name={name}/>
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        {getNavbar()}
        <Routes>
          <Route path='/' element={Homepage()} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/jobseeker' element={<JobseekerHome />} />
          <Route path='/employer' element={<EmployerHome />} />
          <Route path='/saved' element={<UserSavedHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// jobseeker and employer endpoints will be removed in the future to be based on user type

export default App;
