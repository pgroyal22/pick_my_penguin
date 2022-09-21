import React from "react";
import axios from "axios";
import { Url } from "url";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";

/* Questionnaire interfaces */
interface Option {
  option_order: number;
  option_text: string;
  image_url?: Url;
}

interface Question {
  question_order: number;
  question_text: string;
  options: Option[];
}

interface Questionnaire {
  questions: Question[];
}

/* prop and state typing */
interface QuestionnaireProps {
  questionnaire_number: number;
}
interface QuestionnaireState {
  questionnaire: Questionnaire;
  progress: number;
}

interface QuestionProps {
  question: Question;
  handleQuestionSubmit: (e: React.SyntheticEvent) => void;
}
interface QuestionState {
  selected_option: number | null;
}

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  constructor(props: QuestionProps) {
    super(props);
    this.state = {
      selected_option: null,
    };
    this.onChangeRadio = this.onChangeRadio.bind(this);
  }

  onChangeRadio = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      selected_option: Number(event.currentTarget.value),
    });
  };

  render(): JSX.Element {
    const JSXoptions = [] as JSX.Element[];
    const question = this.props.question;
    const options = question.options;
    for (let i = 0; i < options.length; i++) {
      var option = options[i];
      JSXoptions.push(
        <div key={option.option_order} className="radio">
          <label>
            <input
              type="radio"
              value={option.option_order}
              checked={this.state.selected_option === i}
              onChange={this.onChangeRadio}
            />
            {this.props.question.options[i].option_text}
          </label>
        </div>
      );
    }
    return (
      <form onSubmit={this.props.handleQuestionSubmit}>
        {question.question_order + 1}. {question.question_text}
        {JSXoptions}
        <button type="submit">Next Question</button>
      </form>
    );
  }
}

class QuestionnaireComponent extends React.Component<
  QuestionnaireProps,
  QuestionnaireState
> {
  constructor(props: QuestionnaireProps) {
    super(props);
    this.state = {
      questionnaire: {
        questions: [
          {
            question_order: 0,
            question_text: "What types of penguins do you prefer?",
            options: [
              {
                option_order: 0,
                option_text: "A Gentoo",
              },
              {
                option_order: 1,
                option_text: "An Arch",
              },
            ],
          },
        ],
      },
      progress: 1,
    };

    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
  }

  handleQuestionSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const new_progress = this.state.progress + 1;
    this.setState({ progress: new_progress });
  }

  handlePaginationClick(i: number) {
    this.setState({ progress: i });
  }

  getAndSetQuestions(questionnaire_number: number) {
    axios
      .get<Questionnaire[]>("http://localhost:8000/questionnaire/")
      .then((res) =>
        this.setState({ questionnaire: res.data[questionnaire_number] })
      )
      .catch((err) => console.log(err));
  }

  componentDidMount(): void {
    console.log(this.props.questionnaire_number);
    this.getAndSetQuestions(this.props.questionnaire_number);
  }

  render(): JSX.Element {
    const JSXQuestionComponents = [] as JSX.Element[];
    const JSXPatiginations = [] as JSX.Element[];
    for (let i = 0; i < this.state.questionnaire.questions.length; i++) {
      JSXQuestionComponents.push(
        <QuestionComponent
          key={i}
          handleQuestionSubmit={this.handleQuestionSubmit}
          question={this.state.questionnaire.questions[i]}
        />
      );
      JSXPatiginations.push(
        <Pagination.Item
          key={i}
          active={i + 1 === this.state.progress}
          onClick={() => this.handlePaginationClick(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    return (
      <div className="Questionniare">
        <Pagination>{JSXPatiginations}</Pagination>
        <Card>
          <Card.Body>
            {JSXQuestionComponents[this.state.progress - 1]}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default QuestionnaireComponent;
