import { useState } from "react";
import "../Accounts.css";
import ErrorsList from "../../../components/ErrorsList/ErrorsList";
import AccountsService from "../../../services/api/AccountsService";

type LoginFormProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorsListID: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  errorsListID,
  handleSubmit,
}: LoginFormProps) {
  const areFieldsBlank = [email, password].some((v) => v.trim().length < 1);

  return (
    <form
      className="accounts-form"
      id="login-form"
      aria-describedby={errorsListID}
      onSubmit={handleSubmit}
    >
      <div className="accounts-form__field-wrapper">
        <label className="accounts-form__field-label" htmlFor="login-email">
          Email:
        </label>
        <input
          type="email"
          className="accounts-form__text-input"
          id="login-email"
          name="login-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="accounts-form__field-wrapper">
        <label className="accounts-form__field-label" htmlFor="login-password">
          Password:
        </label>
        <input
          type="password"
          className="accounts-form__text-input"
          id="login-password"
          name="login-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <hr />
      <div className="accounts-form__button-group">
        <button
          disabled={areFieldsBlank}
          type="submit"
          className="accounts-form__submit-button button--standard button--orange-bg-green-text"
          data-testid="submit-login-form"
        >
          Login
        </button>
        <span className="accounts-form__or">OR</span>
        <a href="#" className="accounts-form__link">
          Signup here
        </a>
      </div>
    </form>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const [isSuccess, error] = await AccountsService.postLogin({
      email,
      password,
    });
    if (isSuccess) {
      // TODO: implement redirect

      return;
    }

    setSubmitErrors([error!.message]);
  }

  const hasSubmitErrors = submitErrors.length > 0;
  const errorsListID = hasSubmitErrors ? "login-submit-errors" : "";
  const errorsComponent = hasSubmitErrors ? (
    <ErrorsList
      errorMessages={submitErrors}
      setErrorMessages={setSubmitErrors}
      id={errorsListID}
    />
  ) : null;

  return (
    <main id="login-page">
      <header className="accounts-page__header">
        <h1 className="accounts-page__heading">Login Here</h1>
      </header>
      <section className="accounts-page__form-section">
        {errorsComponent}
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          errorsListID={errorsListID}
        />
      </section>
    </main>
  );
}
