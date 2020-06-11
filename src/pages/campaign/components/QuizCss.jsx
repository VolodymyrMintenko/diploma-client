import React from "react";
import {questioncss} from './QuestionCss';
import Quiz from 'react-quiz-component';
class QuizCSS extends React.Component {
    render() {
  return (
    <div  className="test">
      <Quiz quiz={questioncss} shuffle={true} showInstantFeedback={true} continueTillCorrect={true}/>
    </div>
  );
    }
}
export default QuizCSS;

