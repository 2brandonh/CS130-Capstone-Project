import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home,
  Register,
} from './Pages'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
