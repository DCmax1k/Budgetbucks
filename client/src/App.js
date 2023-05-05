import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import IndexPage from './components/IndexPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>


      <div className="App">

        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<Dashboard/> } />
        </Routes>
      
      </div>


    </Router>
    
  );
}

export default App;
