import {
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "../../../../assets/icons";
import type { Question } from "../../../../services/api/QuizzesService";
import { useQuestionsPageContext } from "../../QuestionsPageContext";
import "./QuestionListItem.css";

/**
 * Component to render a checkbox for selecting questions in the question list.
 * It uses the QuestionsPageContext to manage the state of selected questions.
 *
 * @description This component displays a checkbox that allows users to select or deselect a question.
 * When the checkbox is checked or unchecked, it updates the selected questions in the context.
 * The checkbox state is determined by whether the question ID is included in the selectedQuestions array.
 * It also visually indicates the selection state using icons for checked and unchecked states.
 * @example
 * <QuestionListItemCheckbox questionID="12345" />
 * @see {@link useQuestionsPageContext} for context management of selected questions.
 * @see {@link Question} for the structure of a question object.
 */
function QuestionListItemCheckbox({ questionID }: { questionID: string }) {
  const { selectedQuestions, setSelectedQuestions } = useQuestionsPageContext();
  const isQuestionSelected = selectedQuestions.includes(questionID);

  return (
    <div className="list-question__checkbox-container">
      <label
        className="list-question__checkbox-label"
        htmlFor={"select-question-" + questionID}
      >
        <span className="visually-hidden">Select question</span>
      </label>
      <input
        className="list-question__checkbox"
        type="checkbox"
        name={"select-question-" + questionID}
        id={"select-question-" + questionID}
        checked={isQuestionSelected}
        onChange={(e) => {
          const checked = e.target.checked;

          if (checked) {
            setSelectedQuestions((prev) => [...prev, questionID]);
          } else {
            setSelectedQuestions((prev) =>
              prev.filter((id) => id !== questionID),
            );
          }
        }}
      />
      <span className="list-question__checkbox-custom">
        {isQuestionSelected ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
      </span>
    </div>
  );
}

/**
 * 
 * @param question - The question object containing the question text and ID.
 * @param question.question_text - The text of the question.
 * @param question.id - The unique identifier for the question.
 * @returns A JSX element representing a list item for a question.
 */
export default function QuestionListItem({
  question: { question_text: questionText, id: key },
}: {
  question: Question;
}) {
  return (
    // TODO: replace with anchor link with link to question details
    <div className="list-question" data-testid={key}>
      <div className="list-question__column list-question__column--text">
        <li>{questionText}</li>
      </div>
      <div className="list-question__column">
        <QuestionListItemCheckbox questionID={key} />
      </div>
    </div>
  );
}
