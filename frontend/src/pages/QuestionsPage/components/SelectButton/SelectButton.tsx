type BaseSelectButtonProps = {
  setSelectedQuestions: (updater: (prev: string[]) => string[]) => void;
  filteredQuestionIDs: string[];
};

type SelectButtonProps = BaseSelectButtonProps & {
  selectedQuestions: string[];
};

function DeselectAllButton({
  setSelectedQuestions,
  filteredQuestionIDs,
}: BaseSelectButtonProps) {
  // deselects everything from the current filter, but not everything overall
  function deselectVisibleQuestions() {
    setSelectedQuestions((currentIDs) => {
      return currentIDs.filter((id) => !filteredQuestionIDs.includes(id));
    });
  }

  return (
    <button
      className="floating-actions-bar__button floating-actions-bar__button--select"
      onClick={deselectVisibleQuestions}
      data-testid="deselect-all-questions"
    >
      Deselect All
    </button>
  );
}

function SelectAllButton({
  setSelectedQuestions,
  filteredQuestionIDs,
}: BaseSelectButtonProps) {
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

/**
  * Component to render a select all or deselect all button based on whether
  * all visible items are selected or not.
  * This allows for bulk selection of questions. 
  */
export default function SelectButton({
  selectedQuestions,
  setSelectedQuestions,
  filteredQuestionIDs,
}: SelectButtonProps) {
  // this determines whether to show the select all or deselect all button
  // if every item visible is selected, we can show the deselect all button
  const isEveryVisibleQuestionSelected = filteredQuestionIDs.every((id) =>
    selectedQuestions.includes(id),
  );

  if (isEveryVisibleQuestionSelected) {
    return (
      <DeselectAllButton
        setSelectedQuestions={setSelectedQuestions}
        filteredQuestionIDs={filteredQuestionIDs}
      />
    );
  }
  return (
    <SelectAllButton
      setSelectedQuestions={setSelectedQuestions}
      filteredQuestionIDs={filteredQuestionIDs}
    />
  );
}
