import React from "react";
import QuestionniareComponent from "./components/Questionnaire";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <QuestionniareComponent questionnaire_number={0} />
    </div>
  );
}

export default App;
