import "./FieldErrorsList.css";

type FieldErrorsListProps = {
  errorMessages: string[];
};

export default function FieldErrorsList({
  errorMessages,
}: FieldErrorsListProps) {
  return (
    <ul className="field-errors-list" role="alert">
      {errorMessages.map((errorMessage) => {
        return <li className="field-errors-list__error">{errorMessage}</li>;
      })}
    </ul>
  );
}
