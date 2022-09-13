import React from "react";
import axios from "axios";

interface QuestionnaireState {
  question_text: string;
};

interface QuestionnaireProps {};

interface Question{
  question_text : string;
  choices_text : string[];
};



class Questionnaire extends React.Component<
  QuestionnaireProps,
  QuestionnaireState
> {
  constructor(props: QuestionnaireProps) {
    super(props);
    this.state = {
      question_text : "This sucks",
    };

    
  }


  render() {
    return <div>{this.state.question_text}</div>;
  }

  getAndSetQuestions(){
    axios
      .get<Question[]>("http://localhost:8000/questionnaire/")
      .then((res) => this.setState({question_text : res.data[0].question_text}))
      .catch((err) => console.log(err));
  }

  componentDidMount(): void {
      this.getAndSetQuestions();
  }
}

export default Questionnaire;
