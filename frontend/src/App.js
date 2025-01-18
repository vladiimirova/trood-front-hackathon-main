import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComp from './components/Router/RouterComp'

function App() {
  return (
    <div className="App">
       <Router>  
        <RouterComp />
      </Router>
    </div>
  );
}

export default App;
