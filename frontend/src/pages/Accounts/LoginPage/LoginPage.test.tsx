import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// mock response
const mockPostLogin = jest.fn();
jest.mock("../../../services/api/AccountsService", () => ({
  __esModule: true,
  default: {
    postLogin: mockPostLogin,
  },
}));
import LoginPage from "./LoginPage";

// selectors

beforeEach(() => {
  mockPostLogin.mockReset();
});

async function fillValidForm() {
  const email = await screen.findByLabelText(/email/i);
  const password = await screen.findByLabelText(/password/i);
  await userEvent.type(email, "valid@email.com");
  await userEvent.type(password, "password123");
  await userEvent.tab();
}

test("disables submit button until fields are filled", async () => {
  // arrange
  userEvent.setup();
  render(<LoginPage />);

  // assert: initial state - button disabled
  const submitButton = () => screen.getByText(/login/i, { selector: "button" });
  expect(submitButton()).toBeDisabled();

  // act: fill in fields
  await fillValidForm();

  // assert: button enabled
  expect(submitButton()).not.toBeDisabled();
});

test("renders error on fail response", async () => {
  // arrange
  userEvent.setup();
  render(<LoginPage />);
  const errorMessage = "failed to login";
  mockPostLogin.mockReturnValueOnce([null, new Error(errorMessage)]);

  // assert: no errors shown
  expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

  // act: fill in and submit form
  const submitButton = screen.getByText(/login/i, { selector: "button" });
  await fillValidForm();
  await userEvent.click(submitButton);

  // assert: error message shows
  expect(await screen.findByText(errorMessage)).toBeVisible();
});
