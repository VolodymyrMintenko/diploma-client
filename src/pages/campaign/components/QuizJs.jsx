import React from "react";
import {questionjs} from './QuestionJs';
import Quiz from 'react-quiz-component';
class QuizJS extends React.Component {
    render() {
  return (
    <div  className="test">
      <Quiz quiz={questionjs} shuffle={true} showInstantFeedback={true} continueTillCorrect={true}/>
    </div>
  );
    }
}
export default QuizJS;

