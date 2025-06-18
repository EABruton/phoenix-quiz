import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ErrorsList from "./ErrorsList";

// selectors
const sClearAllErrors = "errors-list-clear-all";

const messageCount = 5;
const makeMsg = (_msg: undefined, i: number) => `Error message: ${i}`;
const errorMessages = [...Array(messageCount)].map(makeMsg);
const setErrorMessagesMock = jest.fn();

beforeEach(() => {
  setErrorMessagesMock.mockReset();
});

test("renders error messages", async () => {
  render(
    <ErrorsList
      errorMessages={errorMessages}
      setErrorMessages={setErrorMessagesMock}
      id="id"
    />,
  );

  for await (const msg of errorMessages) {
    const errorNode = await screen.findByText(new RegExp(msg));
    expect(errorNode).toBeVisible();
  }
});

test("calls setErrorMessages function when clear all button is clicked", async () => {
  userEvent.setup();
  render(
    <ErrorsList
      errorMessages={errorMessages}
      setErrorMessages={setErrorMessagesMock}
      id="id"
    />,
  );

  expect(setErrorMessagesMock).toHaveBeenCalledTimes(0);
  const clearErrors = await screen.findByTestId(sClearAllErrors);
  expect(clearErrors).toBeVisible();
  await userEvent.click(clearErrors);

  expect(setErrorMessagesMock).toHaveBeenCalledTimes(1);
  expect(setErrorMessagesMock).toHaveBeenCalledWith([]);
});

test("calls setErrorMessages function when invidual error item close button is clicked", async () => {
  userEvent.setup();
  render(
    <ErrorsList
      errorMessages={errorMessages}
      setErrorMessages={setErrorMessagesMock}
      id="id"
    />,
  );

  const closeErrorButtons = await screen.findAllByText(/hide this error/i);
  expect(closeErrorButtons).toHaveLength(messageCount);

  for await (const button of closeErrorButtons) {
    await userEvent.click(button);
  }

  expect(setErrorMessagesMock).toHaveBeenCalledTimes(messageCount);
});
