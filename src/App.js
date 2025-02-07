import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AnalyzePage from './components/AnalyzePage';
import AboutPage from './components/AboutPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
