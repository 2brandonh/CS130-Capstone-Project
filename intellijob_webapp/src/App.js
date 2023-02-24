import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./components/Login.js"

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;