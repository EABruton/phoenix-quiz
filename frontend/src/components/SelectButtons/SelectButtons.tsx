type SelectButtonProps = {
  setSelectedIDs: (updater: (prev: string[]) => string[]) => void;
  filteredIDs: string[];
};

type DeselectButtonProps = SelectButtonProps & {
  selectedIDs: string[];
};

/**
 * This component allows the user to deselect all **viewable** questions from the currently-selected questions.
 */
export function DeselectAllButton({
  setSelectedIDs,
  filteredIDs,
  selectedIDs,
}: DeselectButtonProps) {
  // deselects everything from the current filter, but not everything overall
  function deselectVisibleQuestions() {
    setSelectedIDs((currentIDs) => {
      return currentIDs.filter((id) => !filteredIDs.includes(id));
    });
  }

  // if none of the selected questions are visible, disable the button
  const isDisabled = !filteredIDs.some((id) => selectedIDs.includes(id));

  return (
    <button
      className="deselect-button select-deselect-button"
      onClick={deselectVisibleQuestions}
      data-testid="deselect-all-ids"
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
  setSelectedIDs,
  filteredIDs,
}: SelectButtonProps) {
  // adds the filtered IDs to the current selection of IDs if not already present
  function addVisibleQuestionsToSelected() {
    setSelectedIDs((currentIDs) => {
      const newIDs = filteredIDs.filter((id) => !currentIDs.includes(id));
      return [...newIDs, ...currentIDs];
    });
  }

  return (
    <button
      className="select-button select-deselect-button"
      onClick={addVisibleQuestionsToSelected}
      data-testid="select-all-ids"
    >
      Select All
    </button>
  );
}
