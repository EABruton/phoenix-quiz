import type { FieldValidator } from "../../../utils/validators";

export const validateEmail: FieldValidator<string> = (email: string) => {
  const validationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (validationRegex.test(email)) return [true, []];
  return [false, ["Invalid email format"]];
};

export const validatePassword: FieldValidator<string> = (password: string) => {
  const errorMessages: string[] = [];

  const isLengthOK = password.length > 2;
  if (!isLengthOK) errorMessages.push("Password too short");

  const isFormatOK = /[a-zA-Z.!]+/.test(password);
  if (!isFormatOK) errorMessages.push("Incorrect password format");

  const isOK = [isLengthOK, isFormatOK].every((v) => v);
  return [isOK, errorMessages];
};
