import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./components/Login"

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
