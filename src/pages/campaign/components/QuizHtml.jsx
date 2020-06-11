import React from "react";
import {questionhtml} from './QuestionHtml';
import Quiz from 'react-quiz-component';
class QuizHTML extends React.Component {
    render() {
  return (
    <div  className="test">
      <Quiz quiz={questionhtml} shuffle={true} showInstantFeedback={true} continueTillCorrect={true}/>
    </div>
  );
    }
}
export default QuizHTML;

