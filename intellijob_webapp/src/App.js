import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import CreateJob from './components/CreateJob/CreateJob';

// TODO: redirect home based on user auth
// TODO: pass in props to Navbar based on auth

const App = () => {

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const update = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        window.localStorage.setItem('localUser', JSON.stringify(authUser));
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

  if (role === null) {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
  else if (role === "Jobseeker") {
    return (
      <div className="App">
        <BrowserRouter>
          <UserNavbar name={name}/>
          <Routes>
            <Route path='/' element={<JobseekerHome name={name} user={user} />} />
            <Route path='/saved' element={<UserSavedHome name={name} user={user} />} />
            <Route path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
  else if (role === "Employer") {
    return (
      <div className="App">
        <BrowserRouter>
          <EmployerNavbar name={name}/>
          <Routes>
            <Route path='/' element={<EmployerHome name={name} user={user} />} />
            <Route path='/createjob' element={<CreateJob name={name} user={user} />} />
            <Route path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

// jobseeker and employer endpoints will be removed in the future to be based on user type

export default App;
