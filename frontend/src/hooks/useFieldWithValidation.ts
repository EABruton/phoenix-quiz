import { useState } from "react";
import { validateFormField, type FieldValidator } from "../utils/validators";

export type InputProps<T> = {
  onBlur: () => void;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FieldWithValidationHook<T> = [
  InputProps<T>,
  string[],
  () => boolean,
];

/**
 * A hook used to provide validation for and manage the state of a form field.
 *
 * When focus leaves the given field, validators are ran and any error messages updated.
 */
export default function useFieldWithValidation<T>(
  initialValue: T,
  validators: FieldValidator<T>[],
): FieldWithValidationHook<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  function handleBlur(): boolean {
    const [isValid, validationErrorMessages] = validateFormField<T>(
      value,
      validators,
    );

    if (isValid) {
      setErrorMessages([]);
    }

    setErrorMessages(validationErrorMessages);
    return isValid;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value as T);
  }

  return [
    // input props
    {
      onBlur: handleBlur,
      value,
      onChange: handleChange,
    },
    // validation errors
    errorMessages,
    handleBlur,
  ];
}
