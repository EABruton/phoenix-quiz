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
    <div className="field-errors-list" id={id} data-testid={id}>
      <ul className="field-errors-list__list">
        {errorMessages.map((errorMessage) => {
          const key = id + errorMessage.toLowerCase().replace(" ", "-");

          return (
            <li key={key} className="field-errors-list__error error-text">
              {errorMessage}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
