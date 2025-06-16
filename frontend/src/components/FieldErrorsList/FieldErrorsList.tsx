import "./FieldErrorsList.css";

type FieldErrorsListProps = {
  errorMessages: string[];
  id: string;
};

export default function FieldErrorsList({
  errorMessages,
  id,
}: FieldErrorsListProps) {
  return (
    <div className="field-errors-list" id={id}>
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
