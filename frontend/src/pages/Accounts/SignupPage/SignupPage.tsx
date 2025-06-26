import "../Accounts.css";
import FieldErrorsList from "../../../components/FieldErrorsList/FieldErrorsList";
import useFieldWithValidation, {
  type FieldWithValidationHook,
  type InputProps,
} from "../../../hooks/useFieldWithValidation";
import { useState } from "react";
import type { FieldValidator } from "../../../utils/validators";
import { validateEmail, validatePassword } from "./utils/validators";
import ErrorsList from "../../../components/ErrorsList/ErrorsList";
import AccountsService from "../../../services/api/AccountsService";
import { Link } from "react-router";
import { ROUTE_LOGIN } from "../../../App";

type SignupFormProps = {
  emailInputProps: InputProps<string>;
  emailErrorMessages: string[];
  passwordInputProps: InputProps<string>;
  passwordErrorMessages: string[];
  passwordConfirmInputProps: InputProps<string>;
  passwordConfirmErrorMessages: string[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errorsListID: string;
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
  errorsListID,
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

  const areFieldsBlank = [
    emailInputProps.value,
    passwordInputProps.value,
    passwordConfirmInputProps.value,
  ].some((v) => v.trim() === "");

  const areErrorMessagesPresent = [
    emailErrorMessages,
    passwordErrorMessages,
    passwordConfirmErrorMessages,
  ].some((v) => v.length > 0);

  const canSubmit = [!areFieldsBlank, !areErrorMessagesPresent].every((v) => v);

  return (
    <form
      id="signup-form"
      aria-describedby={errorsListID}
      className="accounts-form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="accounts-form__field-wrapper">
        <label className="accounts-form__field-label" htmlFor="signup-email">
          Email:
        </label>
        <input
          type="email"
          className="accounts-form__text-input"
          id="signup-email"
          name="signup-email"
          aria-describedby={hasEmailErrors ? emailErrorsID : ""}
          required
          {...emailInputProps}
        />
        {emailErrorComponent}
      </div>
      <div className="accounts-form__field-wrapper">
        <label className="accounts-form__field-label" htmlFor="signup-password">
          Password:
        </label>
        <input
          type="password"
          className="accounts-form__text-input"
          id="signup-password"
          name="signup-password"
          aria-describedby={hasPasswordErrors ? passwordErrorsID : ""}
          required
          {...passwordInputProps}
        />
        {passwordErrorComponent}
      </div>
      <div className="accounts-form__field-wrapper">
        <label
          className="accounts-form__field-label"
          htmlFor="signup-password-confirm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          className="accounts-form__text-input"
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
      <div className="accounts-form__button-group">
        <button
          disabled={!canSubmit}
          type="submit"
          className="accounts-form__submit-button button--standard button--primary"
          data-testid="submit-signup-form"
        >
          Signup
        </button>
        <span className="accounts-form__or">OR</span>
        <Link to={ROUTE_LOGIN} className="accounts-form__link">
          Login here
        </Link>
      </div>
    </form>
  );
}

/**
 * The signup page, which presents the user a chance to signup for the platform.
 */
export default function SignupPage() {
  const [
    emailInputProps,
    emailErrorMessages,
    emailValidator,
  ]: FieldWithValidationHook<string> = useFieldWithValidation<string>("", [
    validateEmail,
  ]);
  const [
    passwordInputProps,
    passwordErrorMessages,
    passwordValidator,
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
    confirmPasswordValidator,
  ]: FieldWithValidationHook<string> = useFieldWithValidation<string>("", [
    validateConfirmPassword,
  ]);

  /**
   * Runs all field-level validators and returns whether we can proceed with form submission.
   */
  function validateForm(): boolean {
    const validationArr = [
      emailValidator,
      passwordValidator,
      confirmPasswordValidator,
    ];
    const areFieldsValid = validationArr.map((v) => v()).every((v) => v);

    return areFieldsValid;
  }

  /**
   * Handles final field validation and submission of the signup form.
   *
   * Shows any errors on error, and redirects on success.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const areFieldsValid = validateForm();
    if (!areFieldsValid) return;

    const [_, error] = await AccountsService.postSignup({
      email: emailInputProps.value,
      password: passwordInputProps.value,
    });
    if (error) {
      setSubmitErrors([error.message]);
      return;
    }

    console.log("Signup success!");
    // TODO: implement redirect
  }

  // TODO: implement aria-describedby ID matching
  const hasSubmitErrors = submitErrors.length > 0;
  const errorsListID = hasSubmitErrors ? "signup-form-errors" : "";
  const submitErrorsComponent = hasSubmitErrors ? (
    <ErrorsList
      errorMessages={submitErrors}
      setErrorMessages={setSubmitErrors}
      id={errorsListID}
    />
  ) : null;

  return (
    <main id="signup-page">
      <header className="accounts-page__header">
        <h1 className="accounts-page__heading">Signup Here</h1>
      </header>
      <section className="accounts-page__form-section">
        {submitErrorsComponent}
        <SignupForm
          emailInputProps={emailInputProps}
          emailErrorMessages={emailErrorMessages}
          passwordInputProps={passwordInputProps}
          passwordErrorMessages={passwordErrorMessages}
          passwordConfirmInputProps={confirmPasswordProps}
          passwordConfirmErrorMessages={confirmPasswordErrorMessages}
          handleSubmit={handleSubmit}
          errorsListID={errorsListID}
        />
      </section>
    </main>
  );
}
