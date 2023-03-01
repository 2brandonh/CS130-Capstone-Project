import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/DefaultNavbar';
import Login from "./components/Login"
import Signup from "./components/Signup/Signup"
import JobseekerHome from './components/Jobseeker/JobseekerHome';

// TODO: redirect home based on user auth
// TODO: pass in props to Navbar based on auth

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' />

          <Route path='/jobseeker' element={<JobseekerHome/>}/> 
          <Route path='/employer' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// jobseeker and employer endpoints will be removed in the future to be based on user type

export default App;
