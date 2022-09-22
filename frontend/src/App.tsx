import React from "react";
import QuestionniareComponent from "./components/Questionnaire";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <QuestionniareComponent questionnaire_number={0} />
    </div>
  );
}

export default App;
