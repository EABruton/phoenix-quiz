import "./ActionsBar.css";
import FloatingActionsBar from "../../../../components/FloatingActionsBar/FloatingActionsBar";
import {
  DeselectAllButton,
  SelectAllButton,
} from "../../../../components/SelectButtons/SelectButtons";

type ActionsBarProps = {
  selectedQuestions: string[];
  filteredQuestionIDs: string[];
  handleDeleteQuestions: () => void;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  questionsCount: number;
  isDesktop: boolean;
  actionsBarRef: React.RefObject<HTMLDialogElement | null>;
};

export default function ActionsBar({
  selectedQuestions,
  filteredQuestionIDs,
  handleDeleteQuestions,
  setSelectedQuestions,
  questionsCount,
  isDesktop,
  actionsBarRef,
}: ActionsBarProps) {
  const baseActionsBar = (
    <FloatingActionsBar>
      <div className="floating-actions-bar__info">
        <p className="floating-actions-bar__text">
          <span>Total Questions:</span>
          <span data-testid="total-questions-count">{questionsCount}</span>
        </p>
        <p className="floating-actions-bar__text">
          <span>Selected Questions:</span>
          <span data-testid="selected-questions-count">
            {selectedQuestions.length}
          </span>
        </p>
        <p className="floating-actions-bar__text">
          <span>Visible Questions:</span>
          <span data-testid="visible-questions-count">
            {filteredQuestionIDs.length}
          </span>
        </p>
      </div>
      <button
        className="button--standard button--primary"
        onClick={handleDeleteQuestions}
        disabled={selectedQuestions.length === 0}
      >
        Delete Selected
      </button>
      <SelectAllButton
        setSelectedIDs={setSelectedQuestions}
        filteredIDs={filteredQuestionIDs}
        buttonText="Select All"
      />
      <DeselectAllButton
        setSelectedIDs={setSelectedQuestions}
        filteredIDs={filteredQuestionIDs}
        selectedIDs={selectedQuestions}
        buttonText="Deselect All"
      />
    </FloatingActionsBar>
  );

  if (isDesktop) {
    return <aside className="questions-page__actions">{baseActionsBar}</aside>;
  }

  return (
    <dialog
      className="actions-bar__dialog"
      id="questions-page-actions-bar"
      data-testid="questions-page-actions-bar"
      ref={actionsBarRef}
    >
      <button
        className="actions-bar__dialog-close button--standard button--primary"
        autoFocus={true}
        onClick={() => actionsBarRef.current?.close()}
        aria-controls="questions-page-actions-bar"
      >
        <span className="actions-bar__dialog-close-text">
          Close Actions Menu
        </span>
      </button>
      {baseActionsBar}
    </dialog>
  );
}
