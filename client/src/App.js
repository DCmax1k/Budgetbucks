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
          <Route path="/agreements/termsofuse" element={<div>Budget Bucks is still in beta and available free to the public for testing. The terms of use are coming soon!</div> } />
          <Route path="/agreements/privacypolicy" element={ <div>Budget Bucks is still in beta and available free to the public for testing. The privacy policy is coming soon!</div> } />
        </Routes>
      
      </div>


    </Router>
    
  );
}

export default App;
