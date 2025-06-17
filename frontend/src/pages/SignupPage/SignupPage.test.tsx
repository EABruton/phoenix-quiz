import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// mock response
const mockPostSignup = jest.fn();
jest.mock("../../services/api/AccountsService", () => ({
  __esModule: true,
  default: {
    postSignup: mockPostSignup,
  },
}));
import SignupPage from "./SignupPage";

// selectors
const sSignupSubmitButton = "submit-signup-form";
const sEmailErrors = "email-errors";
const sPasswordErrors = "password-errors";
const sConfirmPasswordErrors = "confirm-password-errors";

const validFieldMap = new Map([
  [() => screen.getByLabelText(/email/i), "abc@example.com"],
  [() => screen.getByLabelText(/^password/i), "abc"],
  [() => screen.getByLabelText(/^confirm password/i), "abc"],
]);

beforeEach(() => {
  mockPostSignup.mockReset();
});

test("shows field validation error on field blur", async () => {
  // arrange
  userEvent.setup();
  render(<SignupPage />);

  // assert: initial state - email field
  const emailField = await screen.findByLabelText(/email/i);
  const emailErrors = screen.queryByTestId(sEmailErrors);
  expect(emailErrors).not.toBeInTheDocument();

  // act: trigger error
  await userEvent.type(emailField, "abc");
  await userEvent.tab();

  // assert: errors show up
  expect(await screen.findByTestId(sEmailErrors)).toBeVisible();

  // act: fix error
  await userEvent.clear(emailField);
  await userEvent.type(emailField, "abc@example.com");
  await userEvent.tab();

  // assert: error goes away
  expect(screen.queryByTestId(sEmailErrors)).not.toBeInTheDocument();
});

test("disables submit button unless all fields are valid", async () => {
  // arrange
  userEvent.setup();
  render(<SignupPage />);

  // assert: initial state - submit button disabled
  let submitButton = await screen.findByTestId(sSignupSubmitButton);
  expect(submitButton).toBeDisabled();

  // act: fill inputs with valid data
  for await (const [selector, input] of validFieldMap) {
    const selected = selector();
    await userEvent.type(selected, input);
  }
  await userEvent.tab();

  // assert: submit button enabled, no errors
  submitButton = await screen.findByTestId(sSignupSubmitButton);
  expect(submitButton).not.toBeDisabled();

  for (const selector of [
    sEmailErrors,
    sPasswordErrors,
    sConfirmPasswordErrors,
  ]) {
    const selected = screen.queryByTestId(selector);
    expect(selected).not.toBeInTheDocument();
  }
});

test("renders errors on error response", async () => {
  // arrange
  userEvent.setup();
  render(<SignupPage />);
  const errorMessage = "failed to signup";
  mockPostSignup.mockReturnValueOnce([null, new Error(errorMessage)]);

  // act: fill inputs with valid data
  for await (const [selector, input] of validFieldMap) {
    const selected = selector();
    await userEvent.type(selected, input);
  }
  await userEvent.tab();

  const submitButton = await screen.findByTestId(sSignupSubmitButton);
  await userEvent.click(submitButton);
});
