import { RadioButtonChecked, RadioButtonUnchecked } from "../../../../assets/icons";
import type { Question } from "../../../../services/api/QuizzesService";
import { useQuestionsPageContext } from "../../QuestionsPageContext";
import styles from "./QuestionListItem.module.css";

/**
 * Component to render a checkbox for selecting questions in the question list.
 * It uses the QuestionsPageContext to manage the state of selected questions.
 *
 * @param {Object} props - The component props.
 * @param {string} props.questionID - The ID of the question to be selected or deselected.
 */
function QuestionListItemCheckbox({
  questionID,
}: { questionID: string }) {
  const { selectedQuestions, setSelectedQuestions } = useQuestionsPageContext();
  const isQuestionSelected = selectedQuestions.includes(questionID);

  return (
    <div className={styles["list-question__checkbox-container"]}>
      <label
        className={styles["list-question__checkbox-label"]}
        htmlFor={"select-question-" + questionID}
      ></label>
      <input
        className={styles["list-question__checkbox"]}
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
      <span className={styles["list-question__checkbox-custom"]}>
        {isQuestionSelected ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
      </span>
    </div>
  );
}

export default function QuestionListItem({
  question: { question_text: questionText, id: key },
}: { question: Question }) {
  return (
    // TODO: replace with anchor link with link to question details
    <div className={styles["list-question"]}>
      <div className={[styles["list-question__column"], styles["list-question__column--text"]].join(" ")}>
        <li>{questionText}</li>
      </div>
      <div className={styles["list-question__column"]}>
        <QuestionListItemCheckbox
          questionID={key}
        />
      </div>
    </div>
  );
}
