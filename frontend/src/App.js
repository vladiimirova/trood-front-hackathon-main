import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComp from './components/Router/RouterComp';
import Header from './components/Layout/Header/Header';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import Footer from './components/Layout/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex ">
        <Router>
          <Sidebar />
          <div className="flex-1 bg-custom pt-[61px] pr-[54px] pl-[66px] rounded-tl-[16px]">
            <RouterComp />
          </div>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
