import type { Question } from '../../../../services/api/QuizzesService';
import QuestionListItem from '../QuestionListItem/QuestionListItem';
import './QuestionList.css';

/**
 * Component to render a list of questions.
 * It maps over the provided questions and renders each one using the QuestionListItem component.
 *
 * @param {Object} props - The component props.
 * @param {Question[]} props.questions - The list of questions to be displayed.
 */
export default function QuestionList({ questions }: { questions: Question[] }) {
  return (
    <ul className="question-list">
        {questions.map((question) => (
          <QuestionListItem question={question} key={question.id} />
        ))}
    </ul>
  );
}
