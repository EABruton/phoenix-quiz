export interface FieldValidator<T> {
  (arg: T): [boolean, string | null];
}

/**
 * Given a field and series of validation functions, tests the field against all validators.
 *
 * Returns [where there were any errors, any error messages]
 */
export function validateFormField<T>(
  field: T,
  validators: FieldValidator<T>[],
): [boolean, string[]] {
  function callBack(allErrors: string[], curr: FieldValidator<T>): string[] {
    const [isValid, errorMessage] = curr(field);
    if (isValid) return allErrors;

    return [...allErrors, errorMessage!];
  }

  const validationErrorMessages = validators.reduce(callBack, []);

  return [validationErrorMessages.length < 1, validationErrorMessages];
}
