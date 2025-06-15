/**
 * Things to test for:
 * - [x] deselect all button is disabled if no selected IDs are visible
 * - [x] deselect all button triggers setSelectedQuestions on click
 * - [x] select all button triggers setSelectedQuestions on click
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { DeselectAllButton, SelectAllButton } from "./SelectButtons";

const setSelectedQuestions = jest.fn();
const selectedQuestionIDs = [...Array(3)].map((_, i) => `ID: ${i}`);

// selectors
const sDeselectAll = "deselect-all-ids";
const sSelectAll = "select-all-ids";

beforeEach(() => {
  setSelectedQuestions.mockReset();
});

test("deselect all button is disabled if no selected IDs are visible", async () => {
  const filteredQuestionIDs = ["6", "7"];
  render(
    <DeselectAllButton
      setSelectedIDs={setSelectedQuestions}
      filteredIDs={filteredQuestionIDs}
      selectedIDs={selectedQuestionIDs}
    />,
  );

  const deselectButton = screen.getByTestId(sDeselectAll);
  expect(deselectButton).toBeDisabled();
});

test("deselect all button triggers setSelectedQuestions on click", async () => {
  userEvent.setup();
  render(
    <DeselectAllButton
      setSelectedIDs={setSelectedQuestions}
      filteredIDs={selectedQuestionIDs}
      selectedIDs={selectedQuestionIDs}
    />,
  );

  expect(setSelectedQuestions).not.toHaveBeenCalled();
  const deselectButton = screen.getByTestId(sDeselectAll);
  await userEvent.click(deselectButton);

  expect(setSelectedQuestions).toHaveBeenCalledWith(expect.any(Function));
});

test("select all button triggers setSelectedQuestions on click", async () => {
  userEvent.setup();
  render(
    <SelectAllButton
      setSelectedIDs={setSelectedQuestions}
      filteredIDs={selectedQuestionIDs}
    />,
  );

  expect(setSelectedQuestions).not.toHaveBeenCalled();
  const selectButton = screen.getByTestId(sSelectAll);
  await userEvent.click(selectButton);

  expect(setSelectedQuestions).toHaveBeenCalledWith(expect.any(Function));
});
