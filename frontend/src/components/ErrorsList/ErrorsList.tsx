import { XMarkIcon } from "../../assets/icons";
import "./ErrorsList.css";

type ErrorsListProps = {
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>;
  errorMessages: string[];
};

/**
 * A component that renders a list of errors, along with an option to clear each error.
 */
export default function ErrorsList({
  setErrorMessages,
  errorMessages,
}: ErrorsListProps) {
  function handleRemoveErrorMessage(errorMessage: string) {
    setErrorMessages((current) =>
      current.filter((message) => message !== errorMessage),
    );
  }

  return (
    <div className="errors-list" role="alert" data-testid="errors-list">
      <button
        className="errors-list__clear-all"
        onClick={() => setErrorMessages([])}
        data-testid="errors-list-clear-all"
      >
        Clear all errors
      </button>
      <ul className="errors-list__list">
        {errorMessages.map((errorMessage) => {
          const key = errorMessage.toLowerCase().replace(/\s/g, "-");
          return (
            <li key={key} className="errors-list__error-message">
              <span className="errors-list__error-message-text">
                Error: {errorMessage}
              </span>
              <button
                className="errors-list__clear-error"
                onClick={() => handleRemoveErrorMessage(errorMessage)}
              >
                <span className="errors-list__clear-error-text visually-hidden">
                  Hide this error
                </span>
                <XMarkIcon />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
