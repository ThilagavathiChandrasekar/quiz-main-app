import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './styles/Home.css';
// import './styles/Play.css';
// import './styles/QuizIns.css';

import Home from './components/Home';
import QuizInstructions from './components/quiz/QuizInstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import '../src/styles/Common.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/instructions" element={<QuizInstructions/>} />
        <Route path="/play/quiz" element={<Play/>} />
        <Route path="/play/quizSummary" element={<QuizSummary/>} />
      </Routes>
    </Router>
  );
}

export default App;