import "./SignupPage.css";
import FieldErrorsList from "../../components/FieldErrorsList/FieldErrorsList";
import useFieldWithValidation, {
  type FieldWithValidationHook,
  type InputProps,
} from "../../hooks/useFieldWithValidation";
import { useState } from "react";
import type { FieldValidator } from "../../utils/validators";
import { validateEmail, validatePassword } from "./utils/validators";
import ErrorsList from "../../components/ErrorsList/ErrorsList";

type SignupFormProps = {
  emailInputProps: InputProps<string>;
  emailErrorMessages: string[];
  passwordInputProps: InputProps<string>;
  passwordErrorMessages: string[];
  passwordConfirmInputProps: InputProps<string>;
  passwordConfirmErrorMessages: string[];
  handleSubmit: () => void;
};

/**
 * The signup page main signup form
 */
function SignupForm({
  emailInputProps,
  emailErrorMessages,
  passwordInputProps,
  passwordErrorMessages,
  passwordConfirmInputProps,
  passwordConfirmErrorMessages,
  handleSubmit,
}: SignupFormProps) {
  const emailErrorComponent =
    emailErrorMessages.length > 0 ? (
      <FieldErrorsList errorMessages={emailErrorMessages} />
    ) : null;

  const passwordErrorComponent =
    passwordErrorMessages.length > 0 ? (
      <FieldErrorsList errorMessages={passwordErrorMessages} />
    ) : null;

  const confirmPasswordErrorComponent =
    passwordConfirmErrorMessages.length > 0 ? (
      <FieldErrorsList errorMessages={passwordConfirmErrorMessages} />
    ) : null;

  const canSubmit = [
    emailErrorMessages,
    passwordErrorMessages,
    passwordConfirmErrorMessages,
  ].every((v) => v.length === 0);

  return (
    <form id="signup-form" className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-form__field-wrapper">
        <label htmlFor="signup-email">Email:</label>
        <input
          type="email"
          id="signup-email"
          name="signup-email"
          required
          {...emailInputProps}
        />
        {emailErrorComponent}
      </div>
      <div className="signup-form__field-wrapper">
        <label htmlFor="signup-password">Password:</label>
        <input
          type="email"
          id="signup-password"
          name="signup-password"
          required
          {...passwordInputProps}
        />
        {passwordErrorComponent}
      </div>
      <div className="signup-form__field-wrapper">
        <label htmlFor="signup-password-confirm">Confirm Password:</label>
        <input
          type="email"
          id="signup-password-confirm"
          name="signup-password-confirm"
          required
          {...passwordConfirmInputProps}
        />
        {confirmPasswordErrorComponent}
      </div>
      <button
        disabled={!canSubmit}
        type="submit"
        className="signup-form__submit-button"
      >
        Signup
      </button>
    </form>
  );
}

/**
 * The signup page, which presents the user a chance to signup for the platform.
 */
export default function SignupPage() {
  const [emailInputProps, emailErrorMessages]: FieldWithValidationHook<string> =
    useFieldWithValidation<string>("", [validateEmail]);
  const [
    passwordInputProps,
    passwordErrorMessages,
  ]: FieldWithValidationHook<string> = useFieldWithValidation<string>("", [
    validatePassword,
  ]);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  const validateConfirmPassword: FieldValidator<string> = (
    password: string,
  ) => {
    if (password === passwordInputProps.value) return [true, []];
    return [false, ["Passwords do not match"]];
  };
  const [
    confirmPasswordProps,
    confirmPasswordErrorMessages,
  ]: FieldWithValidationHook<string> = useFieldWithValidation<string>("", [
    validateConfirmPassword,
  ]);

  // TODO: implement
  async function handleSubmit() {}

  const submitErrorsComponent =
    submitErrors.length > 0 ? (
      <ErrorsList
        errorMessages={submitErrors}
        setErrorMessages={setSubmitErrors}
      />
    ) : null;

  return (
    <main id="signup-page">
      <header className="signup-page__header">
        <h1 className="signup-page__heading">Signup Here</h1>
      </header>
      <section className="signup-page__form-section">
        {submitErrorsComponent}
        <SignupForm
          emailInputProps={emailInputProps}
          emailErrorMessages={emailErrorMessages}
          passwordInputProps={passwordInputProps}
          passwordErrorMessages={passwordErrorMessages}
          passwordConfirmInputProps={confirmPasswordProps}
          passwordConfirmErrorMessages={confirmPasswordErrorMessages}
          handleSubmit={handleSubmit}
        />
      </section>
    </main>
  );
}
