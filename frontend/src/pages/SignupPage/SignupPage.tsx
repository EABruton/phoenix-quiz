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
  const hasEmailErrors = emailErrorMessages.length > 0;
  const emailErrorsID = "email-errors";
  const emailErrorComponent = hasEmailErrors ? (
    <FieldErrorsList errorMessages={emailErrorMessages} id={emailErrorsID} />
  ) : null;

  const hasPasswordErrors = passwordErrorMessages.length > 0;
  const passwordErrorsID = "password-errors";
  const passwordErrorComponent = hasPasswordErrors ? (
    <FieldErrorsList
      errorMessages={passwordErrorMessages}
      id={passwordErrorsID}
    />
  ) : null;

  const hasConfirmPasswordErrors = passwordConfirmErrorMessages.length > 0;
  const confirmPasswordErrorsID = "confirm-password-errors";
  const confirmPasswordErrorComponent = hasConfirmPasswordErrors ? (
    <FieldErrorsList
      errorMessages={passwordConfirmErrorMessages}
      id={confirmPasswordErrorsID}
    />
  ) : null;

  const canSubmit = [
    emailErrorMessages,
    passwordErrorMessages,
    passwordConfirmErrorMessages,
  ].every((v) => v.length === 0);

  return (
    <form id="signup-form" className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-form__field-wrapper">
        <label className="signup-form__field-label" htmlFor="signup-email">
          Email:
        </label>
        <input
          type="email"
          className="signup-form__text-input"
          id="signup-email"
          name="signup-email"
          aria-describedby={hasEmailErrors ? emailErrorsID : ""}
          required
          {...emailInputProps}
        />
        {emailErrorComponent}
      </div>
      <div className="signup-form__field-wrapper">
        <label className="signup-form__field-label" htmlFor="signup-password">
          Password:
        </label>
        <input
          type="password"
          className="signup-form__text-input"
          id="signup-password"
          name="signup-password"
          aria-describedby={hasPasswordErrors ? passwordErrorsID : ""}
          required
          {...passwordInputProps}
        />
        {passwordErrorComponent}
      </div>
      <div className="signup-form__field-wrapper">
        <label
          className="signup-form__field-label"
          htmlFor="signup-password-confirm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          className="signup-form__text-input"
          id="signup-password-confirm"
          name="signup-password-confirm"
          aria-describedby={
            hasConfirmPasswordErrors ? confirmPasswordErrorsID : ""
          }
          required
          {...passwordConfirmInputProps}
        />
        {confirmPasswordErrorComponent}
      </div>
      <hr />
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
