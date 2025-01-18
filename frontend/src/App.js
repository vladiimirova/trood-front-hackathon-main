import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComp from './components/Router/RouterComp';
import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container m-0 mx-auto flex justify-between">
        <Router>
          <Sidebar />
          <RouterComp />
        </Router>
      </div>
    </div>
  );
}

export default App;
