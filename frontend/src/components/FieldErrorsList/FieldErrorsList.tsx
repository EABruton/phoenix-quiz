import "./FieldErrorsList.css";

type FieldErrorsListProps = {
  errorMessages: string[];
};

export default function FieldErrorsList({
  errorMessages,
}: FieldErrorsListProps) {
  return (
    <div className="field-errors-list">
      <ul className="field-errors-list__list">
        {errorMessages.map((errorMessage) => {
          return (
            <li className="field-errors-list__error error-text">
              {errorMessage}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
