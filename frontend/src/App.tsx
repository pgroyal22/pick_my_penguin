import React from 'react';
import './App.css';
import QuestionniareComponent from './components/Questionnaire'

function App() {

  return (
    <div className="App">
      <QuestionniareComponent questionnaire_number={0} />
    </div>
  );
}

export default App;
