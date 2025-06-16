import useFieldWithValidation, {
  type FieldWithValidationHook,
  type InputProps,
} from "../../hooks/useFieldWithValidation";
import type { FieldValidator } from "../../utils/validators";

const validateEmail: FieldValidator<string> = (email: string) => {
  const validationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (validationRegex.test(email)) return [true, null];
  return [false, "Invalid email format"];
};

const validatePassword: FieldValidator<string> = (password: string) => {
  return [password.length > 0, null];
};

type SignupFormProps = {
  emailInputProps: InputProps<string>;
  emailErrorMessages: string[];
  passwordInputProps: InputProps<string>;
  passwordErrorMessages: string[];
  passwordConfirmInputProps: InputProps<string>;
  passwordConfirmErrorMessages: string[];
};

function SignupForm({
  emailInputProps,
  emailErrorMessages,
  passwordInputProps,
  passwordErrorMessages,
  passwordConfirmInputProps,
  passwordConfirmErrorMessages,
}: SignupFormProps) {
  // const emailErrorComponent = emailErrorMessages.length > 0 ?

  return (
    <form id="signup-form" className="signup-form">
      <div className="signup-form__field-wrapper">
        <label htmlFor="signup-email">Email:</label>
        <input
          type="email"
          id="signup-email"
          name="signup-email"
          {...emailInputProps}
        />
      </div>
      <div className="signup-form__field-wrapper">
        <label htmlFor="signup-password">Password:</label>
        <input
          type="email"
          id="signup-password"
          name="signup-password"
          {...passwordInputProps}
        />
      </div>
      <div className="signup-form__field-wrapper">
        <label htmlFor="signup-password-confirm">Confirm Password:</label>
        <input
          type="email"
          id="signup-password-confirm"
          name="signup-password-confirm"
          {...passwordConfirmInputProps}
        />
      </div>
    </form>
  );
}

export default function SignupPage() {
  const [emailInputProps, emailErrorMessages]: FieldWithValidationHook<string> =
    useFieldWithValidation<string>("", [validateEmail]);
  const [
    passwordInputProps,
    passwordErrorMessages,
  ]: FieldWithValidationHook<string> = useFieldWithValidation<string>("", [
    validatePassword,
  ]);

  const validateConfirmPassword: FieldValidator<string> = (
    password: string,
  ) => {
    if (password === passwordInputProps.value) return [true, null];
    return [false, "Passwords do not match"];
  };
  const [
    confirmPasswordProps,
    confirmPasswordErrorMessages,
  ]: FieldWithValidationHook<string> = useFieldWithValidation<string>("", [
    validateConfirmPassword,
  ]);

  return (
    <main id="signup-page">
      <header className="signup-page-header">
        <h1 className="signup-page__heading">Signup Here</h1>
      </header>
      <section className="signup-form-section">
        <SignupForm
          emailInputProps={emailInputProps}
          emailErrorMessages={emailErrorMessages}
          passwordInputProps={passwordInputProps}
          passwordErrorMessages={passwordErrorMessages}
          passwordConfirmInputProps={confirmPasswordProps}
          passwordConfirmErrorMessages={confirmPasswordErrorMessages}
        />
      </section>
    </main>
  );
}
