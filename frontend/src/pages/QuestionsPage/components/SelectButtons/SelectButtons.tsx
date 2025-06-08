type SelectButtonProps = {
  setSelectedQuestions: (updater: (prev: string[]) => string[]) => void;
  filteredQuestionIDs: string[];
};

type DeselectButtonProps = SelectButtonProps & {
  selectedQuestionIDs: string[];
};

/**
 * This component allows the user to deselect all **viewable** questions from the currently-selected questions.
 */
export function DeselectAllButton({
  setSelectedQuestions,
  filteredQuestionIDs,
  selectedQuestionIDs,
}: DeselectButtonProps) {
  // deselects everything from the current filter, but not everything overall
  function deselectVisibleQuestions() {
    setSelectedQuestions((currentIDs) => {
      return currentIDs.filter((id) => !filteredQuestionIDs.includes(id));
    });
  }

  // if none of the selected questions are visible, disable the button
  const isDisabled = !filteredQuestionIDs.some((id) =>
    selectedQuestionIDs.includes(id),
  );

  return (
    <button
      className="floating-actions-bar__button floating-actions-bar__button--select"
      onClick={deselectVisibleQuestions}
      data-testid="deselect-all-questions"
      disabled={isDisabled}
    >
      Deselect All
    </button>
  );
}

/**
 * This component allows the user to add all **viewable** questions to the currently-selected questions.
 */
export function SelectAllButton({
  setSelectedQuestions,
  filteredQuestionIDs,
}: SelectButtonProps) {
  // adds the filtered IDs to the current selection of IDs if not already present
  function addVisibleQuestionsToSelected() {
    setSelectedQuestions((currentIDs) => {
      const newIDs = filteredQuestionIDs.filter(
        (id) => !currentIDs.includes(id),
      );
      return [...newIDs, ...currentIDs];
    });
  }

  return (
    <button
      className="floating-actions-bar__button floating-actions-bar__button--select"
      onClick={addVisibleQuestionsToSelected}
      data-testid="select-all-questions"
    >
      Select All
    </button>
  );
}
