import React, { SyntheticEvent } from "react";
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
  handleQuestionSubmit: (e: SyntheticEvent) => void;
}
interface QuestionState {}

interface OptionProps {
  option: Option;
}
interface OptionState {}

class OptionComponent extends React.Component<OptionProps, OptionState> {
  render(): JSX.Element {
    return (
      <div>
        {this.props.option.option_order + 1}. {this.props.option.option_text}
      </div>
    );
  }
}

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  constructor(props: QuestionProps) {
    super(props);
  }
  render(): JSX.Element {
    // pushing option JSX elements to an array instead of individually placing them in returned JSX
    const OptionComponentJSXs = [] as JSX.Element[];
    for (let i = 0; i < this.props.question.options.length; i++) {
      OptionComponentJSXs.push(
        <div>
          <OptionComponent key={i} option={this.props.question.options[i]} />
        </div>
      );
    }
    return (
      <form onSubmit={this.props.handleQuestionSubmit}>
        {this.props.question.question_order + 1}.{" "}
        {this.props.question.question_text}
        <div>{OptionComponentJSXs}</div>
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
    const QuestionComponentJSXs = [] as JSX.Element[];
    const PaginationJSXs = [] as JSX.Element[];
    for (let i = 0; i < this.state.questionnaire.questions.length; i++) {
      QuestionComponentJSXs.push(
        <QuestionComponent
          handleQuestionSubmit={this.handleQuestionSubmit}
          question={this.state.questionnaire.questions[i]}
        />
      );
      PaginationJSXs.push(
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
      <Card>
        <Pagination>{PaginationJSXs}</Pagination>
        <Card.Body>{QuestionComponentJSXs[this.state.progress - 1]}</Card.Body>
      </Card>
    );
  }
}

export default QuestionnaireComponent;
