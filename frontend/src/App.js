import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComp from './components/Router/RouterComp'
import Header from './components/Layout/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
       <Router>  
        <RouterComp />
      </Router>
    </div>
  );
}

export default App;
