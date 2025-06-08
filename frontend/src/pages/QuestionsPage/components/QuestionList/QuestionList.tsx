import type { Question } from '../../../../services/api/QuizzesService';
import QuestionListItem from '../QuestionListItem/QuestionListItem';
import './QuestionList.css';


type QuestionListProps = {
  questions: Question[];
  filteredQuestionIDs: string[];
}

/**
 * Component to render a list of questions.
 * It maps over the provided questions and renders each one using the QuestionListItem component.
 */
export default function QuestionList({ questions, filteredQuestionIDs }: QuestionListProps) {
  return (
    <ul className="question-list">
        {questions.map((question) => (
          filteredQuestionIDs.includes(question.id) &&
          <QuestionListItem question={question} key={question.id} />
        ))}
    </ul>
  );
}
