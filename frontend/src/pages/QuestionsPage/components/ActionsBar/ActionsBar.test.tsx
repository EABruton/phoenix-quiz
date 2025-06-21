import "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ActionsBar from "./ActionsBar";
import { createRef } from "react";

const handleDeleteQuestions = jest.fn();
const setSelectedQuestions = jest.fn();
const refMock = createRef<HTMLDialogElement>();

const defaultArgs = {
  selectedQuestions: ["1", "2"],
  filteredQuestionIDs: ["1"],
  handleDeleteQuestions,
  setSelectedQuestions,
  questionsCount: 10,
  isDesktop: true,
  actionsBarRef: refMock,
};

// selectors
const sActionsBarDialog = "questions-page-actions-bar";

beforeEach(() => {
  handleDeleteQuestions.mockReset();
  setSelectedQuestions.mockReset();
});

test("calls handle delete function when delete selected is clicked", async () => {
  // arrange
  userEvent.setup();
  render(<ActionsBar {...defaultArgs} />);

  // assert: initial state
  expect(handleDeleteQuestions).not.toHaveBeenCalled();

  // act: click delete button
  const deleteButton = screen.getByText(/delete selected/i);
  expect(deleteButton).toBeEnabled();
  await userEvent.click(deleteButton);

  // assert: result
  expect(handleDeleteQuestions).toHaveBeenCalled();
});

test("calls set selected IDs and deselect IDs functions when corresponding buttons are clicked", async () => {
  // arrange
  userEvent.setup();
  render(<ActionsBar {...defaultArgs} />);

  // assert: initial state
  expect(setSelectedQuestions).not.toHaveBeenCalled();

  // act: click select all button
  const selectAllButton = screen.getByText(/^select all/i);
  await userEvent.click(selectAllButton);

  // assert: calls function
  expect(setSelectedQuestions).toHaveBeenCalledTimes(1);

  // act: click deselect all button
  const deselectAllButton = screen.getByText(/^deselect all/i);
  await userEvent.click(deselectAllButton);

  // assert: calls function
  expect(setSelectedQuestions).toHaveBeenCalledTimes(2);
});

test("renders a dialogue with close actions button if isDesktop is false", async () => {
  // arrange
  render(<ActionsBar {...defaultArgs} isDesktop={false} />);

  // act: set the dialog to open
  const actionsBar = screen.getByTestId(sActionsBarDialog);
  actionsBar.setAttribute("open", "");

  // assert: the actions bar is visible
  expect(actionsBar).toBeVisible();
});

test("calls the current actions bar ref's close method when the close button is clicked", async () => {
  // arrange
  userEvent.setup();
  render(<ActionsBar {...defaultArgs} isDesktop={false} />);

  // act: set the dialog to open
  const actionsBar = screen.getByTestId(sActionsBarDialog) as HTMLDialogElement;
  // need to polyfill here, as jest does not implement dialog elements' full functionality
  actionsBar.close = jest.fn();
  const closeSpy = jest.spyOn(actionsBar, "close");
  actionsBar.setAttribute("open", "");

  // assert: initial state (ref close has not been called)
  expect(actionsBar).toBeVisible();
  expect(closeSpy).not.toHaveBeenCalled();

  // act: click the close button
  const closeDialog = screen.getByText(/close actions menu/i);
  await userEvent.click(closeDialog);

  // assert: ref close is called
  expect(closeSpy).toHaveBeenCalled();
});
